import express from "express";

const routes = express.Router();

const users = [
    {
      name: "Joana",
      lastName: "Duarte",
      id: "1",
    },
    {
      name: "Joana",
      lastName: "Duarte",
      id: "2",
    },
    {
      name: "Joana",
      lastName: "Duarte",
      id: "3",
    },
  ];
  
  routes.get("/users", (req, res) => {
    res.status(200).json(users);
  });
  
  routes.get("/user/:id", (req, res) => {
    const user = users.find((user) => user.id === req.params.id);
  
    if (user) {
      res.json(user);
    } else {
      res.send(`Usuário ${req.params.id} não encontrado`);
    }
  });

  
  export default routes;