import express from "express";

const routes = express.Router();

const lojas = [
    {
        id: "1",
        nome: "Lojas Americanas",
        fat: 1000,
    },

    {
        id: "2",
        nome: "Magazine Luiza",
        fat: 1000000000,
    },

    {
        id: "3",
        nome: "Ricardo Eletro",
        fat: 0,
    },

    {
        id: "4",
        nome: "Ibyte",
        fat: 2345000000,
    },

]

routes.get('/lojas', (req, res) => { //todos os produtos
res.json(lojas)
})

routes.get('/lojas/:id', (req, res) => {
    const loja = lojas.find((loja) => loja.id === req.params.id)
    res.json(loja); //produto específico
})

routes.post("/lojas", (req, res) => {
    lojas.push(req.body);
    res.json(lojas);
  });

routes.delete("/lojas/:id", (req,res) => {
    lojas.splice(req.params.id -1, 1);
    res.json(loja)
})


export default routes;