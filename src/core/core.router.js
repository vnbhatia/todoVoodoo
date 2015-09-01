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
                template: '<div><a href="/projects">Go to projects</a></div>'//'<tmpl-home></tmpl-home>'
            })
            .state('projects', {
                url: '/projects',
                template: '<tmpl-projects></tmpl-projects>'
            })
            .state('projects.detail', {
                url: '/:projectName',
                template: '<tmpl-project-detail></tmpl-project-detail>'
            });
    }
})();
