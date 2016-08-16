export function FloatMenuDirective() {
    'ngInject';

    let directive = {
        restrict: 'E',
        templateUrl: 'app/components/navigation/float-menu.html',
        controller: FloatMenuController,
        controllerAs: 'fm',
        bindToController: true,
        scope: {
            single: '=',
            show: '=',
            onAddClick: '&'
        }
    };

    return directive;
}

class FloatMenuController {
    constructor($window, $scope, $timeout, throttle, $rootScope) {
        'ngInject';

        this.$window = $window;
        this.$timeout = $timeout;
        this.$scope = $scope;
        this.throttle = throttle;

        this.win = angular.element($window);
        this.body = angular.element('body');
        this.fm2 = angular.element('#fm2').find('.top-nav');

        if (this.show) {
            this.fm2.removeClass('hidden').removeClass('ng-hide');
            this.hidden = false;
            this.showFloatMenu = true;
        } else {
            this.hidden = true;
            this.setupListener();
        }

        this._deregister = $rootScope.$on('reply-form.open', () => {
            this.body.addClass('reply-editor');
        });
        this._deregister2 = $rootScope.$on('reply-form.hide', () => {
            this.body.removeClass('reply-editor');
        });
    }

    setupListener() {
        var scrollHandler = this.throttle(this.scroll, 100).bind(this);

        this.showFloatMenu = true;

        this.win.on('scroll', scrollHandler);
        this.$scope.$on('$destroy', () => {
            this.win.off('scroll', scrollHandler);
            delete this.win;
            delete this.scrollHandler;
            delete this.fm2;

            this._deregister();
            this._deregister2();
        });

        this.hidden = this.show ? false : true;
        this.scroll();
    }

    addClick() {
        this.onAddClick({});
    }

    scroll() {
        if (this.$window.pageYOffset < 80) {
            if (!this.hidden) {
                this.fm2.addClass('hidden');
                this.hidden = true;
            }
        } else {
            if (this.hidden) {
                this.fm2.removeClass('hidden').removeClass('ng-hide');
                this.hidden = false;
                this.showNav = false;
            }
        }
    }
}
