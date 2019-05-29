import { VideoSchema } from './video.mjs';

import mongoose from 'mongoose';
mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true });

const TodoSchema = new mongoose.Schema({
  type: String,
  title: String,
  description: String,
  done: Boolean,
  video: VideoSchema
});

const Todo = mongoose.model('Todo', TodoSchema);

export default Todo;
export { TodoSchema };