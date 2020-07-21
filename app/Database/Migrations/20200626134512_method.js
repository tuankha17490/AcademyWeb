
export function up(knex) {
    return knex.schema.createTable('Methods', t => {
        t.increments('ID').primary()
        t.string('Name')
    })
}

export function down(knex) {
    return knex.schema.dropTable('Methods')
}
