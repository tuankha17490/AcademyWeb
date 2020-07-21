
export function up(knex) {
    return knex.schema.createTable('Roles',t => {
        t.increments('ID').primary()
        t.string('Name')
    })
}

export function down(knex) {
  return knex.schema.dropTable('Roles');
}
