// diet:{
//     name: String,
//     dietTags: [String],
//     dietKeywords: [String],
//     purpose: String,
//     expectedResults: String,
//     days: [{
//         num: Int,
//         name: String,
//         meals: [{
//             name: String,
//             num: Int,
//             ingredients: [{
//                 name: String,
//                 amount: Int,
//                 type: String,
//             }],
//         }],
//     }]
// }

// /*
// prompt:i need a diet for my depression
// age: 22
// gender: male
// height: 187cm
// weight: 105kg
// alergens: egg , milk
// type: weekly get all days on a week
// diet schema :{ name: String, tags: [String], keywords: [String], purpose: String, expectedResults: String, days: [{ num: Number, name: String, meals: [{ name: String, ingredients: [{ name: String, amount: Integer, type: String, }], }], }]}
// get as JSON  one line:
// */

// prompt={
//   "prompt": "get a diet for my adhd",
//   "age":22,
//   "gender":"Male",
//   "height": 180,
//   "weight": 80,
//   "allergies": ["milk", "egg"],
//   "duration": "weekly",
//   "numsOfDays": 7,
//   "language": "en",
//   "retrunType": "json",
//   "returnVariables":[
//     {"name": "name", "type": "string"},
//     {"name": "tags", "type": "string"},
//     {"name": "keywords", "type": "string"},
//     {"name": "purpose", "type": "string"},
//     {"name": "expectedResults", "type": "string"},
//     {"name": "days", "type": "list","variables":[
//       {"name": "num", "type": "integer"},
//       {"name": "name", "type": "string"},
//       {"name": "meals", "type": "list","variables":[
//         {"name": "name", "type": "string"},
//         {"name": "num", "type": "integer"},
//         {"name": "ingredients", "type": "list","variables":[
//           {"name": "id", "type": "integer"},
//           {"name": "name", "type": "string"},
//           {"name": "amount", "type": "integer"},
//           {"name": "type", "type": "string"},
//         ]},
//       ]},
//     ]}
//   ]
// }

// promptv2={
//   "prompt": "get a diet for my adhd",
//   "age":22,
//   "gender":"Male",
//   "height": 180,
//   "weight": 80,
//   "allergies": ["milk", "egg"],
//   "duration": "weekly get all days",
//   "numsOfDays": 7,
//   "language": "en",
//   "retrunType": "json",
//   "returnVariables":[
//     {"name": "name", "type": "string"},
//     {"name": "tags", "type": "string"},
//     {"name": "keywords", "type": "string"},
//     {"name": "purpose", "type": "string"},
//     {"name": "expectedResults", "type": "string"},
//     {"name":"meals","type":"list","variables":[
//         {"name": "name", "type": "string"},
//         {"name": "num", "type": "integer"},
//         {"name":"dayOfWeek","type":"integer"},
//         {"name":"mealOfDay","type":"integer"},
//         {"name": "ingredients", "type": "list","variables":[
//             {"name": "name", "type": "string"},
//             {"name": "amount", "type": "integer"},
//             {"name": "type", "type": "string"},
//         ]} 
//       ]}
//   ]}


// // prompt={
// //   "prompt": "get a diet for my adhd",
// //   "age":22,
// //   "gender":"Male",
// //   "height": 180,
// //   "weight": 80,
// //   "allergies": ["milk", "egg"],
// //   "duration": "weekly",
// //   "numsOfDays": 7,
// //   "language": "en",
// //   "retrunType": "json",
// //   "returnVariables":[
// //     {"name": "name", "type": "string"},
// //     {"name": "tags", "type": "string"},
// //     {"name": "keywords", "type": "string"},
// //     {"name": "purpose", "type": "string"},
// //     {"name": "expectedResults", "type": "string"},
// //     {"name": "days", "type": "list","examples":[
// //       {"num": 1, "name": "Monday", "meals": [
// //         {"name": "breakfast", "num": 1, "ingredients": [
// //           {"name": "egg", "amount": 2, "type": "piece"},
// //           {"name": "milk", "amount": 1, "type": "glass"},
// //         ]},
// //         {"name": "lunch", "num": 2, "ingredients": [
// //           {"name": "chicken", "amount": 200, "type": "gram"},
// //           {"name": "rice", "amount": 100, "type": "gram"},
// //         ]},
      
// //       ]},
// //       {"num": 2, "name": "Tuesday", "meals": [
// //         {"name": "breakfast", "num": 1, "ingredients": [
// //           {"name": "egg", "amount": 2, "type": "piece"},
// //           {"name": "milk", "amount": 1, "type": "glass"},
// //         ]},

// //       ]},
// //     ]},
// //     {"name": "meals", "type": "list", "listType": "object", "objectType": "meal"},
// //     {"name": "ingredients", "type": "list", "listType": "object", "objectType": "ingredient"},
// //   ]
// // }
