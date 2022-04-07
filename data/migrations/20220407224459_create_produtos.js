exports.up = function (knex) {
    return knex.schema.createTable("produtos", (table) => {
        table.increments();
        table.string("descricao", 80).notNullable();
        table.string("marca", 40).notNullable();
        table.integer("quant", 4).notNullable();
        table.decimal("preco", 9.2).notNullable();
        table.integer("fornecedor_id").notNullable().unsigned();
        table.foreign("fornecedor_id").references("fornecedores.id")
            .onDelete("restrict").onUpdate("cascade");
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable("produtos");
};
