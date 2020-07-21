import faker from 'faker'
import bcript from "bcrypt"

const createUsers = () => ({
  Email: faker.internet.email(),
  Name: faker.name.findName(),
  Password: faker.internet.password(),
  Avatar: faker.internet.avatar(),
  Slug: faker.lorem.slug(),
  Gender: faker.random.boolean(),
  Role_Id: 4,
})

const createAdmin = {
  Email: 'admin@gmail.com',
  Name: 'admin',
  Password: bcript.hashSync('admin123',10),
  Avatar: faker.internet.avatar(),
  Slug: 'admin123',
  Gender: true,
  Role_Id: 1
}

const createTeacher = {
  Email: 'teacher@gmail.com',
  Name: 'teacher',
  Password: bcript.hashSync('teacher123',10),
  Avatar: faker.internet.avatar(),
  Slug: 'teacher',
  Gender: true,
  Role_Id: 3
}
const createModerator = {
  Email: 'moderator@gmail.com',
  Name: 'moderator',
  Password: bcript.hashSync('moderator123',10),
  Avatar: faker.internet.avatar(),
  Slug: 'moderator',
  Gender: true,
  Role_Id: 2
}
const createStudent = {
  Email: 'student@gmail.com',
  Name: 'student',
  Password: bcript.hashSync('student123',10),
  Avatar: faker.internet.avatar(),
  Slug: 'student',
  Gender: true,
  Role_Id: 4
}
exports.seed = async function (knex) {
  const fakeUsers = [];
  fakeUsers.push(createAdmin)
  fakeUsers.push(createModerator)
  fakeUsers.push(createTeacher)
  fakeUsers.push(createStudent)
  const fakeUserAmount = 30
  for (let i = 0; i < fakeUserAmount; i++) {
    fakeUsers.push(createUsers())
  }
  await knex('Users').del()
  // Deletes ALL existing entries
  await knex('Users').insert(fakeUsers)
};