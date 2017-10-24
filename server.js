var nodegit = require('nodegit'),
path = require('path'),
fs = require('fs'),
repository = require('./controllers/repository'),
snippets = require('./controllers/snippets'),
database = require('./controllers/database');

var localPath = "codeArchive";

repository.repoInit(localPath);
var directories = repository.getDirectories(localPath);
var datas = snippets.getSnippetsData(directories);
database.saveSnippets(datas);
