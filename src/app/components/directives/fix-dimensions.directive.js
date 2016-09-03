export function FixDimensionsDirective() {
    'ngInject';

    let directive = {
        restrict: 'AEC',
        link: linkFn
    };

    return directive;

    function linkFn(scope, elm) {
        var img = $(elm);

        img.on('load', function(){
            let height = img.height();
            let width = img.width();

            if ((height > width * 1.1) || (width > height * 1.1)) {
                img.css('background-image', `url(${img.attr('src')})`);
                img.attr('src', '');
                img.height(width);
            }
        });
    }
}
