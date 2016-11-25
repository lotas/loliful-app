export class ProfileActivityController {

    /**
     * @param  {User} User
     * @param  {MainService} MainService
     * @param  {$stateParams} $stateParams
     * @param  {$log} $log
     */
    constructor(User, MainService, $stateParams, $log, $rootScope, $state, profile) {
        'ngInject';

        this.User = User;
        this.MainService = MainService;
        this.$log = $log;
        this.type = $stateParams.activityType;
        this.$state = $state;
        this.profile = profile;

        this.types = {
            nails: 'nails',
            hammers: 'hammers'
        };

        this.items = undefined;
        this.page = 1;
        this.loadActivity();
    }

    loadActivity() {
        if (typeof this.types[this.type] === 'undefined') {
            return false;
        }

        this.$loading = true;
        this.$empty = false;
        this.$hasMore = false;
        this.MainService.getActivity(this.type, {userId: this.profile.id}).then((data) => {

            this.items = data[this.type];
            if (this.items.length === 0) {
                this.$empty = true;
            }
            this.$loading = false;
            this.$hasMore = data.pager.pages > data.pager.page;
        }).catch((err) => {
            this.$loading = false;
            this.$log.error(err);
        });
    }

    loadMore() {
        if (!this.$hasMore || this.$loading) {
            return false;
        }
        this.$loading = true;
        this.$log.debug('Loading page', this.page);
        this.MainService.getActivity(this.type, {userId: this.profile.id, page: this.page+1}).then(res => {
            this.page++;
            this.$loading = false;
            if (res[this.type].length === 0) {
                this.$hasMore = false;
            }
            // append to avoid re-rendering
            for (var i = 0; i < res[this.type].length; i++) {
                this.items.push(res[this.type][i]);
            }
            this.$log.debug('Loaded page ', this.page, 'Total loaded: ', this.items.length);
        }).catch(err => {
            this.$loading = false;
            this.$log.warn(err);
        });
    }

}
