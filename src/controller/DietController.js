

const GptCreatedDietService = require('../service/GptCreatedDietService');
const baseResponse = require('../core/BaseResponse');

class DietController {
    constructor() {
        this.gptCreatedDietService = new GptCreatedDietService();
    }

    async getUserDiets(req, res) {
        try {
            const userId = req.user._id;
            const diets = await this.gptCreatedDietService.getDietsByUserId(userId);
            res.json(baseResponse.createResponse(diets, 'Diets fetched successfully', 200, null));
        } catch (error) {
            res.status(400).json(baseResponse.createResponse(null, error.message, 400, error.toString()));
        }
    }

    async getDietById(req, res) {
        try {
            const id = req.params.id;
            const populate = req.query.populate;
            console.log(populate);
            const diet = await this.gptCreatedDietService.getDietById(id, populate);
            const userId = req.user._id;
            if (!populate) {
                if (diet.userId != userId) {
                    throw new Error('Unauthorized');
                }
            }
            else {
                if (diet.userId._id != userId) {
                    throw new Error('Unauthorized');
                }
            }

            res.json(baseResponse.createResponse(diet, 'Diet fetched successfully', 200, null));
        } catch (error) {
            res.status(400).json(baseResponse.createResponse(null, error.message, 400, error.toString()));
        }
    }

    async getDietDetailedById(req, res) {
        try {
            const id = req.params.id;
            const populate = req.query.populate;
            console.log(populate);
            const allIngredients = await this.gptCreatedDietService.getDietAllIngredients(id, populate);
            const diet = await this.gptCreatedDietService.getDietById(id, populate);
            const userId = req.user._id;
            if (!populate) {
                if (diet.userId != userId) {
                    throw new Error('Unauthorized');
                }
            }
            else {
                if (diet.userId._id != userId) {
                    throw new Error('Unauthorized');
                }
            }
            // add ingredients to diet
            res.json(baseResponse.createResponse({ diet, ingredients: allIngredients }, 'Diet fetched successfully', 200, null));
        } catch (error) {
            res.status(400).json(baseResponse.createResponse(null, error.message, 400, error.toString()));
        }
    }

}

module.exports = DietController;
