const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const app = express()
app.use(cors())
app.use(express.json())

// Fixed the missing closing parenthesis at the very end of this connection block
mongoose.connect("mongodb://sajana:2504@ac-ltz4eec-shard-00-00.pdwztor.mongodb.net:27017,ac-ltz4eec-shard-00-01.pdwztor.mongodb.net:27017,ac-ltz4eec-shard-00-02.pdwztor.mongodb.net:27017/busdb?ssl=true&replicaSet=atlas-ptliri-shard-0&authSource=admin&appName=Cluster0")
.then(() => {
    console.log("mongodb connected")
})
.catch((error) => {
    console.log(error)
}); // <-- Properly closed now

const Booking = mongoose.model("Booking", new mongoose.Schema({
    userId: { type: String, required: true },
    busId: { type: String, required: true },
    journeyDate: { type: String, required: true },
    passengerName: { type: String, required: true },
    passengerAge: { type: String, required: true },
    passengerGender: { type: String, required: true },
    seatNumber: { type: String, required: true },
    totalFare: { type: String, required: true },
    bookingStatus: { type: String, default: "Confirmed" }
}));

app.get("/test", (req, res) => {
    res.send("hiiii");
});

// POST route to save new bookings
app.post("/add-booking", async (req, res) => {
    try {
        await Booking.create(req.body)
        res.json({ status: "Success" })
    } catch (err) {
        console.log(err)
        res.status(400).json({ status: "Error", message: err.message })
    }
})

// ADDED: Simple GET route so your frontend can retrieve data for the view page
app.get("/view-bookings", async (req, res) => {
    try {
        const data = await Booking.find()
        res.json(data)
    } catch (err) {
        console.log(err)
        res.status(500).json({ status: "Error", message: "Failed to fetch bookings" })
    }
})



app.listen(3000, () => {
    console.log("server started")
})
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
