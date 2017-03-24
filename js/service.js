/**
 * Created by daixy1 on 2017/3/10.
 */
(function (app) {
    'use strict';

    app.factory('apiService', apiService);

    apiService.$inject = ['$http', '$location','$rootScope'];

    function apiService($http, $location, $rootScope) {
        var service = {
            get: get,
            post: post
        };

        function get(url, config, success, failure) {
            return $http.get(url, config)
                .then(function (result) {
                    success(result);
                }, function (error) {
                    if (error.status == '401') {
                        console.log('Authentication required');
                        //notificationService.displayError('Authentication required.');
                        $rootScope.previousState = $location.path();
                        $location.path('/login');
                    }
                    else if (failure != null) {
                        failure(error);
                    }
                });
        }

        function post(url, data, success, failure) {
            return $http.post(url, data)
                .then(function (result) {
                    success(result);
                }, function (error) {
                    if (error.status == '401') {
                        console.log('Authentication required');
                        $rootScope.previousState = $location.path();
                        $location.path('/login');
                    }
                    else if (failure != null) {
                        failure(error);
                    }
                });
        }
        function del(url, config, success, failure) {
            return $http.get(url, config)
                .then(function (result) {
                    success(result);
                }, function (error) {
                    if (error.status == '401') {
                        console.log('Authentication required');
                        //notificationService.displayError('Authentication required.');
                        $rootScope.previousState = $location.path();
                        $location.path('/login');
                    }
                    else if (failure != null) {
                        failure(error);
                    }
                });
        }
        return service;
    }

})(angular.module('inspinia'));
(function (app) {
    'use strict';
    app.factory('api', api);
    api.$inject = ['$http', '$location', '$resource'];
    function api($resource) {
        return $resource('http://localhost:55472/api/Employees/', {}, {
            GetJsonp: { method: 'JSONP', params: { callback: 'JSON_CALLBACK' }, isArray: true },
            Get: { method: 'GET', isArray: true },
            Post: { method: 'POST' },
            Put: { method: 'Put'},
            Delete: { method: 'Delete'}
        })
    }
})(angular.module('inspinia'));
//angular.module('inspinia').factory("apiService",["$resource", function($resource){
//    var baseUrl = "http://localhost:55472/api/Employees";
//    return $resource("http://localhost:55472/api/Employees",{},{
//        query: {method: "GET", isArray: true },
//        create: {method: "POST"},
//        get: {method: "GET", url: baseUrl + "?id=:id"},
//        remove: {method: "DELETE", url: baseUrl + "?id=:id"},
//        update: {method: "PUT", url: baseUrl + "?id=:id"}
//    })
//}]);