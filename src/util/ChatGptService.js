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
    const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: promtStr,
        temperature: 0.9,
        max_tokens: maxTokents,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        best_of: 1,
    });
    return completion.data.choices[0].text;
}


// const result = generateDietCompletion(
//     "i have a deppresion and i want to eat healthy",
//     {
//         age: 20,
//         gender: "Male",
//         height: 180,
//         weight: 80,
//         allergies: ["milk", "egg"],
//     },
//     {}
// )

module.exports = {
    generateDietCompletion,
};
