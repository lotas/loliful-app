export class NotificationsController {
    /**
     *
     * @param {Notification} Notification
     * @param $log
     */
    constructor(Notification, $log) {
        'ngInject';

        this.Notification = Notification;
        this.$log = $log;

        this.notifications = [];
        this.count = {};

        this.page = 1;
        this.loadFilter = {
            order: 'date DESC',
            limit: 20,
            offset: 0
        };
        this.load();
        this.loadCounts();
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
            this.$loading = false;
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
