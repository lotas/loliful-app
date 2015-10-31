export function routerConfig($stateProvider, $urlRouterProvider) {
    'ngInject';

    $stateProvider.state('guest', {
        abstract: true,
        templateUrl: 'app/layouts/guest.html'
    });

    $stateProvider.state('app', {
        abstract: true,
        templateUrl: 'app/layouts/app.html',
        data: {
            authRequired: true
        },
        resolve: {
            auth: function(User) {
                'ngInject';
                return User.getCurrentId();
            }
        }
    });

    $urlRouterProvider
        .otherwise('/');
}
