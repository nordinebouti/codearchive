var nodegit = require('nodegit'),
fs = require('fs'),
path = require('path'),
deasync = require('deasync'),
colors =  require('colors');


var repoInit = function (localPath){
            var url = "https://github.com/pazdera/scriptster.git",
            options = {},
            done = false;
            
            nodegit.Repository.open(localPath)
            .then(function(repo) {
                return (repo.mergeBranches("master", "origin/master"));
              })
            .then(function(){
                console.log("Repository openable !".green)
                done = true;
            })
            .catch(function(err){
                console.log('Repository not openable !'.red);
                console.log(err);
                nodegit.Clone.clone(url, localPath, options)
                .then(function (repo) {
                    console.log(colors.yellow(path.basename(url) + "cloned to " + repo.workdir()));
                    })
                .catch(function (err) {
                console.log('Error during NodeGit Clone !'.red);
                console.log(err);
                })
                .done(function(){
                    done = true;
                });
            });
            deasync.loopWhile(function(){
                return (!done);
            });
            console.log("Repository initial verification complete !".green);
        };

var getContents = function (localPath){
    var contents = Array();
    try {
        var reads = fs.readdirSync(localPath);
        for( var key in reads){
            contents.push(path.join(localPath, reads[key]));
            //contents.push(localPath + '/' + reads[key]);
        }
    }catch(err){
        console.log('Error cannot get content of your repo ! '.red);
        console.log(err);
    }
    return (contents);
    };

var getDirectories = function(localPath){
    var contents = getContents(localPath);
    var directories = Array();
    for (var key in contents){
        if(fs.statSync(contents[key]).isDirectory()){
            directories.push(contents[key]);
        }
    }
    return (directories);
}

module.exports.repoInit = repoInit;
module.exports.getContents = getContents;
module.exports.getDirectories = getDirectories;