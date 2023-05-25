
const UserDemandService = require('../service/UserDemandService');
const baseResponse = require('../core/BaseResponse');

class UserDemandController {
    constructor() {
        this.userDemandService = new UserDemandService();
    }

    async createDemand(req, res) {
        try {
            const userId = req.user._id;
            req.body.userId = userId;
            const data = req.body;
            console.log(data);
            const demand = await this.userDemandService.createDemand(data);
            res.json(baseResponse.createResponse(demand, 'Demand created successfully', 201, null));
        } catch (error) {
            res.status(400).json(baseResponse.createResponse(null, error.message, 400, error.toString()));
        }
    }

    async getDemandsByUserId(req, res) {
        try {
            const userId = req.user._id;
            const status = req.query.status;
            const demands = await this.userDemandService.getDemandsByUserId(userId, status);
            res.json(baseResponse.createResponse(demands, 'Demands fetched successfully', 200, null));
        } catch (error) {
            res.status(400).json(baseResponse.createResponse(null, error.message, 400, error.toString()));
        }
    }

    async getDemandById(req, res) {
        try {
            const id = req.params.id;
            const demand = await this.userDemandService.getDemandById(id);
            const userId = req.user._id;
            if (demand.userId != userId) {
                throw new Error('Unauthorized');
            }
            res.json(baseResponse.createResponse(demand, 'Demand fetched successfully', 200, null));
        } catch (error) {
            res.status(400).json(baseResponse.createResponse(null, error.message, 400, error));
        }
    }

    async dropPendingDemands(req, res) {
        try {
            const userId = req.user._id;
            const demands = await this.userDemandService.dropPendingDemands(userId);
            res.json(baseResponse.createResponse(demands, 'Demands dropped successfully', 200, null));
        } catch (error) {
            res.status(400).json(baseResponse.createResponse(null, error.message, 400, error.toString()));
        }
    }
}

module.exports = UserDemandController;
