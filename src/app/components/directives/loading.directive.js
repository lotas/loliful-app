export function LoadingDirective() {
    'ngInject';

    let directive = {
        restrict: 'E',
        replace: true,
        templateUrl: 'app/components/directives/loading.html'
    };

    return directive;
}
