export function AvatarDirective() {
    'ngInject';

    let directive = {
        restrict: 'E',
        scope: {
            user: '='
        },
        replace: true,
        templateUrl: 'app/components/directives/avatar.html'
    };

    return directive;
}
