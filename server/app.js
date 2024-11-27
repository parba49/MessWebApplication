require("dotenv").config();

const express = require('express');
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const passport = require("passport");

const User = require("./models/user.model");

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
