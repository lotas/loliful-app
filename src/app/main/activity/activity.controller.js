export const activityTypes = {
    nails: 'Intros',
    saves: 'Saves',
    hammers: 'Outros',
    likes: 'Likes'
};

export class ActivityController {

    /**
     * @param  {User} User
     * @param  {MainService} MainService
     * @param  {$stateParams} $stateParams
     * @param  {$log} $log
     */
    constructor(User, MainService, $stateParams, $log, $rootScope, $state) {
        'ngInject';

        this.User = User;
        this.MainService = MainService;
        this.$log = $log;
        this.type = $stateParams.type;
        this.$state = $state;

        this.types = activityTypes;

        this.typeName = this.types[this.type];
        this.orderedTypes = [
            'saves',
            'likes',
            'nails',
            'hammers'
        ];

        this.items = undefined;
        this.page = 1;
        this.loadActivity();

        //var deregister = $rootScope.$on('swipe', this.swipeListener.bind(this));
        //$rootScope.$on('$destroy', deregister);
    }

    loadActivity() {
        if (typeof this.types[this.type] === 'undefined') {
            return false;
        }

        this.$loading = true;
        this.$empty = false;
        this.$hasMore = false;
        this.MainService.getActivity(this.type).then((data) => {

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
        this.MainService.getActivity(this.type, {page: this.page+1}).then(res => {
            this.page++;
            this.$loading = false;
            if (res[this.type].length === 0) {
                this.$hasMore = false;
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

    swipeListener(evt, type) {
        if (!this.$state.is('activity')) {
            return false;
        }

        let pos = this.orderedTypes.indexOf(this.type);

        if (type === 'left') {
            if (pos + 1 < this.orderedTypes.length) {
                this.$state.go('activity', {type: this.orderedTypes[pos + 1]});
            }
        } else {
            if (pos > 0) {
                this.$state.go('activity', {type: this.orderedTypes[pos - 1]});
            }
        }
    }
}
