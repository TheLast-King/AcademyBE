const express = require('express');
const app = express();
const cors = require('cors');

// Mock user data
const users = [
  { id: 1, username: 'user1', password: 'password1' },
  { id: 2, username: 'user2', password: 'password2' }
];

app.use(cors());
app.use(express.json());



app.get('/users', (req,res) => {
    return res.status(200).json({users});
})


// Login endpoint
app.post('/login', (req, res) => {
    const { username, password } = req.body;
  
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required.' });
    }
  
    // For simplicity, using a hard-coded check in this example
    if (username === 'user1' && password === 'password1') {
      return res.status(200).json({ message: 'Login successful!' });
    } else {
      return res.status(401).json({ message: 'Invalid username or password.' });
    }
  });
  



const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
