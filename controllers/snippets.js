var fs = require('fs'),
path = require('path'),
deasync = require('deasync'),
colors =  require('colors');

var getSnippetsData =  function(directories){
    for (key in directories){
        try {
            var snippet = Array();
            var directory = directories[key];
            console.log(path.join(directory, 'manifest.json'));
            snippet.manifest = JSON.parse(fs.readFileSync(path.join(directory, 'manifest.json')));
            console.log(snippet.manifest);
        }catch(err){
            //console.log(err);
            console.log("Manifest.json not present in " + directory);
        }
    }
}

module.exports.getSnippetsData = getSnippetsData;