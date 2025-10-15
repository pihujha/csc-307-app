// backend.js
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import userService from "./Models/user_service.js";
import userModel from "./user.js"
 

const app = express();
const port = 8000;

mongoose.set("debug", true);

mongoose
    .connect("mongodb://localhost:27017/users", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .catch((error) => console.log(error));


app.use(cors());
app.use(express.json());

const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor"
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer"
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor"
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress"
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender"
    }
  ]
};

app.get("/", (req, res) => {
  res.send("Backend is running.");
});


// useers can filter by name
app.get("/users", (req, res) => {
  const { name, job } = req.query;

  userService
    .getUsers(name, job)
    .then((users) => res.status(200).send({ users_list: users }))
    .catch((err) => {
      console.error("Error fetching users:", err);
      res.status(500).send("Error fetching users");
    });
});

app.get("/users/:id", (req, res) => {
  const id = req.params.id;

  userService
    .findUserById(id)
    .then((user) => {
      if (!user) return res.status(404).send("User not found");
      res.status(200).send(user);
    })
    .catch((err) => {
      console.log(err)
      res.status(500).send("Error fetching user");
    });
});

app.post("/users", (req, res) => {
  const user = req.body;

  userService
    .addUser(user)
    .then((newUser) => res.status(201).send(newUser))
    .catch((err) => {
      console.log(err);
      res.status(500).send(err.message);
    });
});

app.delete("/users/:id", (req, res) => {
  const id = req.params.id;

  userModel
    .findByIdAndDelete(id)
    .then((deletedUser) => {
      if (!deletedUser) return res.status(404).send("User not found");
      res.status(204).send(); 
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error deleting user");
    });
});


app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});