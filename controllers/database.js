var configuration = require('./configuration'),
colors = require('colors');
/*var extend = require('extend');
var _ = require('lodash');
const uuidv4 = require('uuid/v4');
*/
var saveSnippets =  function(datas){

    datas.forEach(function(data) {
        configuration.elastic.getClient().index({
            index: 'itelios',
            type: 'snippet',
            id: data.name,
            body: data,
            refresh: true,
        }, function (error, response) {
            if (error){
                console.log(colors.red("Impossible to save the snippet ID : " + data.name));
                console.log(error);
            }else if(response){
                console.log(colors.green("Saved Snippet ID : " + data.name));
                //console.log(response);
            }
        });
    });
    
}

module.exports.saveSnippets = saveSnippets;