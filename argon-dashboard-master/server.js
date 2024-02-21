const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// CORS configuration
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb+srv://thecodeofduty:code123@cluster0.06x8wmb.mongodb.net/project?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;

db.once('open', () => console.log('Connected to MongoDB'));

// Define a schema for user data
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  age: Number,
  stage: Number,
  report: String // Assuming report is a file path or URL
});

// Create a model based on the schema
const User = mongoose.model('User', userSchema);

// Middleware to parse JSON data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Handle POST request to save user data (sign-up)
app.post('/sign_up', async (req, res) => {
  try {
    console.log('Received registration request:', req.body); // Log the request body
    const user = new User(req.body);
    console.log('Creating user:', user); // Log the user object before saving
    await user.save();
    console.log('User created successfully:', user); // Log the user object after saving
    // Redirect to dashboard.html after successful sign-up
    res.redirect('/argon-dashboard-master/pages/dashboard.html');
  } catch (error) {
    console.error('Error creating user:', error); // Log any errors that occur
    res.send('Error creating user');
  }
});

// Handle POST request for user sign-in
app.post('/sign_in', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (user) {
      // Redirect to dashboard.html after successful sign-in
      res.redirect('/pages/dashboard.html');
    } else {
      res.status(401).send('Invalid email or password'); // Unauthorized status code
    }
  } catch (error) {
    console.error('Error signing in:', error); // Log any errors that occur
    res.send('Error signing in');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
