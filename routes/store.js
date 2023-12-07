import express from "express";

const routes = express.Router();
const autenticacao = true;
const permissao = 'admin';

const lojas = [
  {
    id: "1",
    nome: "Loja 1",
    faturamento: 1500,
  },
  {
    id: "2",
    nome: "Loja 2",
    faturamento: 3000,
  },
  {
    id: "3",
    nome: "Loja 3",
    faturamento: 10000,
  },
  {
    id: "4",
    nome: "Loja 4",
    faturamento: 800,
  },
  {
    id: "5",
    nome: "Loja 5",
    faturamento: 100000,
  },
];

routes.get("/lojas", (req, res) => {
  res.status(200).json({
    data: lojas,
    mensagem: "Lojas encontradas com sucesso!",
    pagination: {
      page: 1,
      perPage: 10,
    },
  });
});

routes.get("/loja/:id", (req, res) => {
  const loja = lojas.find((loja) => loja.id === req.params.id);
  res.status(200).json(loja);
});

routes.get("/lojas/faturamento", (req, res) => {
  const faturamentoPorLojas = [];
  for (const loja of lojas) {
    faturamentoPorLojas.push({
      [loja.nome]: loja.faturamento,
    });
  }
  res.status(200).json(faturamentoPorLojas);
});

routes.post("/loja", (req, res) => {
  const lojas = lojas.find((loja) => loja.id === req.body.id);

  if(!autenticacao) {
    return res.status(401).json({message: "Usuário não autenticado"});
  }

  if(permissao !== "admin") {
    return res 
        .status(403)
        .json({message: "Usuário não possui autorização suficiente!"});
  }

  if(lojas.length < 1) {
    return res.status(200).json({message: "Não há lojas cadastradas!"});
  }

  const loja = lojas.find((loja) => loja.id === req.params.id);

  if(!loja) {
    return res.status(400).json({message: "Loja não encontrada"})
  }

  if (!req.body.id) {
    return res.status(400).json({ mensagem: "Id não identificado!" });
  }

  if (loja) {
    return res.status(400).json({ mensagem: "ID já cadastrado!" });
  }

  if (!req.body.nome) {
    return res.status(400).json({ mensagem: "Nome da loja é obrigatório!" });
  }

  let lojasPropriedade = {};
  
  if (!req.body.faturamento) {
    lojasPropriedade = {
        ...req.body, 
        faturamento: 0,
    };  
  }
  
  lojas.push(req.body);
  return res.status(201).json(lojas);
});

routes.delete("/loja/:id", (req, res) => {
  const produtoDeletado = lojas.splice(req.params.id - 1, 1);
  console.log(produtoDeletado);
  res.status(200).json(produtoDeletado[0].id);
});

routes.patch("/loja/:id", (req, res) => {
  const index = req.params.id - 1;
  lojas.splice(index, 1, {
    ...lojas[index],
    ...req.body,
  });
  res.status(200).json(lojas);
});

export default routes;