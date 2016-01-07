const _typeToAction = {
    'like': 'liked your',
    'save': 'saved your',
    'share': 'shared your',
    'report': 'reported your',
    'reply': 'replied to your'
};
const _entityToName = {
    'nail': 'question',
    'hammer': 'answer'
};

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

    formatString() {
        let ntf = this.notification;
        let actor = ntf.userId !== ntf.actorId ? ntf.$user.name : 'You';
        return `${actor} ${_typeToAction[ntf.type]} ${_entityToName[ntf.data.entity]} "${ntf.data.text}"`;
    }

    markRead() {
        this.notification.isRead = 1;
        this.Notification.markRead({notificationId: this.notification.id});
    }
}