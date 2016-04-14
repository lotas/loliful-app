export class ProfileController {
    /**
     *
     * @param {Object} currentUser
     */
    constructor(currentUser, User, UserService, toastr) {
        'ngInject';

        this.User = User;
        this.UserService = UserService;
        this.user = currentUser;
        this.toastr = toastr;

        this.stats = null;
        this.info = null;

        this.getStats();
        this.getInfo();
        this.getAvatar();

        this.social = {};
        this.prepareSocialAccounts();
    }

    setName() {
        this.User.setName({name: this.user.name}, res => {
            this.user.name = res.name.name;
            if (res.name.dup) {
                this.toastr.warning('Sorry, this username is already taken');
            } else {
                this.toastr.success('Name saved!');
            }
        });
    }

    getStats() {
        this.User.stats({userId: this.user.id}, res => {
            this.stats = res.stats;
        });
    }

    getInfo() {
        this.UserService.loadInfo().then(res => {
            this.info = res;
        });
    }

    getAvatar() {
        if (!this.user.avatar) {
            this.UserService.loadAvatar(this.user.id).then(res => {
                this.avatar = res;
            });
        }
    }

    prepareSocialAccounts() {
        (this.user.accounts || []).forEach(acc => {
            this.social[acc.p] = acc;
        });
    }

    unlinkAccount(provider) {
        this.UserService.unlinkSocialAccount(provider).then(res => {
            delete this.social[provider];
        });
    }
}

export function resolveCurrentUser(User) {
    'ngInject';

    return User.getCurrent();
}
