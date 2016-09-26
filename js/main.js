require.config({
    baseUrl: 'app',
    urlArgs: 'v=1.0'
});

require(
    [
        'app',
        'services/routeResolver',
        'services/authService'
    ],
    function () {
        angular.bootstrap(document, ['sampleApp']);
    });