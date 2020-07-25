export function up(knex) {
    return knex.schema.createTable('Subject', t => {
        t.increments('ID').primary()
        t.string('Name'),
        t.integer('TeacherAmount')
        t.integer('ClassAmount')
    })
}

export function down(knex) {
    return knex.schema.dropTable('Subject')
}
