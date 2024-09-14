const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: false},
    dateCreated: {type: Date, default: Date.now },
    isPending: {type: Boolean, default: true},
    isCompleted: {type: Boolean, default: false}
});

const Tasks = mongoose.model('Tasks', taskSchema);

module.exports = Tasks;