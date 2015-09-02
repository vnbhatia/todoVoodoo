(function() {

    'use strict';

    angular.module('app.projectDetail')
        .directive('tmplProjectDetail', directiveFunction)
        .controller('ProjectDetailController', ControllerFunction);


    // ----- directiveFunction -----
    directiveFunction.$inject = [];

    /* @ngInject */
    function directiveFunction() {

        var directive = {
            restrict: 'E',
            templateUrl: 'components/project-detail/project-detail.html',
            scope: {},
            controller: 'ProjectDetailController',
            controllerAs: 'vm'
        };

        return directive;
    }


    // ----- ControllerFunction -----
    ControllerFunction.$inject = ['logger', '$stateParams', 'todoListService'];

    /* @ngInject */
    function ControllerFunction(logger, $stateParams, todoListService) {

        var vm = this;
        activate();

        function activate() {
            var projectName = $stateParams.projectName;

            vm.projectName = projectName;
            vm.addTodo = addTodo;
            vm.todo = {
                'description': '',
                'dueDate': new Date(),
                'isDone': false
            };
            vm.todos = [];
            logger.log('Activated ProjectDetail View');

            // Retrieve the todos of that project and save it to the view model
            todoListService.getProjects().then(function(projects) {
                for (var i = 0; i < projects.length; i++) {
                  if (projects[i].name === vm.projectName) {
                    vm.project = projects[i]; // TODO: get todos index for selected project
                    vm.todos = vm.project.todos;

                    logger.log(JSON.stringify(vm.todos));
                    break;
                  }
                }
                return vm.todos;
            });
        }

        function addTodo(todo) {
            logger.log('Called Add Todo function');
            vm.todos.push({
                'description': todo.description,
                'dueDate': todo.dueDate,
                'isDone': false
            });

            vm.todo = {
                'description': '',
                'dueDate': new Date(),
                'isDone': false
            }; // reset input fields' model
        }
    }

})();
