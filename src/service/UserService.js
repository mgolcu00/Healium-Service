/*
 * Created on Sat May 20 2023
 *
 * Copyright (c) 2023 Mert Gölcü
 */

const User = require('../data/schema/UserSchema');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const AuthMiddleware = require('../middleware/AuthMiddleware');
dotenv.config();


class UserService {
    async register(data) {
        const user = new User(data);
        const token = AuthMiddleware.createToken(user);
        await user.save();
        return { user, token };
    }

    async login(email, password) {
        const user = await User.findOne({ email });
        if (!user) throw new Error('User not found');
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new Error('Invalid password');
        const token = AuthMiddleware.createToken(user);
        return { user, token };
    }

    async getUserById(id) {
        return await User.findById(id);
    }

    // update
    async update(id, data) {
        const user = await this.getUserById(id);
        Object.assign(user, data);
        await user.save();
        return user;
    }

    // delete
    async delete(id) {
        const user = await this.getUserById(id);
        await user.delete();
        return user;
    }

    async updateUserHeight(id, height) {
        const user = await this.getUserById(id);
        user.height = height;
        return await this.update(id, user);
    }

    async updateUserWeight(id, weight) {
        const user = await this.getUserById(id);
        user.weight = weight;
        return await this.update(id, user);
    }

    async updateUserAllergies(id, allergies) {
        const user = await this.getUserById(id);
        user.allergies = allergies;
        return await this.update(id, user);
    }

    async setCoins(id, coins) {
        const user = await this.getUserById(id);
        user.coins = coins;
        return await this.update(id, user);
    }

    async addCoin(id, coin=1) {
        const user = await this.getUserById(id);
        user.coins += coin;
        return await this.update(id, user);
    }

    async removeCoin(id, coin=1) {
        const user = await this.getUserById(id);
        user.coins -= coin;
        return await this.update(id, user);
    }
    


}

module.exports = UserService;
