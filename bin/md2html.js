(function() {
	var showdown  = require('showdown'),
		fs = require('fs'),
	  converter = new showdown.Converter(),
	  mdDir = 'src/mds',
	  viewDir = 'src/views';
	function md2Html(dir) {
		var files = fs.readdirSync(dir);
		for(var i in files) {
			var fileName = files[i];
			var path = dir + '/' + fileName;
			var stat = fs.statSync(path);
			if(stat.isFile()) {
				var folderName = dir.split('/').pop();
				var mdContent = fs.readFileSync(path).toString();
				var html = converter.makeHtml(mdContent);
				var wrapper = fs.readFileSync(viewDir + '/' + 'wrapper.html').toString();
				var newFileName = fileName.replace('.md', '');
				var result = wrapper.replace('{$content}', html).replace('{$title}', newFileName);
				fs.writeFile(viewDir + '/' + folderName + '/' + newFileName + '.html', result, function(err) {
					if(err) return console.log(err)
				});
			} else {
				md2Html(path);
			}
		}
	}  
	md2Html(mdDir);
})();
console.log('Converting Done ...');