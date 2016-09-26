'use strict';

define(['app'], function (app) {

    var injectParams = ['$location', '$routeParams', 'authService'];

    var LoginController = function ($location, $routeParams, authService) {
        var scope = this,
            path = '/';

        scope.email = null;
        scope.password = null;
        scope.errorMessage = null;

        scope.login = function () {
            authService.login(scope.email, scope.password).then(function (status) {
                //$routeParams.redirect will have the route
                //they were trying to go to initially
                if (!status) {
                    scope.errorMessage = 'Unable to login';
                    return;
                }

                if (status && $routeParams && $routeParams.redirect) {
                    path = path + $routeParams.redirect;
                }

                $location.path(path);
            });
        };
    };

    LoginController.$inject = injectParams;

    app.register.controller('LoginController', LoginController);

});