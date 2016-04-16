export function AutoFocusDirective($timeout) {
    'ngInject';

    let directive = {
        restrict: 'AC',
        link: function(scope, elm) {
            $timeout(function(){
                elm[0].focus();
            }, 0);
        }
    };

    return directive;
}
