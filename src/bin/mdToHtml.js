var showdown  = require('showdown'),
	fs = require('fs'),
    converter = new showdown.Converter();

// var stat = fs.statSync('../md/session.md');
// console.log(stat);

// var stats = fs.statSync('/md');
var dir = '../md';
var viewsDir = '../md/views/';
var files = fs.readdirSync(dir);

for(var i in files) {
	var fileName = files[i];
	var path = dir + '/' + fileName;
	var stat = fs.statSync(path);
	if(stat.isFile()) {
		var mdContent = fs.readFileSync(path).toString();
		var html = converter.makeHtml(mdContent);
		var wrapper = fs.readFileSync(viewsDir + 'wrapper.html').toString();
		var result = wrapper.replace('{$content}', html).replace('{$title}', fileName);
		console.log(result);
		fs.writeFile(viewsDir + fileName + '.html', result, function(err) {
			if(err) return console.log(err)
		});
	}
}