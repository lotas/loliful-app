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

        this.social = {};
        this.linkedAccounts = 0;
        this.user.$promise.then(() => {
            (this.user.accounts || []).forEach(acc => {
                this.linkedAccounts++;
                this.social[acc.p] = acc;
            });
            this.getStats();
            this.getInfo();
            this.getNotificationSettings();

            if (this.user.emailUnverified) {
                this.user.email = this.user.emailUnverified;
            }
        });
    }

    setName(frm) {
        if (frm.$invalid) {
            return false;
        }
        this.User.prototype$setName({name: this.user.name, id: this.user.id}, res => {
            if (res.name.dup) {
                this.toastr.warning('Sorry, this username is already taken');
            } else if (res.name.error) {
                this.toastr.warning(res.name.error);
            } else {
                this.toastr.success('Name saved!');
                this.user.name = res.name.name;
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
            if (res.about.error) {
                this.toastr.warning(res.about.error);
            } else {
                this.user.about = res.about.about;
                this.toastr.success('Thank you!');
                this._edit_about = false;
            }
        });
    }

    setEmail() {
        this.User.prototype$setEmail({email: this.user.email, id: this.user.id}, res => {
            this.user.emailUnverified = this.user.email = res.email;
            this.toastr.success('Please check your email to verify it');
            this._edit_email = false;
        }, err => {
            this.toastr.error(err.data.error.message);
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

    getNotificationSettings() {
        this.User.prototype$__get__notificationSettings({
            id: this.user.id
        }, res => {
            this.notifications = res || {};
        });
    }

    saveSettings() {
        this.savingSettings = true;
        this.User.prototype$__update__notificationSettings({
            id: this.user.id,
            emailReply: this.notifications.emailReply,
            emailLike: this.notifications.emailLike
        }, () => {
            this.savingSettings = false;
            this.toastr.success('Thanks! All saved.')
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
