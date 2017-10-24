var fs = require('fs'),
path = require('path'),
deasync = require('deasync'),
colors =  require('colors');

var getSnippetsData = function(directories){
    console.log("Getting snippets data...".blue)
    var datas = Array();
    for (key in directories){
        try {
            var directory = directories[key];
            var data = JSON.parse(fs.readFileSync(path.join(directory, 'manifest.json')));
            var readme = fs.readFileSync(path.join(directory, 'README.md'));
            data.path = directory;
            datas.push(data);
        }catch(err){
            console.log(err);
            console.log("Impossible to get datas from manifest.json or README.md in " + directory);
        }
    }
    return (datas);
}

var saveSnippetsData = function(datas){
    
}

module.exports.getSnippetsData = getSnippetsData;