const mongoose = required('mongoose');

const taskSchema = new mongoose.schema({
    title: {type: String, required: true},
    description: {type: String, required: false},
    dateCreated: {type: Date, default: Date.now },
    isPending: {type: Boolean, default: true},
    isCompleted: {type: Boolean, default: false}
});

const Task = mongoose.model('Tasks', taskSchema);

export default Task;