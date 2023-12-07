import express from "express";

const routes = express.Router();
const autenticacao = true
const permissao = "vendedor"

const produtos = [
  {
    id: "1",
    nome: "Teclado",
    quantidade: 15,
    valorUnit: 19,
  },
  {
    id: "2",
    nome: "Monitor",
    quantidade: 6,
    valorUnit: 200,
  },
  {
    id: "3",
    nome: "Pen drive",
    quantidade: 100,
    valorUnit: 32,
  },
  {
    id: "4",
    nome: "Cadeira",
    quantidade: 3,
    valorUnit: 900,
  },
  {
    id: "5",
    nome: "Notebook",
    quantidade: 4,
    valorUnit: 3200,
  },
];

//if(!autenticacao) {
  //return res.status(401).json({message: "Usuário não autenticado"});
//}

/*                                                                                 -- ver o que ta dando errado --
if(permissao !== "vendedor") {
  return res 
      .status(403)
      .json({message: "Usuário não possui autorização suficiente!"});
}
*/

routes.get("/produtos", (req, res) => {
  res.status(200).json({
    data: produtos,
    mensagem: "Produtos encontrados com sucesso!",
    pagination: {
      page: 1,
      perPage: 10,
    },
  });
});



routes.get("/produto/:id", (req, res) => {
  const produto = produtos.find((produto) => produto.id === req.params.id);
  res.status(200).json({
    data: produto,
    mensagem: "Produto encontrado com sucesso!",
  });
});

routes.get("/produtos/total-estoque", (req, res) => {
  const estoqueProdutos = produtos.map((produto) => {
    return {
      [produto.nome]: produto.quantidade * produto.valorUnit,
    };
  });
  res.status(200).json(estoqueProdutos);
});

routes.post("/produto", (req, res) => {
  produtos.push(req.body);
  res.status(201).json(produtos);
});

routes.delete("/produto/:id", (req, res) => {
  const produtoDeletado = produtos.splice(req.params.id - 1, 1);
  res.status(200).json(produtoDeletado);
});

routes.patch("/produto/:id", (req, res) => {
  const index = req.params.id - 1;
  const produtoAlterado = produtos.splice(index, 1, {
    ...produtos[index],
    ...req.body,
  });
  res.status(200).json(produtoAlterado);
});

export default routes;