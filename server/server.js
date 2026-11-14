require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const authRoutes = require('./routes/auth.routes');
const profileRoutes = require('./routes/profile.routes');
const jobsRoutes = require('./routes/jobs.routes');
const { requireAuth } = require('./middleware/auth.middleware');

if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET must be configured.');

const app = express();
const root = path.join(__dirname, '..');

app.use(cors());
app.use(express.json({ limit: '16kb' }));
app.use(express.static(path.join(root, 'public')));
app.use('/assets', express.static(path.join(root, 'assets')));
app.use('/pages', express.static(path.join(root, 'pages')));
app.get('/alx-signup.js', (request, response) => response.sendFile(path.join(root, 'alx-signup.js')));
app.get('/signup-widget.css', (request, response) => response.sendFile(path.join(root, 'signup-widget.css')));

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/profile', requireAuth, profileRoutes);
app.use('/api/v1/profile', requireAuth, jobsRoutes);
app.get('/api/v1/docs', (request, response) => response.sendFile(path.join(root, 'server', 'docs', 'swagger.json')));

app.use((error, request, response, next) => {
  console.error(error);
  response.status(500).json({ error: 'The server could not complete the request.' });
});

if (require.main === module) {
  app.listen(Number(process.env.PORT || 4173), () => console.log('ALX accessibility module is running.'));
}

module.exports = app;
