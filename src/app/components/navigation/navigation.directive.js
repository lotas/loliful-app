export function NavigationDirective() {
    'ngInject';

    let directive = {
        restrict: 'E',
        templateUrl: 'app/components/navigation/navigation.html',
        controller: NavigationController,
        controllerAs: 'vm',
        bindToController: true
    };

    return directive;
}

class NavigationController {
    constructor($rootScope, $state, $aside, $log, $timeout, LiveService, Notification, User, AuthService) {
        'ngInject';

        this.$rootScope = $rootScope;
        this.$state = $state;
        this.$aside = $aside;
        this.$log = $log;
        this.LiveService = LiveService;
        this.Notification = Notification;

        this.freshNails = [];

        this.user = false;
        if (AuthService.hasToken()) {
            User.getCurrent().$promise.then(user => {
                this.user = user;

                this.loadNotificationsCount();
                this.subscribeNotifications();
            });
            // reload notifications on state change
            $rootScope.$on('$stateChangeSuccess', () => {
                $timeout(() => {
                    if (this.user) {
                        this.loadNotificationsCount();
                    }
                }, 1500);
            });
        }

        $timeout(() => {
            this.sidebar = $aside({
                templateUrl: 'app/components/navigation/aside.html',
                show: false
            });
        }, 100);
    }

    showAside() {
        this.sidebar.$promise.then(this.sidebar.show.bind(this.sidebar));
    }

    checkActivity(type) {
        return this.$state.is('activity', {type: type});
    }

    loadNotificationsCount() {
        this.Notification.count().$promise.then(res => {
            this.unreadCount = res.unread;
        });
    }

    subscribeNotifications() {
        this.LiveService.connect().then(() => {
            var unsubscribeUnread = this.LiveService.subscribePrivate('unread', (data) => {
                this.$log.debug('live.unread', data);
                this.unreadCount = data || 0;
                this.$rootScope.$apply();
            });

            var unsubscribeFresh = this.LiveService.subscribe('fresh', (nail) => {
                this.$log.debug('live.fresh', nail);
                this.freshNails.push(nail);
                this.$rootScope.$apply();
            });

            this.$rootScope.$on('$destroy', () => {
                unsubscribeUnread();
                unsubscribeFresh();
            });
        });
    }
}
