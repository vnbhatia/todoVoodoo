module.exports = function(app) {
    var api = '/api';
    var data = '/../../data/';
    var jsonfileservice = require('./utils/jsonfileservice')();

    app.post(api + '/projects', createProject);
    app.put(api + '/projects/:projectName', updateProject);
    app.get(api + '/projects/:projectName', getProject);
    app.get(api + '/projects', getProjects);
    app.delete(api + '/projects/:projectName', deleteProject)

    function createProject(req, res) {
        var projectData = req.body;

        todoListService.createTransaction(projectData)
          .then(function(transaction) {
              // Construct the full transaction before returning (with account and category)
              return transactionService.getTransaction(transaction.id);
          })
          .then(function(transaction) {
              res.send(transaction);
          })
          .catch(function(error) {
              log.error(error);
              res.status(500).send({'message': error.toString()});
          });
    }

    function updateProject(req, res) {
    }

    function getProject(req, res) {
    }

    function getProjects(req, res) {
        var json = jsonfileservice.getJsonFromFile(data + 'projects.json');
        res.send(json);
    }

    function deleteProject(req, res) {
    }
};
