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

        var vm = this;
        vm.addTodo = addTodo;
        vm.todos = []

        function activate() {
            self.todos = [{'description': 'test', 'dueDate': '3/4/15'}];
            logger.log('Activated TodoList View');
        }

        function addTodo(todo) {
          logger.log('Called Add Todo function');
          vm.todos.push({'description': todo.description, 'dueDate': todo.dueDate});
        }
    }

})();
