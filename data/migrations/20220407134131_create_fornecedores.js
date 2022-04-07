exports.up = function (knex) {
    return knex.schema.createTable("fornecedores", (table) => {
        table.increments();
        table.string("nome", 60).notNullable();
        table.string("contato", 40).notNullable();
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable("fornecedores");
};
