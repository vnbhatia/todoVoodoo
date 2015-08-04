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
    ControllerFunction.$inject = ['logger'];

    /* @ngInject */
    function ControllerFunction(logger) {

        activate();

        function activate() {
            logger.log('Activated ListPicker View');
        }
    }

})();
