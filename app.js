const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://sajana:2504@ac-ltz4eec-shard-00-00.pdwztor.mongodb.net:27017,ac-ltz4eec-shard-00-01.pdwztor.mongodb.net:27017,ac-ltz4eec-shard-00-02.pdwztor.mongodb.net:27017/busdb?ssl=true&replicaSet=atlas-ptliri-shard-0&authSource=admin&appName=Cluster0")
.then(() => {
    console.log("mongodb connected");
})
.catch((error) => {
    console.log(error);
});

const Bus = mongoose.model("buses", new mongoose.Schema({
    busNumber: String,
    busName: String,
    busType: String,
    source: String,
    destination: String,
    departureTime: String,
    arrivalTime: String,
    totalSeats: String,
    availableSeats: String,
    fare: String
}));

const UserData = mongoose.model("Users", new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    gender: String,
    age: String,
    address: String,
    createdAt: String
}));

app.get("/test", (req, res) => {
    res.send("server running");
});

app.post("/add-bus", async (req, res) => {
    await Bus.create(req.body);
    res.json({ status: "success" });
});

app.post("/view-bus", async (req, res) => {
    const buses = await Bus.find();
    res.json(buses);
});

app.post("/add-user", async (req, res) => {
    await UserData.create(req.body);
    res.json({ status: "Success" });
});

app.post("/view-user", async (req, res) => {
    const users = await UserData.find();
    res.json(users);
});

app.listen(3000, () => {
    console.log("server started");
});