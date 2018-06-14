const faker = require('faker');
const seedArray = [
  {
    first_name: 'Александр',
    last_name: 'Свешников',
    email: 'info@bmb-design.ru',
    password: '1234',
    text: faker.lorem.paragraphs(10),
    shortText: faker.lorem.paragraphs(3),
    avatar: '/img/slider/slide-1.jpg',
    position: 'Насяльника'
  },
  {
    first_name: 'Степа',
    last_name: 'Кузовов',
    email: 'xolms@bmb-design.ru',
    password: '657216as',
    text: faker.lorem.paragraphs(10),
    shortText: faker.lorem.paragraphs(3),
    avatar: '/img/slider/slide-1.jpg',
    position: 'Разработчик'
  },
]
module.exports = function(database) {
  database.user.findAll().then(function(users) {
    if(!users.length) {
      seedArray.map(function(item) {
        database.user.create({
          first_name: item.first_name,
          last_name: item.last_name,
          email: item.email,
          password: item.password,
        }).then(function(items) {
          items.addRoles([1]).then(function (roles) {
          })
          database.userInfo.create({
            position: item.position,
            text: item.text,
            shortText: item.shortText,
            userId: items.id,
            avatar: item.avatar
          })
          console.log('Пользователь успешно создан')
        }).catch(function(err) {
          console.log(err)
        })
      })
    }
  })
}