
export function up(knex) {
    return knex.schema.createTable('Role_Permission', t => {
        t.increments('ID')
        t.integer('Role_Id').unsigned()
        t.foreign('Role_Id').references('Roles.ID').onDelete('CASCADE').onUpdate('CASCADE')
        t.integer('Permission_Id').unsigned()
        t.foreign('Permission_Id').references('Permissions.ID').onDelete('CASCADE').onUpdate('CASCADE')
    })
}

export function down(knex) {
    return knex.schema.dropTable('Role_Permission')
}
