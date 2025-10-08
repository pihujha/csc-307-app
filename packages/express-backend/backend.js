// backend.js
import express from "express";
import cors from "cors";


const app = express();
const port = 8000;

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
  res.send(users);
});

app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;

  let result = users.users_list;

  if (name) result = result.filter(u => u.name === name);
  if (job) result = result.filter(u => u.job === job);

  res.send({ users_list: result });
});

const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);

const addUser = (user) => {
  user.id = Math.random().toString(36).substr(2, 9);
  users.users_list.push(user);
  return user;
};

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  const newUser = addUser(userToAdd);
  res.status(201).send(newUser);
});

app.delete("/users/:id", (req, res) => {
  const id = req.params.id;
  const index = users.users_list.findIndex(u => u.id === id);

  if (index === -1) {
    res.status(404).send("User not found");
  } else {
    users.users_list.splice(index, 1);
    res.status(204).send();
  }
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});