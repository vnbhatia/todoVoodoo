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
            saveProjects: saveProjects,
            clearCache: clearCache
        };

        return service;

        /**
         * Get all accounts.
         * @return {Promise} A promise that returns an array of accounts if resolved
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

        function saveProjects(account) {

            // Prepare account for transmission
            var accountXmt = {
                id: account.id,
                name: account.name
            };

            if (!accountXmt.id) {
                return $http.post(api + '/projects', accountXmt)
                    .then(saveProjectsSuccess)
                    .catch(function(message) {
                        exception.catcher('XHR Failed for saveProjects')(message);
                        $location.url('/');
                    });
            }
            else {
                return $http.put(api + '/projects/' + accountXmt.id, accountXmt)
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
            cache.remove(api + '/todolists');
        }
    }
})();
