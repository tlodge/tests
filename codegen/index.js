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
					acc = [acc, _descriptionforobject(obj[key]), _codeforschema(`${prefix}_${key}`, obj[key].properties), _subschema(`${prefix}_${key}`, obj[key].properties)].join("");
					
		}
		return acc;	
	},"");
	}
	return "";
}

function _descriptionforobject({description}){
	return `\/\/${description}\n`;
}

function _tabsfordepth(depth){
	return [...Array(depth).keys()].reduce((acc,item)=>{
		return acc + "  ";
	},"");
}

function _enumerate_properties(obj, depth){
	return `${_tabsfordepth(depth)}{
				${Object.keys(obj).reduce((acc, key, idx)=>{
					const item = obj[key];
					switch (item.type){
						case "object":
							acc = `${acc}\n${_templateobject(item,depth+1)}`;
							break;
						default:
							acc = `${acc}\n${_tabsfordepth(depth+1)}${key}:[a ${item.type}],`;
					}
					return acc;
				},"")}\n${_tabsfordepth(depth)}}`.replace("\n", "");	
}

function _map_properties(arr, depth){
	return `${arr.map((item)=>{
		return `\n${_tabsfordepth(depth)}\/\/${item.description||""}\n${_templateobject(item, depth)}\n`;
	}).join("\n")}`;
}

function _templateobject(obj,depth){
	if (obj.properties){
		return _enumerate_properties(obj.properties, depth)
	}
	if (obj.oneOf){
		return _map_properties(obj.oneOf, depth);
	}
}

function _codeForInput(data){
	switch (data.type){
		case "object":
	 		return `${_templateobject(data,0)}`
		
	}
}

function _createskeleton(data){
	
	const inputs =  Object.keys(data.output).reduce((lines, key)=>{
		
		switch (data.output[key].type){
			case "object":
				lines.push(_descriptionforobject(data.output[key]));
				lines.push(_codeforschema("msg", data.output[key].properties));
				lines.push(_subschema(key, data.output[key].properties));
				break;
				
			default:
				lines.push(`const ${key}=msg.${key}`); 
		}	
		return lines;
	},[]).join("");	
	
	
	
	const outputs = _codeForInput(data.input);
	
	return `${inputs}${outputs}`;
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

