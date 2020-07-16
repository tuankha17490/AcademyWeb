import faker from 'faker'

const createUsers = () => ({
  Email: faker.internet.email(),
  Name: faker.name.findName(),
  Password: faker.internet.password(),
  Avatar: faker.internet.avatar(),
  Slug: faker.lorem.slug()
})
exports.seed = async function (knex) {
  const fakeUsers = [];
  const fakeUserAmount = 500
  for (let i = 0; i < fakeUserAmount; i++) {
    fakeUsers.push(createUsers())
  }
  // Deletes ALL existing entries
  await knex('Users').insert(fakeUsers)
};