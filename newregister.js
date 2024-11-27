// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Initialize the app
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose
  .connect('mongodb://localhost:27017/inclusive_education', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Define Mongoose Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  password: String,
  role: String,
});

// Create Mongoose Model
const User = mongoose.model('User', userSchema);

// Serve static files (like your HTML and CSS)
app.use(express.static('public')); // Ensure your HTML and CSS files are in the 'public' folder


// Root route to serve homepage.html
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/homepage.html'); // Ensure this path points to your homepage.html file
});

// Root route to redirect to login page


// app.get('/', (req, res) => {
//   res.redirect('/login.html'); // This redirects to login.html
// });


// Route to serve login page
app.get('/login.html', (req, res) => {
  res.sendFile(__dirname + '/public/login.html'); // Ensure this path points to your login.html file
});
// Handle the login form submission
// app.post('/login', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Find user by email and password
//     const user = await User.findOne({ email, password });

//     if (user) {
//       console.log('User logged in:', user);

//       // Redirect user to homepage or dashboard after successful login
//       res.redirect('/vedha.html'); // Change this to your actual dashboard URL
//     } else {
//       // Alert user of invalid credentials
//       res.send(`
//         <script>
//           alert('Invalid email or password. Please try again or Register.');
//           window.location.href = '/login.html'; // Redirect back to the login page
//         </script>
//       `);
//     }
//   } catch (err) {
//     console.error('Error during login:', err);
//     res.status(500).send('Error logging in. Please try again.');
//   }
// });















// Route to serve registration page
app.get('/newregister.html', (req, res) => {
  res.sendFile(__dirname + '/public/newregister.html'); // Ensure this path points to your newregister.html file
});

// Endpoint to handle registration form submission
app.post('/register', async (req, res) => {
  try {
    // Check if user already exists by email or name
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).send('User already exists. Please login.');
    }

    // Create a new user instance
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      password: req.body.password, // Consider hashing the password before saving (see below for better security)
      role: req.body.role,
    });

    // Save user to MongoDB
    await newUser.save();

    console.log('User registered successfully:', newUser);

    // Redirect to login page after successful registration
    res.redirect('/login.html');
  } catch (err) {
    console.error('Error saving user:', err);
    res.status(500).send('Error registering user. Please try again.');
  }
});

// Endpoint to handle login form submission
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email and password
    const user = await User.findOne({ email, password });

    if (user) {
      console.log('User logged in:', user);

      // Redirect user to dashboard after successful login
      res.send(`
        <script>
          alert('Login successful! Redirecting to EDUBRIDGE...');
          window.location.href = '/vedha.html'; // Change this to your actual dashboard URL
        </script>
      `);
    } else {
      // Alert user of invalid credentials
      res.send(`
        <script>
          alert('Invalid email or password. Please try again or Register.');
          window.location.href = '/login.html';
        </script>
      `);
    }
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).send('Error logging in. Please try again.');
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
