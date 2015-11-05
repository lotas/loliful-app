import { onAuthHandler } from './auth.handler';

export function authRouteConfig($stateProvider) {
    'ngInject';


    $stateProvider
        .state('login', {
            parent: 'guest',
            url: '/login',
            views: {
                'main@guest': {
                    templateUrl: 'app/main/auth/login.html',
                    controller: 'LoginController',
                    controllerAs: 'vm'
                }
            }
        })
        .state('logout', {
            parent: 'app',
            url: '/logout',
            views: {
                'content@app': {
                    templateUrl: 'app/main/auth/logout.html',
                    controller: 'LogoutController',
                    controllerAs: 'vm'
                }
            }
        })

        .state('auth', {
            parent: 'guest',
            url: '/auth',
            onEnter: onAuthHandler
        })
    ;
}
