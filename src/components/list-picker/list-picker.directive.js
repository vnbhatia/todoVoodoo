(function() {

    'use strict';

    angular.module('app.listPicker')
        .directive('tmplListpicker', directiveFunction)
        .controller('ListPickerController', ControllerFunction);


    // ----- directiveFunction -----
    directiveFunction.$inject = [];

    /* @ngInject */
    function directiveFunction() {

        var directive = {
            restrict: 'E',
            templateUrl: 'components/list-picker/list-picker.html',
            scope: {},
            controller: 'ListPickerController',
            controllerAs: 'vm'
        };

        return directive;
    }


    // ----- ControllerFunction -----
    ControllerFunction.$inject = ['logger', '$http', 'todoListService'];

    /* @ngInject */
    function ControllerFunction(logger, $http, todoListService) {

        var vm = this;
        vm.isSelected = isSelected;
        vm.selectProject = selectProject;
        vm.selectedProject = null;

        activate();

        function activate() {
            return getProjects().then(function() {
                logger.log('Successfully read ' + vm.projects.length + ' projects from todoListService');

                // Select the first list in the set of lists
                if (vm.projects.length > 0) {
                    selectProject(vm.projects[0]);
                }
            });
        }

        function getProjects() {
            return todoListService.getProjects().then(function(data) {
                vm.projects = data;
                return vm.projects;
            });
        }


        function isSelected(project) {
            if (project === vm.selectedProject) {
                return true;
            } else {
                return false;
            }
        }

        function selectProject(project) {
            vm.selectedProject = project;
        }
    }

})();
