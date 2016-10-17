console.log('Converting ...');
(function() {
	var showdown  = require('showdown'),
		fs = require('fs'),
	  converter = new showdown.Converter(),
	  mdDir = 'src/md/',
	  viewsDir = 'src/md/views/';

	var files = fs.readdirSync(mdDir);

	for(var i in files) {
		var fileName = files[i];
		var path = mdDir + fileName;
		var stat = fs.statSync(path);
		if(stat.isFile()) {
			var mdContent = fs.readFileSync(path).toString();
			var html = converter.makeHtml(mdContent);
			var wrapper = fs.readFileSync(viewsDir + 'wrapper.html').toString();
			var newFileName = fileName.replace('.md', '');
			var result = wrapper.replace('{$content}', html).replace('{$title}', newFileName);
			fs.writeFile(viewsDir + newFileName + '.html', result, function(err) {
				if(err) return console.log(err)
			});
		}
	}
})()
console.log('Done!')