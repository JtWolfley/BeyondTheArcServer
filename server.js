
require("dotenv").config();
require("./db");

const express = require("express");
const cors = require("cors");
const path = require("path");

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

// API endpoint
app.get("/api/players", (req, res) => {
    res.json(players);
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});
