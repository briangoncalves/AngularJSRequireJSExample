'use strict';

define(['services/routeResolver'], function () {

    var app = angular.module('sampleApp', ['ngRoute', 'routeResolverServices']);

    app.config(['$routeProvider', 'routeResolverProvider', '$controllerProvider',
                '$compileProvider', '$filterProvider', '$provide', '$httpProvider',

        function ($routeProvider, routeResolverProvider, $controllerProvider,
                  $compileProvider, $filterProvider, $provide, $httpProvider) {

            app.register =
            {
                controller: $controllerProvider.register,
                directive: $compileProvider.directive,
                filter: $filterProvider.register,
                factory: $provide.factory,
                service: $provide.service
            };
            var route = routeResolverProvider.route;

            $routeProvider
                .when('/home', route.resolve('Home'))
                .when('/about', route.resolve('About'))
                .otherwise({ redirectTo: '/home' });
                }]);

    app.run(['$rootScope', '$location', 'authService',
        function ($rootScope, $location, authService) {            
            $rootScope.$on("$routeChangeStart", function (event, next, current) {
                if (next && next.$$route && next.$$route.secure) {
                    if (!authService.user.isAuthenticated) {
                        $rootScope.$evalAsync(function () {
                            authService.redirectToLogin();
                        });
                    }
                }
            });

    }]);

    return app;

});
