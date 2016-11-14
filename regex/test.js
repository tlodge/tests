fs = require('fs')

var Find = {

	getPackages: function(packagestr){
		//var re = /require/g;
		var REQUIRE_RE = /require\(['"]([^'"]+)['"](?:, ['"]([^'"]+)['"])?\);?/g;
		var IMPORT_RE  = /\bimport\s+(?:.+\s+from\s+)?[\'"]([^"\']+)["\']/g;

		var requires = packagestr.match(REQUIRE_RE);
		
		var result1 = requires.map((package)=>{
			return package.replace(/require\w*\(\w*['"]/g, "").replace(/['"]\);*/g,"")
		});

		console.log(result1);

		var imports = packagestr.match(IMPORT_RE);

		var result2 = imports.map((module)=>{
			return module.replace(/import\s*/g,"").replace(/\s*(\w|\W|\s)*from\s*/g,"").replace(/['"]/g, "");
		});

		console.log(result2);

	},

}

module.exports = Find;


if (process.argv.length < 3) {
	console.log("node test <filename>");
	process.exit(1);
}

fs.readFile(process.argv[2], 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  Find.getPackages(data);
});




