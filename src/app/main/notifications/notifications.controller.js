export class NotificationsController {
    /**
     *
     * @param {Notification} Notification
     * @param $log
     */
    constructor(Notification, Storage, $log, $timeout) {
        'ngInject';

        this.Notification = Notification;
        this.Storage = Storage;
        this.$log = $log;

        this.notifications = [];
        this.notificationsNew = Storage.get('ntf.new') || [];
        this.notificationsOlder = Storage.get('ntf.old') || [];
        this.count = {};

        this.page = 1;
        this.loadFilter = {
            order: 'date DESC',
            limit: 20,
            offset: 0
        };
        $timeout(this.load.bind(this));
        //this.loadCounts();
    }

    loadCounts() {
        this.Notification.count().$promise.then(res => {
            this.count = res;
        });
    }

    load() {
        this.$loading = true;
        this.Notification.find({filter: this.loadFilter}).$promise.then(res => {
            this.notifications = res;
            this.notificationsNew = res.filter(a => a.isRead === 0);
            this.notificationsOlder = res.filter(a => a.isRead === 1);
            this.$loading = false;

            this.Storage.set('ntf.new', this.notificationsNew);
            this.Storage.set('ntf.old', this.notificationsOld);
        }).catch(err => {
            this.$log.error(err);
        });
    }

    loadMore() {
        if (this.$loading) {
            return false;
        }
        this.$loading = true;
        this.$log.debug('Loading page', this.page);
        this.loadFilter.offset += this.loadFilter.limit;
        this.Notification.find({filter: this.loadFilter}).$promise.then(res => {
            this.page++;
            if (res.length > 0) {
                // continue loading again
                this.$loading = false;
            }
            // append to avoid re-rendering
            for (var i = 0; i < res.length; i++) {
                this.notifications.push(res[i]);
                if (res[i].isRead === 0) {
                    this.notificationsNew.push(res[i]);
                } else {
                    this.notificationsOld.push(res[i]);
                }
            }
            this.$log.debug('Loaded page ', this.page, 'Total loaded: ', this.notifications.length);
        });
    }

    markRead() {
        this.Notification.markRead().$promise.then(res => {
            this.$log.debug('Mark read', res);
            this.loadCounts();
            this.notifications.forEach(item => {
                item.isRead = 1;
            });
        });
    }
}
