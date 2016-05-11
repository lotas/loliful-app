export class TopController {
    /**
     *
     * @param {User} User
     * @param {MainService} MainService
     */
    constructor(User, MainService, $stateParams, $log, $state, $rootScope) {
        'ngInject';

        this.User = User;
        this.MainService = MainService;
        this.Storage = Storage;
        this.$log = $log;
        this.$state = $state;

        this.period = $stateParams.period || '';

        this.orderedPeriods = [
            'day',
            'week',
            'month',
            'all'
        ];

        this.page = 1;
        this.jokes = [];
        this.loadTop();

        var deregister = $rootScope.$on('swipe', this.swipeListener.bind(this));
        $rootScope.$on('$destroy', deregister);
    }

    loadTop() {
        this.$loading = true;
        this.$empty = false;
        this.MainService.getTop({period: this.period}).then(res => {
            this.jokes = res.jokes;
            this.$loading = false;
            this.$hasMore = res.jokes.length > 0;
            this.$empty = res.jokes.length === 0;
        }).catch(err => {
            this.$log.error(err);
        });
    }

    loadMore() {
        if (this.$loading || !this.$hasMore) {
            return false;
        }
        this.$loading = true;
        this.$log.debug('Loading page', this.page);
        this.MainService.getTop({period: this.period, page: this.page+1}).then(res => {
            this.page++;
            this.$loading = false;
            if (res.jokes.length === 0) {
                this.$hasMore = false;
            }
            // append to avoid re-rendering
            for (var i = 0; i < res.jokes.length; i++) {
                this.jokes.push(res.jokes[i]);
            }
            this.$log.debug('Loaded top page ', this.page, 'Total loaded: ', this.jokes.length);
        });
    }

    swipeListener(evt, type) {
        let pos = this.orderedPeriods.indexOf(this.period);

        if (type === 'left') {
            if (pos + 1 < this.orderedPeriods.length) {
                this.$state.go('top', {period: this.orderedPeriods[pos + 1]});
            }
        } else {
            if (pos > 0) {
                this.$state.go('top', {period: this.orderedPeriods[pos - 1]});
            }
        }
    }

}
