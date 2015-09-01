(function () {
    'use strict';

    var core = angular.module('app.core');

    core.config(configFunction);

    configFunction.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider'];

    /* @ngInject */
    function configFunction($locationProvider, $stateProvider, $urlRouterProvider) {

        $locationProvider.html5Mode(true);

        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('home', {
                url: '/',
                template: '<tmpl-todo-list></tmpl-todo-list>'
            })
            .state('projects', {
                url: '/projects',
                template: '<tmpl-projects></tmpl-projects>'
            })
            .state('projects.detail', {
                url: '/:projectID',
                template: '<tmpl-projects-detail></tmpl-project-detail>'
            });
    }
})();
