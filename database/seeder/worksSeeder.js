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
								database.works.create({
									title: item.title,
									description: item.description,
									name: item.name,
									thumbnail: item.thumbnail,
									text: item.text,
									types: item.types
								}).then(function(work) {
									work.setUser([1, 2])
									work.setUsluga(usluga).then(function() {
										item.images.map(function(image) {
											database.worksImages.create({
												image: image.image,
												alt: image.alt,
												workId: work.id
											})
										})
									});
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
		var images = [];
		for(var k = 1; k <= 10; k++) {
			var items = {
				image: '/img/slider/slide-1.jpg',
				alt: faker.lorem.sentence()
			}
			images.push(items)
		}
		const item = {
			title: faker.lorem.words(),
			description: faker.lorem.sentence(),
			name: faker.lorem.words(),
			thumbnail: '/img/slider/slide-1.jpg',
			text: faker.lorem.paragraphs(10),
			types: faker.lorem.words(),
			images: images
		}
		seedArr.push(item)
	}
	return seedArr
}