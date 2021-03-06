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
     * @param $log
     * @param $rootScope
     * @param $scope
     * @param $tim
     */
    constructor(Nail, SweetAlert, AuthService, User, toastr, $state, $log,
                $rootScope, $scope, $timeout, ShareService) {
        'ngInject';

        this.Nail = Nail;
        this.User = User;
        this.$log = $log;
        this.toastr = toastr;
        this.SweetAlert = SweetAlert;
        this.$rootScope = $rootScope;
        this.$timeout = $timeout;
        this.$state = $state;
        this.ShareService = ShareService;

        this.isOwn = this.nail.userId && String(AuthService.getUserId()) === String(this.nail.userId);
        this.isMod = AuthService.isMod();

        // hide form
        this._reply = false;

        this._tm;

        // to hide reply form when other was opened
        var dereg = $rootScope.$on('reply-form.open', (evt, nailId) => {
            if (this._reply && nailId !== this.nail.id) {
                this.hideReplyForm();
            }
        });

        var dereg2 = $rootScope.$on('nail.deleted', (evt, deletedNailId) => {
            if (String(this.nail.id) === String(deletedNailId)) {
                this.nail._isDeleted = true;
            }
        });

        // for separate modal window to add answer and trigger native reply()
        var dereg3 = $rootScope.$on('nail.reply-added', (evt, nailId, text) => {
            if (!evt.defaultPrevented && String(this.nail.id) === String(nailId)) {
                evt.preventDefault();
                this._hammer = {
                    text: text
                };
                this.reply();
            }
        });

        $scope.$on('$destroy', () => {
            this.hideReplyForm();
            dereg();
            dereg2();
            dereg3();
            if (this._tm) {
                $timeout.cancel(this._tm);
            }
        });
    }

    report() {
        this.SweetAlert.confirm(
            'Пожаловаться',
            `<img src="/assets/img/loliman-broken-helmet.svg"/>
            <p>Вы собрались отметить этот вопрос как неадекватный</p>`,
            {
                customClass: 'no-icon',
                html: true,
                confirmButtonText: 'Отметить'
            },
            (res) => {
                if (res === true) {
                    this.Nail.prototype$report({
                        id: this.nail.id
                    }).$promise.then(() => {
                        this.nail._isReported = true;
                        this.toastr.success('Спасибо за помощь!');
                    }).catch(err => {
                        this.$log.debug(err);
                        this.toastr.warning('Опа! Произошло непоправимое');
                    });
                }
            }
        );
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
            this.toastr.warning('Ужос! Не получилось добавить');
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
            this.toastr.warning('Неет! Не получилось...');
        });
    }

    cardClick($event) {
        if (this.isEdit) {
            return false;
        }

        if (this._reply) {
            $event.preventDefault();
            this.hideReplyForm();
            return false;
        } else {
            this.$state.go('nail-view', {
                nailId: this.nail.id,
                nail: this.nail
            });
        }
        return true;
    }

    showReplyForm() {
        this._reply = true;
        this.$rootScope.$emit('reply-form.open', this.nail.id);
    }

    hideReplyForm() {
        this._reply = false;
        this.$rootScope.$emit('reply-form.hide', this.nail.id);
    }

    startEdit() {
        this._prevValue = this.nail.text;
        this.isEdit = true;
    }

    resetEdit() {
        this.nail.text = this._prevValue;
        this.isEdit = false;
    }

    edit() {
        if (this._prevValue === this.nail.text) {
            this.isEdit = false;
            return;
        }
        this._saving = true;
        this.Nail.prototype$updateAttributes({
            id: this.nail.id
        }, {
            text: this.nail.text
        }).$promise
            .then(() => {
                this.toastr.success('Это успех!');
                this.isEdit = false;
                this._saving = false;
                this._prevValue = '';
                this._updated = true;
                this.$timeout(() => {
                    this._updated = false;
                }, 700);
            })
            .catch(err => {
                this._saving = false;
                this.toastr.warning('Кажется, что-то пошло не так');
                this.$log.debug(err);
            });
    }

    reply() {
        if (!this._hammer || /^\s+$/.test(this._hammer.text)) {
            return false;
        }

        this._replying = true;
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
                this._replying = false;
                this._replyAdded = true;

                this._tm = this.$timeout(() => {
                    this._replyAdded = false;
                }, 4000);
            })
            .catch(err => {
                this.$log.debug(err);
                this.toastr.warning('Мда.. ошибочка');
                this._replying = false;
            });
    }

    delete() {
        if (this.isOwn || this.isMod) {
            this.SweetAlert.confirm(
                'Удалить вопрос?',
                '<img src="/assets/img/loliman-pistole.svg"/>',
                {
                    html: true,
                    customClass: 'no-icon',
                    confirmButtonText: 'Удалить'
                },
                (res) => {
                    if (res === true) {
                        this.Nail.deleteById({id: this.nail.id}).$promise.then(() => {
                            this.$rootScope.$emit('nail.deleted', String(this.nail.id));
                            this.nail._isDeleted = true;
                        }).catch(err => {
                            this.toastr.warning(err.data.error.message || 'Эмм.. а уже нельзя удалить');
                            this.$log.debug(err);
                        });
                    }
                });
        }
    }

    share() {
        this.ShareService.showShareDialog(null, this.nail);
    }
}
