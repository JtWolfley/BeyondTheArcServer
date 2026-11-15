
require("dotenv").config();
require("./db");

const express = require("express");
const cors = require("cors");
const path = require("path");
const Joi = require("joi");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

// NBA player data
const players = [
    {
        _id: 1,
        name: "ANTHONY EDWARDS",
        team: "MINNESOTA TIMBERWOLVES",
        position: "SG",
        image: "images/anthony.png"
    },
    {
        _id: 2,
        name: "VICTOR WEMBANYAMA",
        team: "SAN ANTONIO SPURS",
        position: "C",
        image: "images/victorw.png"
    },
    {
        _id: 3,
        name: "SHAI GILGEOUS-ALEXANDER",
        team: "OKLAHOMA CITY THUNDER",
        position: "PG/SG",
        image: "images/sga.png"
    },
    {
        _id: 4,
        name: "NIKOLA JOKIC",
        team: "DENVER NUGGETS",
        position: "C",
        image: "images/jokic.png"
    },
    {
        _id: 5,
        name: "LUKA DONCIC",
        team: "LOS ANGELES LAKERS",
        position: "PG",
        image: "images/luka.png"
    },
    {
        _id: 6,
        name: "JALEN BRUNSON",
        team: "NEW YORK KNICKS",
        position: "PG",
        image: "images/Brunson.png"
    },
    {
        _id: 7,
        name: "GIANNIS ANTETOKOUNMPO",
        team: "MILWAUKEE BUCKS",
        position: "PF",
        image: "images/giannis.png"
    },
    {
        _id: 8,
        name: "STEPHEN CURRY",
        team: "GOLDEN STATE WARRIORS",
        position: "PG",
        image: "images/curry.png"
    }
];

const fanHoopers = [
    {
        _id: 1,
        name: "CLUTCH KING",
        position: "PG",
        playstyle: "Playmaker",
        team: "Los Angeles Lakers"
    },
    {
        _id: 2,
        name: "THE SNIPER",
        position: "SG",
        playstyle: "Sharpshooter",
        team: "Golden State Warriors"
    }
];

const hooperSchema = Joi.object({
    name: Joi.string().trim().min(2).max(30).required(),

    position: Joi.string()
        .valid("PG", "SG", "SF", "PF", "C")
        .required(),

    playstyle: Joi.string()
        .valid(
            "Playmaker",
            "Sharpshooter",
            "Slasher",
            "Defender",
            "All-Around"
        )
        .required(),

    team: Joi.string().trim().min(2).max(50).required()
});

// API endpoint
app.get("/api/players", (req, res) => {
    res.json(players);
});

app.get("/api/fanhoopers", (req, res) => {
    res.json(fanHoopers);
});

app.post("/api/fanhoopers", (req, res) => {
    const { error, value } = hooperSchema.validate(req.body, {
        abortEarly: false
    });

    if (error) {
        return res.status(400).json({
            success: false,
            message: "Invalid player information.",
            errors: error.details.map((detail) => detail.message)
        });
    }

    const newHooper = {
        _id: Math.max(0, ...fanHoopers.map((hooper) => hooper._id)) + 1,
        ...value
    };

    fanHoopers.push(newHooper);

    return res.status(201).json({
        success: true,
        message: "Fan hooper added successfully!",
        hooper: newHooper
    });
});


app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});
