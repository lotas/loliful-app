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

        this.social = {};
        this.user.$promise.then(() => {
            (this.user.accounts || []).forEach(acc => {
                this.social[acc.p] = acc;
            });
        });
    }

    setName() {
        this.User.prototype$setName({name: this.user.name, id: this.user.id}, res => {
            this.user.name = res.name.name;
            if (res.name.dup) {
                this.toastr.warning('Sorry, this username is already taken');
            } else {
                this.toastr.success('Name saved!');
                this.isEdit = false;
            }
        });
    }

    setAbout() {
        this.User.prototype$setAbout({about: this.user.about, id: this.user.id}, res => {
            this.user.about = res.about.about;

            this.toastr.success('Thank you!');
            this.isAboutEdit = false;
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

    return User.getCurrent().$promise;
}
