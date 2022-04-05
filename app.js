const express = require('express')
const app = express()
const port = 3000

const produtos = require("./produtos")

app.get('/', (req, res) => {
  res.send('Programação Web. Controle de Estoque')
})

app.get('/aula4', (req, res) => {
    let mensagem = "<h2>Aula de Programação Web</h2>"
    mensagem += "<h3>Exemplo de Cadastro de Produtos</h3>"
    mensagem += "<h3>As rotas estão em /produtos</h3>"
    res.send(mensagem)
})

app.use('/produtos', produtos);  // identificação da rota e da const (require) associada

app.listen(port, () => {
  console.log(`Servidor em execução na porta: ${port}`)
})
