const faker = require('faker');
faker.locale = 'ru';
const sectionArr = [
	{
		name: 'Сайты',
		alias: 'web'
	},
	{
		name: 'Логотипы',
		alias: 'logo',
	},
	{
		name: 'Реклама',
		alias: 'reklama',
	},
	{
		name: 'Тех. поддержка',
		alias: 'technical-support',
	}
]
module.exports = function(database) {
	database.usluga.findAll()
		.then((sections) => {
			if(!sections.length) {
				sectionArr.map(function(item) {
					database.usluga.create(item)
						.then(function(usluga) {
							const works = getProjects()
							works.map(function(item) {
								database.works.create(item).then(function(work) {
									work.setUsluga(usluga)
								})
							})
						})
				})
			}
		})
}

function getProjects() {
	var seedArr = [];
	for(var i = 1; i <= 10; i++) {
		const item = {
			title: faker.lorem.words(),
		}
		seedArr.push(item)
	}
	return seedArr
}