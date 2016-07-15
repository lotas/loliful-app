export function FixDimensionsDirective($timeout) {
    'ngInject';

    let directive = {
        restrict: 'AEC',
        link: linkFn
    };

    return directive;

    function linkFn(scope, elm, attr) {
        var img = $(elm);

        img.on('load', function(){
            let height = img.height();
            let width = img.width();

            if (height > width * 1.1) {
                img.css('background-image', `url(${img.attr('src')})`);
                img.attr('src', '');
                img.height(width);
            }
        });
    }
}
