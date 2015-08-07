(function () {

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
            templateUrl: 'components/listPicker/listPicker.html',
            scope: {
            },
            controller: 'ListPickerController',
            controllerAs: 'vm'
        };

        return directive;
    }


    // ----- ControllerFunction -----
    ControllerFunction.$inject = ['logger', '$http'];

    /* @ngInject */
    function ControllerFunction(logger, $http) {

        activate();
        var vm = this;

        vm.lists = [];
        $http.get('/todoLists.json').success(function(data) {
          listController.lists = data;
          logger.log('Successfully read todoLists.json');
        });

        //vm.lists = ['Work', 'Chores', 'Ideas', 'Car'];

        function activate() {
            logger.log('Activated ListPicker View');


        }
    }

})();
