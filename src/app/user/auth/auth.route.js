import { onAuthHandler } from './auth.handler';
import { logoutHandler } from './logout.handler';

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
                pageTitle: 'Вход в loliful.co',
                showStaticHeader: true
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
                pageTitle: 'Добро пожаловать loliful.co'
            }
        })
        .state('login.invite', {
            parent: 'login',
            url: '/invite',
            views: {
                'main@guest': {
                    templateUrl: 'app/user/auth/invite.html',
                    controller: 'InviteController',
                    controllerAs: 'vm'
                }
            },
            data: {
                pageTitle: 'Invite нужен'
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
                pageTitle: 'Sign up for loliful.co'
            }
        })
        .state('logout', {
            parent: 'app',
            url: '/logout',
            onEnter: logoutHandler
        })

        .state('auth', {
            parent: 'guest',
            url: '/auth',
            onEnter: onAuthHandler
        })
    ;
}
