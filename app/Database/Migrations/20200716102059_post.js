export function up(knex) {
    return knex.schema.createTable('Post', t => {
        t.increments('ID')
        t.string('Title')
        t.string('Content')
        t.integer('User_Id').unsigned()
        t.foreign('User_Id').references('Users.ID').onDelete('CASCADE').onUpdate('CASCADE')
        t.integer('Class_Id').unsigned()
        t.foreign('Class_Id').references('Class.ID').onDelete('CASCADE').onUpdate('CASCADE')
        t.timestamps()
    })
}

export function down(knex) {
    return knex.schema.dropTable('Post')
}
