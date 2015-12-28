export function NotificationsListItemItemDirective() {
    'ngInject';

    let directive = {
        restrict: 'E',
        templateUrl: 'app/main/notifications/list-item.html',
        controller: NotificationsListItemController,
        controllerAs: 'nli',
        scope: {
            notification: '='
        },
        bindToController: true,
        replace: true
    };

    return directive;
}

class NotificationsListItemController {
    /**
     * @param  {any} Notification
     * @param  {any} $log
     */
    constructor(Notification, $log) {
        'ngInject';

        this.Notification = Notification;
        this.$log = $log;
    }

}
