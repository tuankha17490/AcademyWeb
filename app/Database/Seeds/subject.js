
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('Subject').del()
    .then(function () {
      // Inserts seed entries
      return knex('Subject').insert([
        {id: 1, Name: 'Mathematics', TeacherAmount: 0, ClassAmount: 0},
        {id: 2, Name: 'Physics', TeacherAmount: 0, ClassAmount: 0},
        {id: 3, Name: 'Chemistry', TeacherAmount: 0, ClassAmount: 0},
        {id: 4, Name: 'Literature', TeacherAmount: 0, ClassAmount: 0},
        {id: 5, Name: 'English', TeacherAmount: 0, ClassAmount: 0},
        {id: 6, Name: 'Biology', TeacherAmount: 0, ClassAmount: 0}
      ]);
    });
};
