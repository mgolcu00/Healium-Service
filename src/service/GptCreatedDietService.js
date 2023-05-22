/*
 * Created on Sat May 20 2023
 *
 * Copyright (c) 2023 Mert Gölcü
 */

const GptCreatedDietSchema = require('../data/schema/GptCreatedDietSchema');
const dotenv = require('dotenv');
const { generateDietCompletion } = require('../util/ChatGptService');
const { validateResult, formatResult } = require('../util/GptResultValidator');

dotenv.config();


class GptCreatedDietService {

    // CRUD

    async create(data) {
        const diet = new GptCreatedDietSchema(data);
        await diet.save();
        return diet;
    }

    async update(id, data) {
        const diet = await this.getDietById(id);
        Object.assign(diet, data);
        await diet.save();
        return diet;
    }

    async delete(id) {
        const diet = await this.getDietById(id);
        await diet.delete();
        return diet;
    }

    // drop all
    async dropAll() {
        return await GptCreatedDietSchema.deleteMany({});
    }


    async createFromGptPrompt(prompt, prefs, user) {
        try {
            const generateDietCompletionResult = await generateDietCompletion(prompt, prefs, user);
            const isValid = validateResult(generateDietCompletionResult);
            if (!isValid) {
                // op for gpt error
                throw new Error('Not valid GPT-3 result');
            }
            var parsed = formatResult(generateDietCompletionResult);
            parsed.userId = user._id;
            parsed.demandId = prefs.demandId;
            return await this.create(parsed);
        } catch (e) {
            console.log(e);
            throw new Error('Invalid GPT-3 result and ' + e.message);
        }
    }

    async getDietById(id, populate = false) {
        if (!populate) {
            return await GptCreatedDietSchema.findById(id);
        }
        return await GptCreatedDietSchema.findById(id).populate('userId').populate('demandId')
    }
    async getDietsByUserId(userId) {
        return await GptCreatedDietSchema.find({ userId });
    }

    async getDietAllIngredients(id, populate = false) {
        const diet = await this.getDietById(id, populate);
        var ingredients = [];
        for(var i = 0; i < diet.days.length; i++) {
            for(var j = 0; j < diet.days[i].meals.length; j++) {
                for(var k = 0; k < diet.days[i].meals[j].ingredients.length; k++) {
                    ingredients.push(diet.days[i].meals[j].ingredients[k]);
                }
            }
        }

        // diet.days.forEach(day => {
        //     day.meals.forEach(meal => {
        //         meal.ingredients.forEach(ingredient => {
        //             ingredients.push(ingredient);
        //         })
        //     })
        // })
       
        var combinedIngredients = []
        // combine ingredients with name and add amount to it
        for(var i = 0; i < ingredients.length; i++) {
            var found = combinedIngredients.find(combinedIngredient => combinedIngredient.name === ingredients[i].name);
            if (found) {
                found.amount += ingredients[i].amount;
            } else {
                combinedIngredients.push(ingredients[i]);
            }
        }
        // ingredients.forEach(ingredient => {
        //     var found = combinedIngredients.find(combinedIngredient => combinedIngredient.name === ingredient.name);
        //     if (found) {
        //         found.amount += ingredient.amount;
        //     } else {
        //         combinedIngredients.push(ingredient);
        //     }
        // })
        return combinedIngredients;
        
    }
}

module.exports = GptCreatedDietService;
