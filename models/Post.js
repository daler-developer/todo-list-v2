import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, 'text is required!!!']
  }
})

const Post = mongoose.model('Post', postSchema)

export default Post
