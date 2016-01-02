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
    constructor($state, $aside, LiveService) {
        'ngInject';

        this.$state = $state;
        this.$aside = $aside;
        this.LiveService = LiveService;

        this.sidebar = $aside({
            template: 'app/components/navigation/aside.html',
            show: false
        });

        this.activityTypes = {
            nails: 'Nails',
            hammers: 'Hammers',
            saves: 'Saves',
            likes: 'Likes'
        };

        this.subscribeNotifications();
    }

    showAside() {
        this.sidebar.$promise.then(this.sidebar.show.bind(this.sidebar));
    }

    checkActivity(type) {
        return this.$state.is('activity', {type: type});
    }

    subscribeNotifications() {
        this.LiveService.subscribePrivate('ntfy', (data) => {
            console.log(data);
            this.unreadCount = angular.isNumber(data) ? data : false;
        });
    }
}
