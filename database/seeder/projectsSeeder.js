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