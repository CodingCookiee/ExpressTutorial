// posts data
let posts = [
  {
    id: 1,
    title: 'Post 1',
    content: 'This is the content of post 1.',
  },
  {
    id: 2,
    title: 'Post 2',
    content: 'This is the content of post 2.',
  },
  {
    id: 3,
    title: 'Post 3',
    content: 'This is the content of post 3.',
  },
];

// @desc Get all posts
// @access Public
// @route GET /api/posts

export const getPosts = (req, res, next) => {
  const limit = parseInt(req.query.limit);
  if (!isNaN(limit) && limit > 0) {
    res.status(200).json(posts.slice(0, limit));
  } else {
    res.status(200).json(posts);
  }
};

// @desc Get a single post
// @route GET /api/posts/:id
// @access Public

export const getPost = (req, res, next) => {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);
  if (post) {
    res.status(200).json(post);
  } else {
    const error = new Error('Post not found');
    error.status = 404;
    return next(error);
  }
};

// @desc Create new post
// @route POST /api/posts/:id
// @access Public
export const createPost = (req, res, next) => {
  const newPost = {
    id: posts.length + 1,
    title: req.body.title,
    content: req.body.content,
  };

  if (!newPost.title) {
    const error = new Error('Title is required');
    error.status = 400;
    return next(error);
  }

  posts.push(newPost);
  res.status(201).json(newPost);
};

// @desc Update post
// @route PUT /api/posts/:id
// @access Public
export const updatePost = (req, res, next) => {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);
  if (post) {
    post.title = req.body.title || post.title;
    post.content = req.body.content || post.content;
    res.status(200).json(post);
  } else {
    const error = new Error(`Post with id ${id} was not found`);
    error.status = 404;
    return next(error);
  }
};

// @desc Delete post
// @route DELETE /api/posts/:id
// @access Public
export const deletePost = (req, res, next) => {
  const id = parseInt(req.params.id);
  const index = posts.findIndex((post) => post.id === id);
  if (index !== -1) {
    posts.splice(index, 1);
    res.status(200).json({ message: 'Post deleted' });
  } else {
    const error = new Error(`Post with id ${id} was not found`);
    error.status = 404;
    return next(error);
  }
};
