import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import posts from './routes/posts.js';
import loggerMiddleware from './middleware/logger.js';
import errorHandler from './middleware/error.js';
import notFound from './middleware/notFound.js';

const port = process.env.PORT || 3000;

const app = express();

// Body Parser middleware: for submitting raw json
app.use(express.json());
// Sending the form data
app.use(express.urlencoded({ extended: false }));

// Logger middleware
app.use(loggerMiddleware);

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api/posts', posts);

// Route for the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route for about page
app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

// notFound middleware should be after all route handlers
app.use(notFound);

// Error Handler middleware should be the last middleware
app.use(errorHandler);

app
  .listen(port, () => {
    console.log(`Server is running on port ${port}`);
  })
  .on('error', (err) => {
    console.error('Failed to start server:', err);
  });
