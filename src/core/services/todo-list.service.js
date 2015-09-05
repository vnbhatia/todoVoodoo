/* jshint -W024 */
(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('todoListService', serviceFunction);

    serviceFunction.$inject = ['$http', '$location', '$cacheFactory', 'exception', 'api', '_'];

    /* @ngInject */
    function serviceFunction($http, $location, $cacheFactory, exception, api, _) {
        var service = {
            getProjects: getProjects,
            saveProject: saveProject,
            clearCache: clearCache
        };

        return service;

        /**
         * Get all projects.
         * @return {Promise} A promise that returns an array of projects if resolved
         */
        function getProjects() {
            return $http.get(api + '/projects', { cache: true })
                .then(getProjectsSuccess)
                .catch(function(message) {
                    exception.catcher('XHR Failed for getProjects')(message);
                    $location.url('/');
                });

            function getProjectsSuccess(response) {
                var projects = response.data;

                // Sort by name
                projects = _.sortBy(projects, 'name');

                return projects;
            }
        }

        function saveProject(project) {

            // Prepare project for transmission
            var projectXmt = {
                name: project.projectName,
                todos: project.todos
            };

            if (!projectXmt.name) {
                return $http.post(api + '/projects', projectXmt)
                    .then(saveProjectsSuccess)
                    .catch(function(message) {
                        exception.catcher('XHR Failed for saveProjects')(message);
                        $location.url('/');
                    });
            }
            else {
                return $http.put(api + '/projects/' + projectXmt.name, projectXmt)
                    .then(saveProjectsSuccess)
                    .catch(function(message) {
                        exception.catcher('XHR Failed for saveProjects')(message);
                        $location.url('/');
                    });
            }

            function saveProjectsSuccess(response) {
                return response.data;
            }
        }

        function clearCache() {
            var cache = $cacheFactory.get('$http');
            cache.remove(api + '/projects');
        }
    }
})();
