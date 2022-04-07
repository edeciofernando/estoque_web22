exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('produtos').del()
  await knex('produtos').insert([
    {descricao: "Nescafé", marca: "Nestlé", quant: 15, preco: 12.90, fornecedor_id: 3},
    {descricao: "Iogurte de Morango", marca: "Batavo", quant: 8, preco: 4.95, fornecedor_id: 1},
    {descricao: "Caixa de Bombom", marca: "Nestlé", quant: 20, preco: 8.99, fornecedor_id: 3},
    {descricao: "Batata Frita 76gr", marca: "Elma Chips", quant: 25, preco: 6.90, fornecedor_id: 4}
  ]);
};
