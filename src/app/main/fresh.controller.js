export class FreshController {
    /**
     *
     * @param {User} User
     * @param {MainService} MainService
     * @param $log
     */
    constructor(User, MainService, $log) {
        'ngInject';

        this.User = User;
        this.MainService = MainService;
        this.$log = $log;

        this.nails = [];
        this.page = 1;
        this.loadFresh();
    }

    loadFresh() {
        this.$loading = true;
        this.MainService.getFresh().then(res => {
            this.nails = res.nails;
            this.$loading = false;
        }).catch(err => {
            this.$log.error(err);
        });
    }

    onAdd(nail) {
        this.nails.unshift(nail);
    }

    loadMore() {
        if (this.$loading) {
            return false;
        }
        this.$loading = true;
        this.$log.debug('Loading page', this.page);
        this.MainService.getFresh({page: this.page+1}).then(res => {
            this.page++;
            if (res.nails.length > 0) {
                // continue loading again
                this.$loading = false;
            }
            // append to avoid re-rendering
            for (var i = 0; i < res.nails.length; i++) {
                this.nails.push(res.nails[i]);
            }
            this.$log.debug('Loaded page ', this.page, 'Total loaded: ', this.nails.length);
        });
    }
}
