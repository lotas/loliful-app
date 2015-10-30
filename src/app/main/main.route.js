export function mainRouteConfig($stateProvider) {
    'ngInject';
    $stateProvider
        .state('main', {
            parent: 'app',
            url: '/',
            views: {
                '@': {
                    templateUrl: 'app/main/main.html',
                    controller: 'MainController',
                    controllerAs: 'main'
                }
            }
        });
}
