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

    $stateProvider.state('home', {
        url: '/',
        onEnter: function($state, AuthService) {
            'ngInject';

            console.log('home on enter')
            if (AuthService.hasToken()) {
                $state.go('fresh');
            } else {
                // Default top for masses..
                $state.go('top');
            }
        }
    });

    function notFoundRule($injector, $location) {
        'ngInject';
        $injector.get('$state')
            .go('not-found', {
                error: $location.path()
            });
    }

    $urlRouterProvider
        .when('', '/')
        .otherwise(notFoundRule);
}
