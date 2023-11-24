const Post = require("../models/postModel");

const getPosts = (req, res) => {
  Post.find()
    .then((posts) => res.json(posts))
    .catch((err) => {
      console.error("Помилка під час отримання постів", err);
      res.status(500).json({ message: "Помилка під час отримання постів" });
    });
};

const createPost = (req, res) => {
  const { author, title, description } = req.body;

  const newPost = new Post({
    author,
    title,
    description,
  });

  newPost
    .save()
    .then(() => {
      res.json({ message: "Пост успішно збережений" });
    })
    .catch((err) => {
      console.error("Помилка при зберіганні поста:", err);
      res.status(400).json({ message: "Помилка при зберіганні поста" });
    });
};

const deletePost = (req, res) => {
  Post.findOneAndDelete({ _id: req.params.id })
    .then(() => res.json({ message: "Пост був успішно видалений" }))
    .catch((err) => {
      console.error("Помилка під час видалення поста", err);
      res.status(500).json({ message: "Помилка під час видалення поста" });
    });
};

const editPost = (req, res) => {
  const { title, description, author } = req.body;

  Post.findByIdAndUpdate(
    req.params.id,
    { title, description, author },
    { new: true }
  )
    .then((updatedPost) => res.json(updatedPost))
    .catch((error) => res.status(500).json({ message: error.message }));
};

module.exports = {
  getPosts,
  createPost,
  deletePost,
  editPost,
};
