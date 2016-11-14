var fs = require('fs');
var path =require('path');

if (process.argv.length < 3) {
    console.log("node codegen  <schemadirectory>");
    process.exit(1);
}

var dir = process.argv[2];

console.log("reading dir " + dir);

function _codeforschema(prefix, schema){
	return `const {${Object.keys(schema).map(item=>`${item}:${prefix}_${item}`).join(",")}} = ${prefix};\n`;	
}

function _subschema(prefix, obj){
	if (obj){
	
		return Object.keys(obj).reduce((acc, key)=>{
			switch (obj[key].type){
				case "object":
					acc = [acc, _descriptionforobject(obj[key]), _codeforschema(`${prefix}_${key}`, obj[key].schema), _subschema(`${prefix}_${key}`, obj[key].schema)].join("");
					
		}
		return acc;	
	},"");
	}
	return "";
}

function _descriptionforobject({description}){
	return `\/\/${description}\n`;
}

function _createskeleton(data){
	
	return Object.keys(data.output).reduce((lines, key)=>{
		
		switch (data.output[key].type){
			case "object":
				lines.push(_descriptionforobject(data.output[key]));
				lines.push(_codeforschema("msg", data.output[key].schema));
				lines.push(_subschema(key, data.output[key].schema));
				break;
				
			default:
				lines.push(`const ${key}=msg.${key}`); 
		}
		return lines;
	},[]).join("");	
};

fs.readdir(dir, function(err, items) {
        items.filter(function(item){
           return item.indexOf("json") != -1
        }).forEach(function(name){

            fs.readFile(dir+"/"+name, 'utf8', function (err,data) {
                var schema = JSON.parse(data);
                console.log(_createskeleton(schema));
            });
        });
});

