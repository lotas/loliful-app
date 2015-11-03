export class FreshController {
    /**
     *
     * @param {User} User
     * @param {Nail} Nail
     */
    constructor(User, Nail, $log) {
        'ngInject';

        this.User = User;
        this.Nail = Nail;
        this.$log = $log;

        this.nails = [];
        this.loadFresh();
    }

    loadFresh() {
        let self = this;
        this.Nail.fresh({}, function(res) {
            self.nails = res.nails;
        }, function(err) {
            this.$log.error(err);
        });
    }
}
