export function AvatarDirective() {
    'ngInject';

    let directive = {
        restrict: 'E',
        scope: {
            user: '='
        },
        replace: false,
        templateUrl: 'app/components/directives/avatar.html'
    };

    return directive;
}
