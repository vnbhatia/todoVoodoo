module.exports = function(app) {
    var api = '/api';
    var data = '/../../data/';
    var jsonfileservice = require('./utils/jsonfileservice')();

    app.get(api + '/projects', getTodoLists);

    function getTodoLists(req, res, next) {
        var json = jsonfileservice.getJsonFromFile(data + 'todo-lists.json');
        res.send(json);
    }
};
