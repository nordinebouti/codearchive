var fs = require('fs'),
path = require('path'),
deasync = require('deasync'),
colors =  require('colors');

var getSnippetsData =  function(directories){
    for (key in directories){
        try {
            var snippet = Array();
            var directory = directories[key];
            snippet.manifest = require(path.join(directory, 'manifest.json'));
            console.log(snippet.manifest);
        }
    }
}