const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
/*
age: 20,
//         gender: "Male",
//         height: 180,
//         weight: 80,
//         allergies: ["milk", "egg"],
*/
const UserSchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    height: { type: Number, required: false , default: 180},
    weight: { type: Number, required: false , default: 80},
    allergies: { type: [String], default: [] },
    interests: { type: [String], default: [] },
    coins: { type: Number, default: 5 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

UserSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('User', UserSchema);