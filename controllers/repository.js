var nodegit = require('nodegit'),
fs = require('fs'),
path = require('path'),
deasync = require('deasync'),
colors =  require('colors');

var openOptions = {
    callbacks: {
      credentials: function() {
          return nodegit.Cred.sshKeyNew(
              'nbouti',
              'id_rsa.pub',
              'id_rsa',
              "opencesam");
          }
    }
  };

var cloneOptions = {
    fetchOpts: {
      callbacks: {
        credentials: function() {
          return nodegit.Cred.sshKeyNew(
            'nbouti',
            'id_rsa.pub',
            'id_rsa',
            "opencesam");
        }
      }
    }
  };

var repoInit = function (localPath){
            var url = "nbouti@bitbucket.org:itelios/itelios-codearchive.git",
            done = false;
            
            nodegit.Repository.open(localPath)
            .then(function(repo) {
                repository = repo;
                return repository.fetchAll(openOptions, true);
            })
            .then(function() {
                console.log('Trying to get last modifications on master');
                return (repository.mergeBranches("master", "origin/master"));
              })
            .then(function(){
                console.log("Repository updated and openable !".green)
                done = true;
            })
            .catch(function(err){
                console.log('Repository not openable !'.red);
                console.log(err);
                nodegit.Clone.clone(url, localPath, cloneOptions)
                .then(function (repo) {
                    console.log(colors.yellow(path.basename(url) + "cloned to " + repo.workdir()));
                    })
                .catch(function (err) {
                console.log('Error during Git Clone !'.red);
                console.log(err);
                })
                .done(function(){
                    done = true;
                });
            });
            deasync.loopWhile(function(){
                return (!done);
            });
            console.log("Repository initialisation over...".yellow);
        };

var getContents = function (localPath){
    var contents = Array();
    try {
        var reads = fs.readdirSync(localPath);
        for( var key in reads){
            if (reads[key] != ".git"){
            contents.push(path.join(localPath, reads[key]));
            //contents.push(localPath + '/' + reads[key]);
            }
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
        if(fs.statSync(contents[key]).isDirectory() && contents[key] != ".git"){
            directories.push(contents[key]);
            
        }
    }
    return (directories);
}

module.exports.repoInit = repoInit;
module.exports.getContents = getContents;
module.exports.getDirectories = getDirectories;