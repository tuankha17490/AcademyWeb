export function up(knex) {
    return knex.schema.createTable('Subject', t => {
        t.increments('ID').primary()
        t.string('Name')
        t.timestamps()
    })
}

export function down(knex) {
    return knex.schema.dropTable('Subject')
}
