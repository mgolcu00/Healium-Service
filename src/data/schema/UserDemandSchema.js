const mongoose = require('mongoose');


const UserDemandSchema = new mongoose.Schema({
    type: { type: String, required: true ,default:"diet"}, // diet, exercise, blog, etc.
    prompt: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    status: { type: String, default: 'pending' }, // pending, completed, failed
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    dietId: { type: mongoose.Schema.Types.ObjectId, ref: 'GptCreatedDiet', required: false },
    failedCause: { type: String, required: false },
    completedAt: { type: Date, required: false },
    failedAt: { type: Date, required: false },
});

module.exports = mongoose.model('UserDemand', UserDemandSchema);





