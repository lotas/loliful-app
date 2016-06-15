export class ProfileController {
    /**
     *
     * @param {Object} currentUser
     */
    constructor(currentUser, User, UserService, toastr, SweetAlert, Storage) {
        'ngInject';

        this.User = User;
        this.UserService = UserService;
        this.user = currentUser;
        this.toastr = toastr;
        this.SweetAlert = SweetAlert;
        this.Storage = Storage;

        this.stats = null;
        this.info = null;

        this.getStats();
        this.getInfo();

        this.social = {};
        this.linkedAccounts = 0;
        this.user.$promise.then(() => {
            (this.user.accounts || []).forEach(acc => {
                this.linkedAccounts++;
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
                this._edit_name = false;
            }
        });
    }

    editField(field) {
        this[`_edit_${field}`] = true;
        this[`_prev_${field}`] = this.user[field];
    }
    cancelEditField(field) {
        this[`_edit_${field}`] = false;
        this.user[field] = this[`_prev_${field}`];
    }

    setAbout() {
        this.User.prototype$setAbout({about: this.user.about, id: this.user.id}, res => {
            this.user.about = res.about.about;

            this.toastr.success('Thank you!');
            this._edit_about = false;
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

    connectAcc() {
        this.Storage.set('connect.account', true);
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
