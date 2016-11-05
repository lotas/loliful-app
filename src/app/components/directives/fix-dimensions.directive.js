export function FixDimensionsDirective($log, $http, UserService) {
    'ngInject';

    let directive = {
        restrict: 'AEC',
        link: linkFn
    };

    return directive;

    function linkFn(scope, elm, attrs) {
        var img = $(elm);

        img.on('load', checkDimensions);
        img.on('error', function() {
            var src = attrs.src || attrs.ngSrc;

            $http.get(src, {withCredentials: false}).then(function success() {
                    // all good
                }, function error(err) {
                    if (err && err.status && err.status === 403) {
                        $log.debug(`error loading ${src}`);
                        UserService.reloadAvatar(attrs.checkAvatar).then(res => {
                            if (res.length > 0 && res[0].url) {
                                img.attr('src', res[0].url);
                                checkDimensions();
                            }
                        });
                    }
                });
        });

        function checkDimensions() {
            let height = img.height();
            let width = img.width();

            if ((height > width * 1.1) || (width > height * 1.1)) {
                img.css('background-image', `url(${img.attr('src')})`);
                img.attr('src', 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7');
                img.height(width);
            }
        }
    }
}
