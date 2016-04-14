import { onAuthHandler } from './auth.handler';

export function authRouteConfig($stateProvider) {
    'ngInject';


    $stateProvider
        .state('login', {
            parent: 'guest',
            url: '/login',
            views: {
                'main@guest': {
                    templateUrl: 'app/user/auth/login.html',
                    controller: 'LoginController',
                    controllerAs: 'vm'
                }
            },
            data: {
                pageTitle: 'Log in to Loliful.io'
            }
        })
        .state('login.first-run', {
            parent: 'login',
            url: '/first-run',
            views: {
                'main@guest': {
                    templateUrl: 'app/user/auth/first-run.html',
                    controller: 'FirstRunController',
                    controllerAs: 'vm'
                }
            },
            data: {
                pageTitle: 'Welcome to Loliful.io'
            }
        })
        .state('signup', {
            parent: 'guest',
            url: '/signup',
            views: {
                'main@guest': {
                    templateUrl: 'app/user/auth/signup.html',
                    controller: 'SignupController',
                    controllerAs: 'vm'
                }
            },
            data: {
                pageTitle: 'Sign up for Loliful.io'
            }
        })
        .state('logout', {
            parent: 'app',
            url: '/logout',
            views: {
                'content@app': {
                    templateUrl: 'app/user/auth/logout.html',
                    controller: 'LogoutController',
                    controllerAs: 'vm'
                }
            },
            data: {
                pageTitle: 'Log out'
            }
        })

        .state('auth', {
            parent: 'guest',
            url: '/auth',
            onEnter: onAuthHandler
        })
    ;
}
