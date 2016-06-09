import { PageAboutController } from './about.controller';
import { PageContactController } from './contact.controller';

angular.module('loliful.pages', [])
       .config(pagesRouterConfig)
       .controller('PageAboutController', PageAboutController)
       .controller('PageContactController', PageContactController)
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
        })
        .state('page.contact', {
            parent: 'page',
            url: '/contact',
            views: {
                'content@app': {
                    templateUrl: 'app/pages/contact.html',
                    controller: 'PageContactController',
                    controllerAs: 'vm'
                }
            }
        });
}
