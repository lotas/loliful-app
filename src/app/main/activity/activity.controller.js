export class ActivityController {

    /**
     * @param  {User} User
     * @param  {MainService} MainService
     * @param  {$stateParams} $stateParams
     * @param  {$log} $log
     */
    constructor(User, MainService, $stateParams, $log) {
        'ngInject';

        this.User = User;
        this.MainService = MainService;
        this.$log = $log;
        this.type = $stateParams.type;

        this.types = {
            nails: 'Intros',
            hammers: 'Outros',
            saves: 'Saves',
            likes: 'Likes'
        };

        this.typeName = this.types[this.type];

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
        this.MainService.getActivity(this.type).then((data) => {
            this.items = data[this.type];
            if (this.items.length === 0) {
                this.$empty = true;
            }
        }).catch((err) => {
            this.$log.error(err);
        }).finally(() => {
            this.$loading = false;
        });
    }

    loadMore() {
        if (this.$loading) {
            return false;
        }
        this.$loading = true;
        this.$log.debug('Loading page', this.page);
        this.MainService.getActivity(this.type, {page: this.page+1}).then(res => {
            this.page++;
            if (res[this.type].length > 0) {
                // continue loading again
                this.$loading = false;
            }
            // append to avoid re-rendering
            for (var i = 0; i < res[this.type].length; i++) {
                this.items.push(res[res.type][i]);
            }
            this.$log.debug('Loaded page ', this.page, 'Total loaded: ', this.items.length);
        }).catch(err => {
            this.$loading = false;
            this.$log.warn(err);
        });
    }
}
