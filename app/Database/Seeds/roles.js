
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('Roles').del()
    .then(function () {
      // Inserts seed entries
      return knex('Roles').insert([
        {ID: 1, Name: 'Admin'},
        {ID: 2, Name: 'Moderator'},
        {ID: 3, Name: 'Client'},
      ]);
    });
};
