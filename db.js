require("dotenv").config();
const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    name: String,
});

const Message = mongoose.model("Message", messageSchema);

async function connectDatabase() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB!");

        const existingMessage = await Message.findOne({
            name: "Hello World",
        });

        if (!existingMessage) {
            const message = new Message({
                name: "Hello World",
            });

            await message.save();
            console.log("Message saved to MongoDB!");
        }
    } catch (error) {
        console.error("MongoDB connection failed:", error);
    }
}

connectDatabase();