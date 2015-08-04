(function () {

    'use strict';

    angular.module('app.todoList')
        .directive('tmplTodoList', directiveFunction)
        .controller('TodoListController', ControllerFunction);


    // ----- directiveFunction -----
    directiveFunction.$inject = [];

    /* @ngInject */
    function directiveFunction() {

        var directive = {
            restrict: 'E',
            templateUrl: 'components/todoList/todoList.html',
            scope: {
            },
            controller: 'TodoListController',
            controllerAs: 'vm'
        };

        return directive;
    }


    // ----- ControllerFunction -----
    ControllerFunction.$inject = ['logger'];

    /* @ngInject */
    function ControllerFunction(logger) {

        activate();

        function activate() {
            self.todos = [{'description': 'test', 'dueDate': '3/4/15'}];
            logger.log('Activated TodoList View');
        }

        function addTodo(todo) {
          logger.log('Called Add Todo function');
          self.todos.push({'description': 'test', 'dueDate': '3/4/15'});
        }
    }

})();
