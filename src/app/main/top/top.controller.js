export class TopController {
    /**
     *
     * @param {User} User
     * @param {MainService} MainService
     */
    constructor(User, MainService, $log) {
        'ngInject';

        this.User = User;
        this.MainService = MainService;
        this.$log = $log;

        this.jokes = [];
        this.page = 1;
        this.loadTop();
    }

    loadTop() {
        this.$loading = true;
        this.MainService.getTop().then(res => {
            this.jokes = res.jokes;
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
        this.MainService.getTop({page: this.page+1}).then(res => {
            this.page++;
            if (res.jokes.length > 0) {
                // continue loading again
                this.$loading = false;
            }
            // append to avoid re-rendering
            for (var i = 0; i < res.jokes.length; i++) {
                this.jokes.push(res.jokes[i]);
            }
            this.$log.debug('Loaded page ', this.page, 'Total loaded: ', this.jokes.length);
        });
    }
}
