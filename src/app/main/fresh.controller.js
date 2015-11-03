export class FreshController {
    /**
     *
     * @param {User} User
     * @param {Nail} Nail
     */
    constructor(User, Nail) {
        'ngInject';

        this.User = User;
        this.Nail = Nail;
    }

    loadFresh() {
        this.Nail.find()
    }
}
