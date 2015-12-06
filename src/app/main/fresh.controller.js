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
        this.loadFresh();
    }

    loadFresh() {
        this.MainService.getFresh().then(res => {
            this.nails = res.nails;
        }).catch(err => {
            this.$log.error(err);
        });
    }

    onAdd(nail) {
        this.nails.unshift(nail);
    }
}
