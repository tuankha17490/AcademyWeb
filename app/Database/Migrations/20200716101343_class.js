export function up(knex) {
    return knex.schema.createTable('Class', t => {
        t.increments('ID')
        t.string('Name')
        t.string('Detail')
        t.integer('Subject_Id').unsigned()
        t.foreign('Subject_Id').references('Subject.ID').onDelete('CASCADE').onUpdate('CASCADE')
        t.timestamps()
    })
}

export function down(knex) {
    return knex.schema.dropTable('Class')
}
