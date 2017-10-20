var nodegit = require('nodegit'),
path = require('path'),
fs = require('fs'),
repository = require('./controllers/repository'),
snippets = require('./controllers/snippets');

var localPath = "codeArchive";

repository.repoInit(localPath);
var directories = repository.getDirectories(localPath);
var data = snippets.getSnippetsData(directories);
