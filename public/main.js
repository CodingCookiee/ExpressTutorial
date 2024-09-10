const output = document.querySelector('#output');
const button = document.querySelector('#get-posts-btn');
const form = document.querySelector('#post-form');
const titleInput = document.querySelector('#title');
const contentInput = document.querySelector('#content');
const createButton = document.querySelector('#create-btn');
const errorMessage = document.createElement('p');

// async showPosts
async function showPosts() {
  try {
    const response = await fetch('http://localhost:8000/api/posts');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const posts = data.map((post) => {
      const postElement = document.createElement('div');
      const titleElement = document.createElement('h2');
      const bodyElement = document.createElement('p');
      titleElement.textContent = post.title;
      bodyElement.textContent = post.content;
      postElement.appendChild(titleElement);
      postElement.appendChild(bodyElement);
      return postElement;
    });
    output.innerHTML = '';
    posts.forEach((post) => output.appendChild(post));
  } catch (error) {
    output.innerHTML = '';
    errorMessage.textContent = 'Failed to fetch posts: ' + error.message;
    output.appendChild(errorMessage);
    console.log('Error fetching posts:', error);
  }
}

// Create new Post =-Function
async function createPost() {
  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;
  const post = { title, content };
  try {
    const response = await fetch('http://localhost:8000/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(post),
    });
    const newPost = await response.json();
    console.log('New post created:', newPost);
  } catch (error) {
    console.log('Error creating post:', error);
  }
}
// Event Listeners
button.addEventListener('click', showPosts);
form.addEventListener('submit', createPost);
