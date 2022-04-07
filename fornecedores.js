const express = require('express');
const router = express.Router();

const dbKnex = require("./data/db_config");  // dados de conexão com o banco de dados

// middleware para aceitar dados no formato JSON 
router.use(express.json());

// método get é usado para consulta
router.get("/", async (req, res) => {
  try {
    const fornecedores = await dbKnex("fornecedores").orderBy("id", "desc");
    res.status(200).json(fornecedores); // retorna statusCode ok e os dados
  } catch (error) {
    res.status(400).json({ msg: error.message }); // retorna status de erro e msg
  }
});

// Método post é usado para inclusão
router.post("/", async (req, res) => {
  // faz a desestruturação dos dados recebidos no corpo da requisição
  const { nome, contato } = req.body;

  // se algum dos campos não foi passado, irá enviar uma mensagem de erro e retornar
  if (!nome || !contato) {
    res.status(400).json({ msg: "Enviar nome e contato do fornecedor" });
    return;
  }

  // caso ocorra algum erro na inclusão, o programa irá capturar (catch) o erro
  try {
    // insert, faz a inserção na tabela produtos (e retorna o id do registro inserido)
    const novo = await dbKnex("fornecedores").insert({ nome, contato });
    res.status(201).json({ id: novo[0] }); // statusCode indica Create
  } catch (error) {
    res.status(400).json({ msg: error.message }); // retorna status de erro e msg
  }
});

module.exports = router;  
