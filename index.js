const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const users = [
  { id: 1, username: 'admin', password: 'admin123', role: 'admin' },
  { id: 2, username: 'teacher', password: 'teacher123', role: 'teacher' },
  { id: 3, username: 'student', password:'student123', role: 'student' },
];

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);

  if (!user || user.password !== password) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign(
    {
      username: user.username,
      role: user.role,
      name: user.name,
      type: user.type,
      roleId: user.id,
    },
    'secret_key'
  );
  res.json({ token });
});

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token not provided' });
  }

  jwt.verify(token, 'secret_key', (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Failed to authenticate token' });
    }

    req.user = decoded;
    next();
  });
};

app.get('/users', authMiddleware, (req, res) => {
  const { role } = req.user;
  if (role !== 'admin' && role !== 'teacher') {
    return res.status(403).json({ message: 'Unauthenticated User' });
  }

  const { name, type, roleId } = req.user;
  res.json({ message: 'Access granted', role, name, type, roleId });
});

app.post('/signout', (req, res) => {
  // Optionally handle sign-out logic here
  res.json({ message: 'Signed out successfully' });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
