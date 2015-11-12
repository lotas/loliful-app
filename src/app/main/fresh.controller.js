export class FreshController {
    /**
     *
     * @param {User} User
     * @param {Nail} Nail
     * @param $log
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
        this.Nail.fresh({}, res => {
            this.nails = res.nails;
        }, err => {
            this.$log.error(err);
        });
    }

    onAdd(nail) {
        this.nails.unshift(nail);
    }
}
