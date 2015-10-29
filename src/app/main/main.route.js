export function mainRouteConfig($stateProvider) {
    'ngInject';
    $stateProvider
        .state('home', {
            parent: 'app',
            url: '/',
            templateUrl: 'app/main/main.html',
            controller: 'MainController',
            controllerAs: 'main'
        });
}
