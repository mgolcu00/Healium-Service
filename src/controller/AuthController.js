
const UserService = require('../service/UserService');
const baseResponse = require('../core/BaseResponse');

class AuthController {
    constructor() {
        this.userService = new UserService();
    }

    async register(req, res) {
        try {
            const data = req.body;
            const { user, token } = await this.userService.register(data);
            res.json(baseResponse.createResponse({ user, token }, 'User created successfully', 201, null));
        } catch (error) {
            res.status(400).json(baseResponse.createResponse(null, error.message, 400, error.toString()));
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;
            const { user, token } = await this.userService.login(email, password);
            res.json(baseResponse.createResponse({ user, token }, 'User logged in successfully', 200, null));
        } catch (error) {
            res.status(400).json(baseResponse.createResponse(null, error.message, 400, error.toString()));
        }
    }
}

module.exports = AuthController;
