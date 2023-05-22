/*
* Created on Sat May 20 2023
*
* Copyright (c) 2023 Mert Gölcü
*/

const UserDemandSchema = require('../data/schema/UserDemandSchema');
const dotenv = require('dotenv');
const GptCreatedDietService = require('./GptCreatedDietService');
const UserService = require('./UserService');

dotenv.config();


class UserDemandService {
    constructor() {
        this.gptCreatedDietService = new GptCreatedDietService();
        this.userService = new UserService();
    }

    // CRUD
    async create(data) {
        const userDemand = new UserDemandSchema(data);
        await userDemand.save();
        return userDemand;
    }

    async update(id, data) {
        const userDemand = await this.getDemandById(id);
        Object.assign(userDemand, data);
        await userDemand.save();
        return userDemand;
    }

    async delete(id) {
        const result = await UserDemandSchema.deleteOne({ _id: id });
        return result;
    }

    // drop all
    async dropAll() {
        return await UserDemandSchema.deleteMany({});
    }


    async getDemandById(id) {
        return await UserDemandSchema.findById(id);
    }
    async getDemandsByUserId(userId, status) {
        if (status) {
            if (status === 'completed') {
                return await UserDemandSchema.find({ userId, status }, null, { sort: { completedAt: -1 } })
            }
            return await UserDemandSchema.find({ userId, status }, null, { sort: { createdAt: -1 } });
        }
        return await UserDemandSchema.find({ userId });
    }
    async getDemandsByStatus(status) {
        return await UserDemandSchema.find({ status });
    }
    async completeDemand(id, dietId) {
        const demand = await this.getDemandById(id);
        demand.status = 'completed';
        demand.dietId = dietId;
        demand.completedAt = Date.now();
        await demand.save();
        return demand;
    }
    async failDemand(id, cause) {
        const demand = await this.getDemandById(id);
        demand.status = 'failed';
        demand.failedCause = cause;
        demand.failedAt = Date.now();
        await demand.save();
        return demand;
    }

    async getPendingDemands() {
        return await UserDemandSchema.find({ status: 'pending' });
    }

    async getCompletedDemands() {
        return await UserDemandSchema.find({ status: 'completed' });
    }

    async getFailedDemands() {
        return await UserDemandSchema.find({ status: 'failed' });
    }

    // create demand and start a dietcreation process
    async createDemand(data) {
        const user = await this.userService.getUserById(data.userId);
        if (user.coins < 1) {
            throw new Error('Not enough coins');
        }

        const pendingDemands = await this.getUserPendingDemands(user._id);

        console.log("pending demands", pendingDemands);
        if (pendingDemands.length > 0) {
            console.log("user has pending demand");
            throw new Error('User has pending demand');
        }

        const demand = await this.create(data);
        // start a diet creation process




        try {
            this.gptCreatedDietService.createFromGptPrompt(demand.prompt, {
                demandId: demand._id,
            }, user)
                .then(async (diet) => {
                    await this.completeDemand(demand._id, diet._id);
                    this.userService.removeCoins(user._id, 1);
                })
                .catch(async (e) => {
                    console.log(e);
                    await this.failDemand(demand._id, "GPT-3 error + " + e.message);
                });
        }
        catch (e) {
            console.log(e);
            await this.failDemand(demand._id, e.message);
        }
        return demand;
    }

    async getUserPendingDemands(userId) {
        return await this.getDemandsByUserId(userId, 'pending');
    }

    async dropPendingDemands(userId) {
        const demands = await this.getDemandsByUserId(userId, 'pending');
        // console.log("pending demands", demands);
        for (let i = 0; i < demands.length; i++) {
            const demand = demands[i];
            await this.delete(demand._id);
        }
    }
}

module.exports = UserDemandService;
