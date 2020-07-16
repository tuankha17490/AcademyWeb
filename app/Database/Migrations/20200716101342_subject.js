export function up(knex) {
    return knex.schema.createTable('Subject', t => {
        t.increments('ID')
        t.string('Name')
        t.timestamp('Updated_At').defaultTo(knex.fn.now());
        t.timestamp('Created_At').defaultTo(knex.fn.now());
    })
}

export function down(knex) {
    return knex.schema.dropTable('Subject')
}
