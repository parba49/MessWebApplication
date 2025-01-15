require("dotenv").config();

const express = require('express');
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const passport = require("passport");

const User = require("./models/user.model"); 
const Data = require("./models/data.model")

const saltRounds = 10;

require("./config/database");
require("./config/passport");

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize());

// Home route
app.get("/", (req, res) => {
    res.send("<h1> This is home route </h1>");
});

// Register route
app.post("/register", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (user) {
            return res.status(400).send({ success: false, message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

        const newUser = new User({
            username: req.body.username,
            password: hashedPassword,
        });

        const savedUser = await newUser.save();
            res.send({
            success: true,
            message: "User is created successfully",
            user: {
                id: savedUser._id,
                username: savedUser.username,
            },
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({
            success: false,
            message: "Internal server error",
            error: err.message,
        });
    }
});

// Login route
app.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).send({ success: false, message: "Username and password are required" });
        }

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).send({ success: false, message: "User not found" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(401).send({ success: false, message: "Incorrect password" });
        }

        const payload = {
            id: user._id,
            username: user.username,
        };
        const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "2d" });

        return res.status(200).send({
            success: true,
            message: "User is logged in successfully",
            token: "Bearer " + token,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({
            success: false,
            message: "Internal server error",
        });
    }
});

// Profile route
app.get('/profile', passport.authenticate('jwt', { session: false }), (req, res) => {
    return res.status(200).json({
        success: true,  
        user: {
            id: req.user._id,
            username: req.user.username,
        },
    });
}); 
// POST route to save mess data
app.post("/mess-data", 
    passport.authenticate("jwt", { session: false }), 
    async (req, res) => {
      const {username, millCount, bazarCost } = req.body;

      if (!millCount || !bazarCost) {
        return res.status(400).json({ message: "All fields are required." });
      }
      try {
        const newData = new Data({ 
          username:username,
          millcount: millCount,
          bazarcost: bazarCost,
        });
        await newData.save();
        return res.status(200).json({ message: "Data saved successfully!" });
      } catch (err) {
        console.error("Error saving mess data:", err);
        return res.status(500).json({ message: "Failed to save data." });
      }
    }
); 
////balance check 
app.get("/calculate-balances", passport.authenticate("jwt", { session: false }), async (req, res) => {
    try {
      // Aggregate total mill count and bazar cost
      const totals = await Data.aggregate([
        {
          $group: {
            _id: null,
            totalMillCount: { $sum: "$millcount" },
            totalBazarCost: { $sum: "$bazarcost" },
          },
        },
      ]);
      if (totals.length === 0) {
        return res.status(200).json({ message: "No data available for calculation" });
      }
  
      const { totalMillCount, totalBazarCost } = totals[0];
      const millRate = totalBazarCost / totalMillCount;
  
      // Fetch user data and calculate balances
      const usersData = await Data.aggregate([
        {
          $group: {
            _id: "$userId",
            totalMillCount: { $sum: "$millcount" },
            totalBazarCost: { $sum: "$bazarcost" },
          },
        },
      ]);
  
      const balances = usersData.map((user) => {
        const contribution = user.totalMillCount * millRate;
        const balance = contribution - user.totalBazarCost;
  
        return {
          userId: user._id,
          totalMillCount: user.totalMillCount,
          totalBazarCost: user.totalBazarCost,
          contribution: contribution.toFixed(2),
          balance: balance.toFixed(2),
          status: balance > 0 ? "Will receive" : "Needs to pay",
        };
      });
  
      return res.status(200).json({
        millRate: millRate.toFixed(2),
        balances,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  });

// 404 handler
app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});

// General error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

module.exports = app;
