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

        var vm = this;
        activate(vm);

        function activate(vm) {
            vm.addTodo = addTodo;
            vm.todo = {'description': '', 'dueDate': new Date(), 'isDone': false};
            vm.todos = [{'description': 'test', 'dueDate': new Date(), 'isDone': true}];

            logger.log('Activated TodoList View');
        }

        function addTodo(todo) {
          logger.log('Called Add Todo function');
          vm.todos.push({'description': todo.description, 'dueDate': todo.dueDate, 'isDone': false});

          vm.todo = {'description': '', 'dueDate': new Date(), 'isDone': false}; // reset input fields' model
        }
    }

})();
