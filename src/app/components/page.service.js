export class PageService {
    constructor($rootScope) {
        'ngInject';

        this.$rootScope = $rootScope;
    }

    setTitle(title) {
        this.$rootScope.page.title = title;
    }
}

/**
 *
 * @param {$rootScope} $rootScope
 * @param {PageService} PageService
 */
export function runPageService($rootScope, PageService) {
    'ngInject';

    $rootScope.page = {
        title: 'Loliful.io'
    };

    $rootScope.$on('$stateChangeSuccess', function(event, toState) {
        if (toState.data && toState.data.pageTitle) {
            PageService.setTitle(toState.data.pageTitle);
        }
    });
}
