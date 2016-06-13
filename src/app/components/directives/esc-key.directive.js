export function EscKeyDirective() {
    return function(scope, elm, attrs) {
        elm.bind('keydown keypress', evt => {
            if (evt.which === 27) {
                scope.$apply(function () {
                    scope.$eval(attrs.escKey);
                });
                event.preventDefault();
            }
        });
    }
}
