import { PageAboutController } from './about.controller';

angular.module('loliful.pages', [])
       .config(pagesRouterConfig)
       .controller('PageAboutController', PageAboutController)
;

function pagesRouterConfig($stateProvider) {
    'ngInject';

    $stateProvider
        .state('page', {
            abstract: true,
            parent: 'app'
        })
        .state('page.about', {
            parent: 'page',
            url: '/about',
            views: {
                'content@app': {
                    templateUrl: 'app/pages/about.html',
                    controller: 'PageAboutController',
                    controllerAs: 'vm'
                }
            }
        });
}
