(function() {
	
	var showdown  = require('showdown'),
		fs = require('fs'),
	  converter = new showdown.Converter(),
	  mdDir = 'src/mds',
	  viewDir = 'src/views',
	  mdStructure = {};
	function md2Html(dir) {
		var files = fs.readdirSync(dir);
		for(var i in files) {
			var fileName = files[i];
			var path = dir + '/' + fileName;
			var stat = fs.statSync(path);
			if(stat.isFile()) {
				var type = dir.split('/').pop();
				var mdContent = fs.readFileSync(path).toString();
				var html = converter.makeHtml(mdContent);
				var wrapper = fs.readFileSync(viewDir + '/' + 'wrapper.html').toString();
				var newFileName = fileName.replace('.md', '');
				var result = wrapper.replace('{$content}', html).replace('{$title}', newFileName);
				var viewPath = viewDir + '/' + type + '/' + newFileName + '.html';
				fs.writeFile(viewPath, result, function(err) {
					if(err) return console.log(err)
				});
				mdStructure[type] = mdStructure[type] || [];
				mdStructure[type].push({
					title: fileName,
					src: viewPath
				});					
			} else {
				md2Html(path);
			}
		}
	}

	function toJson(mdStructure) {
		var json = JSON.stringify(mdStructure);
		console.log(json);
		fs.writeFile('md.json', json, function(err) {
			if(err) return console.log(err)
		});
	}

	md2Html(mdDir);

	toJson(mdStructure);

})();
console.log('Converting Done ...');