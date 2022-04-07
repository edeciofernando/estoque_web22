exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('fornecedores').del()
  await knex('fornecedores').insert([
    {nome: "Distibuidora de Alimentos Sul RS", contato: "3225.0011 - José"},
    {nome: "Bebidas Pelotas Distribuidora", contato: "3227.2040 - Ricardo"},
    {nome: "Distibuidora Nestlé Zona Sul", contato: "3288.0034 - Marcela"},
    {nome: "Hortifruti Satolep", contato: "3272.2345 - Juçara"},
  ]);
};
