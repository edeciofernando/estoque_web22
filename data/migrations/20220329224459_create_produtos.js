exports.up = function (knex) {
    return knex.schema.createTable("produtos", (table) => {
        table.increments();
        table.string("descricao", 80).notNullable();
        table.string("marca", 40).notNullable();
        table.integer("quant", 4).notNullable();
        table.decimal("preco", 9.2).notNullable();
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable("produtos");
};
