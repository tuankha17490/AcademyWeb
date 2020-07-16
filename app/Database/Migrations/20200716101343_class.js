export function up(knex) {
    return knex.schema.createTable('Class', t => {
        t.increments('ID')
        t.string('Name')
        t.string('Detail')
        t.integer('Subject_Id').unsigned()
        t.foreign('Subject_Id').references('Subject.ID').onDelete('CASCADE').onUpdate('CASCADE')
        t.timestamp('Updated_At').defaultTo(knex.fn.now());
        t.timestamp('Created_At').defaultTo(knex.fn.now());
    })
}

export function down(knex) {
    return knex.schema.dropTable('Class')
}
