const seedArr = [
  {
    name: 'Bmb-design',
    date_end: '2018-10-23'
  },
  {
    name: 'Vip-Class',
    date_end: '2018-10-20'
  }
]

if(process.env.NODE_ENV == 'dev') {
  const faker = require('faker');
  faker.locale = 'ru'
  for(var i = 1; i <= 1; i++) {
    const date = new Date()
    const randomDate = faker.date.future(2018)
    const item = {
      name: faker.internet.domainName(),
      date_end: randomDate
    }
    seedArr.push(item)
  }
}

module.exports = function(database) {
  database.project.findAll().then(function(projects) {
    if(!projects.lenght) {
      seedArr.map(function(item) {
        database.project.create(item).then(function() {
          console.log('Проект добавлен')
        }
      )})
    }
  })
}