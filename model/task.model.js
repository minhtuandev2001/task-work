const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
  title: { type: String },
  status: { type: String, default: 'initial' },
  content: { type: String },
  timeStart: { type: Date },
  timeFinish: { type: Date },
  createdBy: { type: String },
  deleted: {
    type: Boolean,
    default: false
  },
  deletedAt: { type: Date },
}, {
  timestamps: true
})

const Task = mongoose.model('Task', taskSchema)
module.exports = Task