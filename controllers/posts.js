import Post from "../models/Post.js"


export const createTask = async (req, res) => {
  try {

    const { text } = req.body

    const post = new Post({ text })

    const errors = post.validateSync()
    
    if (errors) {
      return res.status(400).json({ message: 'Invalid values', errors })
    }

    try {
      await post.save() 
    } catch (e) {
      return res.status(500).json({ message: 'Cannot save post' })
    }

    return res.status(200).json({ post })

  } catch (e) {
    return res.status(500).json({ message: 'Unknown error' })
  }
}
