export function up(knex) {
    return knex.schema.createTable('Permissions', t => {
        t.increments('ID')
        t.integer('Method_Id').unsigned()
        t.foreign('Method_Id').references('Methods.ID').onDelete('CASCADE').onUpdate('CASCADE')
        t.integer('Module_Id').unsigned()
        t.foreign('Module_Id').references('Modules.ID').onDelete('CASCADE').onUpdate('CASCADE')
    })
}

export function down(knex) {
    return knex.schema.dropTable('Permissions')
}
