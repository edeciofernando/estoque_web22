const express = require('express');
const router = express.Router();

const dbKnex = require("./data/db_config");  // dados de conexão com o banco de dados

// middleware para aceitar dados no formato JSON 
router.use(express.json());

// método get é usado para consulta
router.get("/", async (req, res) => {
  try {
    // para obter os produtos pode-se utilizar .select().orderBy() ou apenas .orderBy()
    const produtos = await dbKnex("produtos").orderBy("id", "desc");
    //    console.log(produtos.toString());
    //    res.send(produtos.toString())
    res.status(200).json(produtos); // retorna statusCode ok e os dados
  } catch (error) {
    res.status(400).json({ msg: error.message }); // retorna status de erro e msg
  }
});

// Método post é usado para inclusão
router.post("/", async (req, res) => {
  // faz a desestruturação dos dados recebidos no corpo da requisição
  const { descricao, marca, quant, preco } = req.body;

  // se algum dos campos não foi passado, irá enviar uma mensagem de erro e retornar
  if (!descricao || !marca || !quant || !preco) {
    res.status(400).json({ msg: "Enviar descricao, marca, quant e preco do produto" });
    return;
  }

  // caso ocorra algum erro na inclusão, o programa irá capturar (catch) o erro
  try {
    // insert, faz a inserção na tabela produtos (e retorna o id do registro inserido)
    const novo = await dbKnex("produtos").insert({ descricao, marca, quant, preco });
    res.status(201).json({ id: novo[0] }); // statusCode indica Create
  } catch (error) {
    res.status(400).json({ msg: error.message }); // retorna status de erro e msg
  }
});

// Método put é usado para alteração. id indica o registro a ser alterado
router.put("/:id", async (req, res) => {
  const id = req.params.id; // ou const { id } = req.params
  const { descricao, marca, quant, preco } = req.body; // campo a ser alterado
  try {
    // altera o campo preco, no registro cujo id coincidir com o parâmetro passado
    await dbKnex("produtos").update({ descricao, marca, quant, preco }).where("id", id); // ou .where({ id })
    res.status(200).json(); // statusCode indica Ok
  } catch (error) {
    res.status(400).json({ msg: error.message }); // retorna status de erro e msg
  }
});

// Método delete é usado para exclusão
router.delete("/:id", async (req, res) => {
  const { id } = req.params; // id do registro a ser excluído
  try {
    await dbKnex("produtos").del().where({ id });
    res.status(200).json(); // statusCode indica Ok
  } catch (error) {
    res.status(400).json({ msg: error.message }); // retorna status de erro e msg
  }
});

// Quantidade de produtos por marca
router.get("/marcas", async (req, res) => {
  try {
    const numProdMarcas = await dbKnex("produtos").select("marca").count({ num: "id" }).groupBy("marca");
    res.status(200).json(numProdMarcas);
  } catch (error) {
    res.status(400).json({ msg: error.message }); // retorna status de erro e msg
  }
});

// método get é usado para consulta
router.get("/pesq-campos/:palavra", async (req, res) => {
  const { palavra } = req.params;
  try {
    const produtos = await dbKnex("produtos").select("descricao", "marca", "preco")
      .where("descricao", "like", `%${palavra}%`)
      .orWhere("marca", "like", `%${palavra}%`)
    res.status(200).json(produtos); // retorna statusCode ok e os dados
  } catch (error) {
    res.status(400).json({ msg: error.message }); // retorna status de erro e msg
  }
});

router.put("/altera-marca/:marca/:taxa", async (req, res) => {
  const { marca, taxa } = req.params;   // ou const { id } = req.params
  try {
//    const altera = dbKnex.raw(`update produtos set preco = preco + (preco * ${taxa} / 100) where marca='${marca}'`)
//    const altera = dbKnex("produtos").update({preco: dbKnex.raw(`preco + (preco * ${taxa/100})`)}).where({ marca }); // ou .where({ id })
//    console.log(altera.toString())
    await dbKnex("produtos").update({preco: dbKnex.raw(`preco + (preco * ${taxa/100})`)}).where({ marca }); // ou .where({ id })
    res.status(200).json(); // statusCode indica Ok
  } catch (error) {
    res.status(400).json({ msg: error.message }); // retorna status de erro e msg
  }
});

// Retorna os registros na ordem indicada
router.get("/ordem/:campo", async (req, res) => {
  const campo = req.params.campo;
  try {
    const produtos = await dbKnex("produtos").orderBy(campo);
    res.status(200).json(produtos);
  } catch (error) {
    res.status(400).json({ msg: error.message }); // retorna status de erro e msg
  }
});

module.exports = router;  
