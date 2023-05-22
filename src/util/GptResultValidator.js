
const requiredFields = [
    "name",
    "tags",
    "keywords",
    "purpose",
    "expectedResults",
    "days"
]

const requiredDayFields = [
    "num",
    "name",
    "meals"
]

const requiredMealFields = [
    "name",
    "num",
    "ingredients"
]

const requiredIngredientFields = [
    "name",
    "amount",
    "type"
]




const validateResult = (result) => {
    try{
        const parsedResult = JSON.parse(result)
        if(!parsedResult){
            return false
        }
        for(const field of requiredFields){
            if(!parsedResult[field]){
                return false
            }
        }
        for(const day of parsedResult.days){
            for(const field of requiredDayFields){
                if(!day[field]){
                    return false
                }
            }
            for(const meal of day.meals){
                for(const field of requiredMealFields){
                    if(!meal[field]){
                        return false
                    }
                }
                for(const ingredient of meal.ingredients){
                    for(const field of requiredIngredientFields){
                        if(!ingredient[field]){
                            return false
                        }
                    }
                }
            }
        }
        return true
    }catch(err){
        console.log(err)
        return false
    }
}

const formatResult = (result) => {
    try {
        const parsedResult = JSON.parse(result)
        if (!parsedResult) {
          throw new Error('Not valid GPT-3 result');
        }
        parsedResult.tags = parsedResult.tags.split(',')
        parsedResult.keywords = parsedResult.keywords.split(',')
        
        return parsedResult
    } catch (err) {
        throw new Error('Invalid GPT-3 result and ' + err.message);
    }
}


module.exports = {
    validateResult,
    formatResult
}