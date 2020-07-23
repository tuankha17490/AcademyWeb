
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('Subject').del()
    .then(function () {
      // Inserts seed entries
      return knex('Subject').insert([
        {id: 1, Name: 'Mathematics'},
        {id: 2, Name: 'Physics'},
        {id: 3, Name: 'Chemistry'},
        {id: 4, Name: 'Literature'},
        {id: 5, Name: 'English'},
        {id: 6, Name: 'Biology'}
      ]);
    });
};
