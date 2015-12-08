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

        this.nails = [];
        this.loadTop();
    }

    loadTop() {
        this.MainService.getTop().then(res => {
            this.jokes = res.jokes;
        }).catch(err => {
            this.$log.error(err);
        });
    }

}
