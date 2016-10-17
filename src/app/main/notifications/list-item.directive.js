const _typeToAction = {
    'like': 'проголосовал за',
    'save': 'сохранил',
    'share': 'поделился',
    'report': 'наябедничал',
    'reply': 'ответил на ваш',
    'unlike': 'передумал голосовать',
    'reply_same': 'ответил на такой же вопрос'
};
const _entityToName = {
    'nail': 'вопрос',
    'hammer': 'ответ'
};
const _typeToIcon = {
    'like': 'icon-loliful-icon-liked',
    'unlike': 'icon-loliful-icon-like',
    'save': 'icon-loliful-icon-bookmarked',
    'share': 'icon-loliful-icon-share',
    'report': 'icon-loliful-icon-close',
    'reply': 'icon-loliful-icon-edit',
    'reply_same': 'icon-loliful-icon-edit',
}

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

    getIcon() {
        return _typeToIcon[this.notification.type] || '';
    }

    getActorName() {
        let ntf = this.notification;
        return ntf.userId !== ntf.actorId ? ntf.$user.name : 'Вы';
    }

    getActionName() {
        return _typeToAction[this.notification.type] || 'что-то сделал';
    }

    formatString() {
        let ntf = this.notification;
        let actor = ntf.userId !== ntf.actorId ? ntf.$user.name : 'Вы';
        return `${actor} ${_typeToAction[ntf.type]} ${_entityToName[ntf.data.entity]} "${ntf.data.text}"`;
    }

    markRead() {
        this.notification.isRead = 1;
        this.Notification.markRead({notificationId: this.notification.id});
    }
}
