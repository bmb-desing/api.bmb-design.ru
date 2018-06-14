const faker = require('faker');
faker.locale = 'ru'
const array = []
for(var i = 1; i <= 30; i++) {
  const item = {
    text: faker.lorem.paragraphs(5),
    status: faker.random.boolean(),
    image: faker.random.boolean() ? '/img/slider/slide-1.jpg' : null,
    email: faker.internet.email(),
    video: faker.random.boolean() ? faker.internet.url() : null,
    document: faker.random.boolean() ? '/img/slider/slide-1.jpg' : null,
    name: faker.name.findName()
  }
  array.push(item)
}
module.exports = function(database) {
  array.map(function(item) {
    database.review.create(item)
  })
}