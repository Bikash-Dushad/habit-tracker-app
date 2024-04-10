const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const habitSchema = new Schema({
    habitname: { type: String, required: true },
    date: [{ date: String, complete: String}],
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
},
{
    timestamps: true
});
const Habit = mongoose.model('Habit', habitSchema);

module.exports = Habit;