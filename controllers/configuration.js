var elasticsearch = require('elasticsearch');

var configuration = {};
configuration.elastic = {};

configuration.elastic.secure = process.env.ES_SECURE || false;
configuration.elastic.host = process.env.ES_HOST || '127.0.0.1';
configuration.elastic.port = process.env.ES_PORT || '9200';
configuration.elastic.username  = process.env.ES_USERNAME;
configuration.elastic.password = process.env.ES_PASSWORD;

/*
configuration.elastic.secure = true;
configuration.elastic.host = '6722f1262047010f38f334d34481a12f.eu-west-1.aws.found.io';
configuration.elastic.port = '9243';
configuration.elastic.username  = 'directory';
configuration.elastic.password = 'pj2ug2c3';
*/

configuration.elastic.getClient = function() {
    var options = {};
    options.host = this.secure ? `https://${this.host}:${this.port}` : `http://${this.host}:${this.port}`;
    if (this.username) options.httpAuth = `${this.username}:${this.password}`;

    return new elasticsearch.Client(options);
};

module.exports = configuration;