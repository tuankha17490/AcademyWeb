import faker from 'faker'

const createUsers = () => ({
  Email: faker.internet.email(),
  Name: faker.name.findName(),
  Password: faker.internet.password(),
  Avatar: faker.internet.avatar(),
  Slug: faker.lorem.slug(),
  Gender: faker.random.boolean(),
  Role_Id: 3
})
const createAdmin = {
  Email: 'admin@gmail.com',
  Name: 'admin',
  Password: 'admin123',
  Avatar: faker.internet.avatar(),
  Slug: 'admin123',
  Gender: true,
  Role_Id: 1
}
exports.seed = async function (knex) {
  const fakeUsers = [];
  fakeUsers.push(createAdmin)
  const fakeUserAmount = 30
  for (let i = 0; i < fakeUserAmount; i++) {
    fakeUsers.push(createUsers())
  }
  await knex('Users').del()
  // Deletes ALL existing entries
  await knex('Users').insert(fakeUsers)
};