module.exports = {
	//Получение последних 4-х работ в разделе
	getFourWorks: function(works) {
		var worksArray = []
		works.map(function(item, index) {
			if(index <= 3) {
				var itemArr = {
					id: item.id,
					name: item.name,
					alias: item.alias,
					thumbnail: item.thumbnail,
					types: item.types
				}
				worksArray.push(itemArr)
			}
		})
		return worksArray
	}
}