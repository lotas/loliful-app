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
        this.fm1 = angular.element('#fm1');
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
        this.hideTm = null;

        this.win.on('scroll', scrollHandler);
        this.$scope.$on('$destroy', () => {
            this.win.off('scroll', scrollHandler);
            delete this.win;
            delete this.scrollHandler;
            delete this.fm2;

            if (this.hideTm) {
                this.$timeout.cancel(this.hideTm);
            }

            this._deregister();
            this._deregister2();
        });

        this.hidden = this.show ? false : true;
        this.scroll();
    }

    showHideNav() {
        this.showNav = !this.showNav;
        this.showFloatMenu = !this.showNav;
        if (this.showNav === true) {
            this.hideTm = this.$timeout(() => {
                this.showNav = false;
                this.showFloatMenu = true;
            }, 5000);
        }
    }

    addClick() {
        this.onAddClick({});
    }

    scroll() {
        if (this.$window.pageYOffset < 80) {
            if (!this.hidden) {
                this.fm2.addClass('hidden');
                this.fm1.addClass('ng-hide');
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
