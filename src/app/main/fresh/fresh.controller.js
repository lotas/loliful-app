export class FreshController {
    /**
     *
     * @param {User} User
     * @param {MainService} MainService
     * @param {$stateParams} $stateParams
     * @param {$modal} $modal
     * @param $log
     */
    constructor(User, MainService, $stateParams, $log, $modal, $rootScope) {
        'ngInject';

        this.User = User;
        this.MainService = MainService;
        this.$log = $log;
        this.$modal = $modal;
        this.$rootScope = $rootScope;

        this.type = $stateParams.type || 'recent';

        this.page = 1;
        this.$hasMore = false;
        this.nails = [];
        this._addModal = null;

        this.loadFresh();

        this.$rootScope.$on('nail.add.success', (evt, nail) => {
            this.onAdd(nail);
            if (this._addModal) {
                this._addModal.hide();
            }
        });
    }

    loadFresh() {
        this.nails = [];
        this.$loading = true;
        this.$hasMore = false;
        this.MainService.getFresh({type: this.type}).then(res => {
            this.nails = res.nails;
            this.$loading = false;
            this.$hasMore = res.pager.pages > res.pager.page;
        }).catch(err => {
            this.$log.error(err);
        });
    }

    showAddModal() {
        this._addModal = this.$modal({
            templateUrl: 'app/main/nails/add.modal.html',
            controller: 'NailAddController',
            controllerAs: 'na',
            html: true,
            show: true
        });
    }

    onAdd(nail) {
        this.nails = [nail].concat(this.nails);
    }

    loadMore() {
        if (this.$loading || !this.$hasMore) {
            return false;
        }
        this.$loading = true;
        this.$log.debug('Loading page', this.page);
        this.MainService.getFresh({page: this.page + 1, type: this.type}).then(res => {
            this.page++;
            this.$loading = false;
            if (res.nails.length === 0) {
                this.$hasMore = false;
            }
            // append to avoid re-rendering
            for (var i = 0; i < res.nails.length; i++) {
                this.nails.push(res.nails[i]);
            }
            this.$log.debug('Loaded fresh page ', this.page, 'Total loaded: ', this.nails.length);
        });
    }
}
