const faker = require('faker');
var array = []
for(var i = 1; i <= 20 ; i++) {
  const item = {
    name: faker.lorem.sentence(),
    text: faker.lorem.paragraphs(10),
    shortText: faker.lorem.paragraphs(3),
    favicon: '/img/slider/slide-1.jpg',
    title: faker.lorem.sentence(),
    description: faker.lorem.sentence()
  }
  array.push(item)
}
module.exports = function(database) {
  array.map(function(item) {
    database.news.create(item)
  })
}