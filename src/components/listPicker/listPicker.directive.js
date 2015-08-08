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

        var vm = this;
        vm.isSelected = isSelected;
        vm.selectList = selectList;
        vm.selectedList = null;

        vm.lists = [];
        $http.get('src/todoLists.json').success(function(data) {
          vm.lists = data;
          logger.log('Successfully read ' + vm.lists.length + ' lists from todoLists.json');
        });

        activate(vm);


        function activate(vm) {
            logger.log('Activated ListPicker View');

            if (vm.lists.length > 0)
              selectList(vm.lists[0]);
        }

        function isSelected(listItem) {
          if (listItem == vm.selectedList)
            return true;
          else
            return false;
        }

        function selectList(listItem) {
          vm.selectedList = listItem;
        }
    }

})();
