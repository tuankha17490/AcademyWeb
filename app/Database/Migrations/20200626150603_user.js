export function up(knex) {
    return knex.schema.createTable('Users', t => {
        t.increments('ID').primary()
        t.string('Name')
        t.string('Email')
        t.string('Password').notNull()
        t.string('Avatar').nullable()
        t.bool('Gender').nullable()
        t.integer('Subject_Id').unsigned()
        t.foreign('Subject_Id').references('Subject.ID').onDelete('CASCADE').onUpdate('CASCADE')
        t.string('Slug')
        t.timestamps()
        t.integer('Role_Id').unsigned()
        t.foreign('Role_Id').references('Roles.ID').onDelete('CASCADE').onUpdate('CASCADE')
    })
}

export function down(knex) {
    return knex.schema.dropTable('Users')
}
