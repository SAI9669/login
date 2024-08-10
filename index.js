const express = require("express");
const path = require("path");
const { initializeApp } = require("firebase/app");
const {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} = require("firebase/auth");
const fetch = require("node-fetch").default; // Import node-fetch as CommonJS

const app = express();

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBMNc9VR6sVTnKv9hlR2gU3TLFiaq-gk5I",
  authDomain: "rishi-fda18.firebaseapp.com",
  projectId: "rishi-fda18",
  storageBucket: "rishi-fda18.appspot.com",
  messagingSenderId: "521140486717",
  appId: "1:521140486717:web:7c725ec4af0065c4e5a054",
  measurementId: "G-Q9MY1LHY1T"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve the HTML file
app.get("/", (req, res) => {
  res.render("login"); // Make sure you have a views/login.ejs file
});

// Endpoint to login a user
app.post("/log-in", async (req, res) => {
  const { email, password } = req.body;
  const auth = getAuth(firebaseApp);

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log(user);
    
  } catch (error) {
    const errorMessage = error.message;
    console.error(error);
    res.status(400).send(`Error1: ${errorMessage}`);
  }
});

// Endpoint to create a new user
app.post("/register", async (req, res) => {
  const { email, password } = req.body;
  const auth = getAuth(firebaseApp);

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log(user);
   
  } catch (error) {
    const errorMessage = error.message;
    console.error(error);
    res.status(400).send(`Error: ${errorMessage}`);
  }
});


// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Start server
const PORT = process.env.PORT || 3010;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
