

/*
prompt={
  "prompt": "get a diet for my adhd",
  "age":22,
  "gender":"Male",
  "height": 180,
  "weight": 80,
  "allergies": ["milk", "egg"],
  "duration": "weekly",
  "numsOfDays": 7,
  "language": "en",
  "retrunType": "json",
  "returnVariables":[
    {"name": "name", "type": "string"},
    {"name": "tags", "type": "string"},
    {"name": "keywords", "type": "string"},
    {"name": "purpose", "type": "string"},
    {"name": "expectedResults", "type": "string"},
    {"name":"meals":"type":"list","variables":[
        {"name": "name", "type": "string"},
        {"name": "num", "type": "integer"},
        {"name",:"dayOfWeek":"type":"integer"},
        {"name",:"mealOfDay":"type":"integer"},
        {"name": "ingredients", "type": "list","variables":[
            {"name": "name", "type": "string"},
            {"name": "amount", "type": "integer"},
            {"name": "type", "type": "string"},
        ]}
  ]
}
*/

const getReturnVariables = () => {
    return [
        { "name": "name", "type": "string" },
        { "name": "tags", "type": "string" },
        { "name": "keywords", "type": "string" },
        { "name": "purpose", "type": "string" },
        { "name": "expectedResults", "type": "string" },
        {
            "name": "days", "type": "list", "variables": [
                { "name": "num", "type": "integer" },
                { "name": "name", "type": "string" },
                {
                    "name": "meals", "type": "list", "variables": [
                        { "name": "name", "type": "string" },
                        { "name": "num", "type": "integer" },
                        {
                            "name": "ingredients", "type": "list", "variables": [
                                { "name": "name", "type": "string" },
                                { "name": "amount", "type": "integer" },
                                { "name": "type", "type": "string" },
                            ]
                        },
                    ]
                },
            ]
        }
    ]
}



exports.generatePrompt = (prompt, prefs, user) => {
    var prompt = {
        prompt: prompt,
        age: user.age,
        gender: user.gender,
        height: user.height,
        weight: user.weight,
        allergies: user.allergies,
        duration: prefs.duration || "weekly",
        numsOfDays: prefs.numsOfDays || 7,
        language: prefs.language || "en",
        retrunType: prefs.retrunType || "json",
        returnVariables: prefs.returnVariables || getReturnVariables(),
    }
    // remove is allergies is empty or undefined
    if (prompt.allergies === undefined || prompt.allergies.length == 0) {
        delete prompt.allergies;
    }

    return prompt;

}
