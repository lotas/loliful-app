export class TopController {
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
        this.loadTop();
    }

    loadTop() {
        let self = this;
        this.Nail.top({}, function(res) {
            self.nails = res.nails;
        }, function(err) {
            this.$log.error(err);
        });
    }

}
