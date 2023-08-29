import { Schema, model, models } from 'mongoose';

const TaskSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
});

export const Task = models.Task || model('Task', TaskSchema);
