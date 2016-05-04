export class ProfileController {
    /**
     *
     * @param {Object} currentUser
     */
    constructor(currentUser, User, UserService, toastr, SweetAlert) {
        'ngInject';

        this.User = User;
        this.UserService = UserService;
        this.user = currentUser;
        this.toastr = toastr;
        this.SweetAlert = SweetAlert;

        this.stats = null;
        this.info = null;

        this.getStats();
        this.getInfo();
        this.getAvatar();

        this.social = {};
        this.user.$promise.then(() => {
            (this.user.accounts || []).forEach(acc => {
                this.social[acc.p] = acc;
            });
        });
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
        console.log(this.user);
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

    unlinkAccount(provider) {
        this.SweetAlert.confirm('Please confirm', `Disconnect from ${provider}?`, (res) => {
            if (res === true) {
                this.UserService.unlinkSocialAccount(provider).then(() => {
                    this.toastr.success(`Unlinked your ${provider} account`);
                    delete this.social[provider];
                });
            }
        });
    }
}

export function resolveCurrentUser(User) {
    'ngInject';

    return User.getCurrent();
}
