const dotenv = require("dotenv");
dotenv.config({ path: ".env" });
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const UserModel = require("./models/user");
const ToyModel = require("./models/toy");

// Load data from JSON
const users = JSON.parse(
  fs.readFileSync(path.join(__dirname, "./data/users.json"), "utf-8")
);
const toys = JSON.parse(
  fs.readFileSync(path.join(__dirname, "./data/toys.json"), "utf-8")
);

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);

    await UserModel.deleteMany();
    await ToyModel.deleteMany();

    const hashedUsers = await Promise.all(
      users.map(async (user) => ({
        ...user,
        password: await bcrypt.hash(user.password, 10),
      }))
    );

    const insertedUsers = await UserModel.insertMany(hashedUsers);

    const toysWithUserIds = toys.map((toy, index) => ({
      ...toy,
      user_id: insertedUsers[index % insertedUsers.length]._id,
    }));

    await ToyModel.insertMany(toysWithUserIds);

    console.log("Database seeded!");
    process.exit();
  } catch (err) {
    console.error("Error seeding database:", err);
    process.exit(1);
  }
}

seedDatabase();
