var showdown  = require('showdown'),
	fs = require('fs'),
    converter = new showdown.Converter();

// var stat = fs.statSync('../md/session.md');
// console.log(stat);

// var stats = fs.statSync('/md');
var dir = '../md';
var files = fs.readdirSync(dir);

for(var i in files) {
	var fileName = files[i];
	var path = dir + '/' + fileName;
	var stat = fs.statSync(path);
	if(stat.isFile()) {
		var content = fs.readFileSync(path).toString();
		var html = converter.makeHtml(content);
		fs.writeFile('../md/views/' + fileName + '.html', html, function(err) {
			if(err) return console.log(err)
		});
		// console.log(html);
	}
}