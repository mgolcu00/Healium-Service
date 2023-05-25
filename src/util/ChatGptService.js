/*
 * Created on Sat May 20 2023
 *
 * Copyright (c) 2023 Mert Gölcü
 */

const { Configuration, OpenAIApi } = require("openai");
const dotenv = require('dotenv');
dotenv.config();
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);



const { generatePrompt } = require('./PromptGenerator');


const generateDietCompletion = async (prompt, prefs, user) => {
    const fullPrompt = generatePrompt(prompt, prefs, user);
    promtStr = JSON.stringify(fullPrompt) + "\n full result is : \n";
    const maxTokents = 4095 - promtStr.length;
    console.log(promtStr);
    try {
        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: promtStr,
            temperature: 1,
            max_tokens: maxTokents,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
            best_of: 1,
        });
        return completion.data.choices[0].text;
    } catch (e) {
        console.log(e);
        throw new Error('Invalid GPT-3 result and ' + e.message);
    }
}

module.exports = {
    generateDietCompletion,
};
