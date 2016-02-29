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
            add: '&',
            show: '='
        }
    };

    return directive;
}

class FloatMenuController {
    constructor($window, $scope, $timeout, throttle) {
        'ngInject';

        this.$window = $window;
        this.win = angular.element($window);
        this.fm1 = angular.element('#fm1');
        this.fm2 = angular.element('#fm2');

        var scrollHandler = throttle(this.scroll, 150).bind(this);

        this.showFloatMenu = true;
        this.$timeout = $timeout;
        this.hideTm = null;

        this.win.on('scroll', scrollHandler);
        $scope.$on('$destroy', () => {
            this.win.off('scroll', scrollHandler);
            delete this.win;
            delete this.scrollHandler;
            delete this.fm2;

            if (this.hideTm) {
                $timeout.cancel(this.hideTm);
            }
        });

        this.hidden = this.show ? false : true;

        if (this.show) {
            this.fm2.removeClass('hidden').removeClass('ng-hide');
        }
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

    scroll() {
        if (this.$window.pageYOffset <= 100) {
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
