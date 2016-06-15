export function NailListItemDirective() {
    'ngInject';

    let directive = {
        restrict: 'E',
        templateUrl: 'app/main/nails/list-item.html',
        controller: NailListItemController,
        controllerAs: 'nlm',
        scope: {
            nail: '=',
            hideFooter: '=',
            isNailView: '='
        },
        bindToController: true,
        replace: true
    };

    return directive;
}

class NailListItemController {
    /**
     *
     * @param {Nail} Nail
     * @param {AuthService} AuthService
     * @param {SweetAlert} SweetAlert
     * @param {User} User
     * @param {toastr} toastr
     * @param {$log} log
     */
    constructor(Nail, SweetAlert, AuthService, User, toastr, $log, $rootScope, $scope) {
        'ngInject';

        this.Nail = Nail;
        this.User = User;
        this.$log = $log;
        this.toastr = toastr;
        this.SweetAlert = SweetAlert;
        this.$rootScope = $rootScope;

        this.isOwn = this.nail.userId && String(AuthService.getUserId()) === String(this.nail.userId);

        // hide form
        this._reply = false;

        $scope.$on('$destroy', () => {
            this.hideReplyForm();
        });
    }

    report() {
        this.SweetAlert.confirm(
            'Report abuse',
            `<img src="/assets/img/loliman-broken-helmet.svg"/>
            <p>You are about to flag this intro inappropriate. Please confirm.</p>`,
            {
                customClass: 'no-icon',
                html: true
            },
            (res) => {
            if (res === true) {
                this.Nail.prototype$report({
                    id: this.nail.id
                }).$promise.then(() => {
                    this.nail._isReported = true;
                    this.toastr.success('Thank you for reporting!');
                }).catch(err => {
                    this.$log.debug(err);
                    this.toastr.warning('oh no!, something horrible happened');
                });
            }
        });
    }

    favorite() {
        let func = !this.nail.$favorite ? 'prototype$addToFav' : 'prototype$removeFromFav';
        this.nail.$favorite = this.nail.$favorite ? false : Date.now();

        this.Nail[func]({
            id: this.nail.id
        }).$promise.then((res) => {
            this.$log.debug(res);
        }).catch(err => {
            this.$log.debug(err);
            this.toastr.warning('oh no!, something horrible happened');
        });
    }

    vote() {
        let method;

        if (this.nail.$votes) {
            method = 'prototype$unvote';
            this.nail.$votes = false;
        } else {
            method = 'prototype$vote';
            this.nail.$votes = true;
        }

        this.Nail[method]({
            id: this.nail.id
        }).$promise.then(res => {
            this.nail.countVotes = res.countVotes;
        }).catch(err => {
            this.$log.debug(err);
            this.nail.$votes = false;
            this.toastr.warning('oh no!, vote failed');
        });
    }

    showReplyForm() {
        this._reply = true;
        this.$rootScope.$emit('reply-form.open', this.nail.id);
    }

    hideReplyForm() {
        this._reply = false;
        this.$rootScope.$emit('reply-form.hide', this.nail.id);
    }

    reply() {
        this.Nail.prototype$__create__hammers({
                id: this.nail.id
            }, this._hammer)
            .$promise
            .then(res => {
                if (!this.nail.$hammers) {
                    this.nail.$hammers = [];
                }
                if (!res.$user) {
                    res.$user = this.User.getCurrent();
                }
                this.nail.$hammers.unshift(res);
                this.nail.countAnswers += 1;
                this._hammer = '';

                this.hideReplyForm();
            })
            .catch(err => {
                this.$log.debug(err);
                this.toastr.warning('oops, I failed again');
            });
    }

    delete() {
        if (this.isOwn) {
            this.SweetAlert.confirm(
                'Remove',
                'Is it this bad? Okay to remove it?',
                {
                    customClass: 'no-icon'
                },
                (res) => {
                if (res === true) {
                    this.Nail.deleteById({id: this.nail.id}).$promise.then(response => {
                        this.$log.debug(response);
                        this.nail = null;
                    }).catch(err => {
                        this.toastr.warning(err.data.error.message || 'Oops, you cannot delete this');
                        this.$log.debug(err);
                    });
                }
            });
        }
    }
}
