export function HammerListItemDirective() {
    'ngInject';

    let directive = {
        restrict: 'E',
        templateUrl: 'app/main/hammers/list-item.html',
        controller: HammerListItemController,
        controllerAs: 'hli',
        scope: {
            hammer: '='
        },
        bindToController: true,
        replace: true
    };

    return directive;
}

class HammerListItemController {
    /**
     * @param  {Nail} Nail
     * @param  {Hammer} Hammer
     * @param  {ShareService} ShareService
     * @param  {AuthService} AuthService
     * @param  {SweetAlert} SweetAlert
     * @param $timeout
     * @param $rootScope
     * @param  {any} toastr
     * @param  {any} $log
     */
    constructor(Nail, Hammer, ShareService, AuthService, SweetAlert, $timeout, $rootScope, toastr, $log) {
        'ngInject';

        this.Nail = Nail;
        this.Hammer = Hammer;
        this.$log = $log;
        this.toastr = toastr;
        this.ShareService = ShareService;
        this.SweetAlert = SweetAlert;
        this.$rootScope = $rootScope;
        this.$timeout = $timeout;

        this.isOwn = this.hammer.userId && String(AuthService.getUserId()) === String(this.hammer.userId);
        this.isMod = AuthService.isMod();
    }

    report() {
        this.SweetAlert.confirm(
            'Пожаловаться',
            `<img src="/assets/img/loliman-broken-helmet.svg"/>
            <p>Вы собрались отметить эту шутку как неадекватную</p>`,
            {
                customClass: 'no-icon',
                html: true,
                confirmButtonText: 'Отметить'
            },
            (res) => {
            if (res === true) {
                this.Hammer.prototype$report({id: this.hammer.id}).$promise.then(() => {
                    this.hammer._isReported = true;
                    this.toastr.success('Спасибо за помощь!');
                }).catch(err => {
                    this.$log.debug(err);
                    this.toastr.warning('Опа! Не получилось в этот раз');
                });
            }
        });
    }

    favorite() {
        this.Hammer.prototype$addToFav({id: this.hammer.id}).$promise.then(() => {
            this.hammer._favorite = true;
        }).catch(err => {
            this.$log.debug(err);
            this.toastr.warning('Ухты! Что-то не получилось');
        });
    }

    vote() {
        if (this.isOwn) {
            this.$log.warn('Oh why would you wanna do this..');
            return false;
        }

        let method;
        if (this.hammer.$votes) {
            method = 'prototype$unvote';
            this.hammer.$votes = false;
        } else {
            method = 'prototype$vote';
            this.hammer.$votes = true;
        }

        this.Hammer[method]({
            id: this.hammer.id
        }).$promise.then(res => {
            this.hammer.countVotes = res.countVotes;
        }).catch(err => {
            this.$log.debug(err);
            this.toastr.warning('Блин! Не получилось');
        });
    }

    delete() {
        if (this.isOwn || this.isMod) {
            this.SweetAlert.confirm(
                'Удалить ответ?',
                '',
                {
                    customClass: 'no-icon',
                    confirmButtonText: 'Удалить'
                },
                (res) => {
                if (res === true) {
                    this.Hammer.deleteById({id: this.hammer.id}).$promise.then(() => {
                        this.$rootScope.$emit('hammer.deleted', String(this.hammer.id));
                        this.hammer._isDeleted = true;
                    }).catch(err => {
                        this.toastr.warning(err.data.error.message || 'Опа! Не получилось удалить');
                        this.$log.debug(err);
                    });
                }
            });
        }
    }

    share() {
       this.ShareService.showShareDialog(this.hammer);
    }

    startEdit() {
        this._prevValue = this.hammer.text;
        this.isEdit = true;
    }
    resetEdit() {
        this.hammer.text = this._prevValue;
        this.isEdit = false;
    }
    edit() {
        if (this._prevValue === this.hammer.text) {
            this.isEdit = false;
            return;
        }
        this._saving = true;
        this.Hammer.prototype$updateAttributes({
            id: this.hammer.id
        }, {
            text: this.hammer.text
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
                this.toastr.warning('Опа! Опять что-то не получилось');
                this.$log.debug(err);
            });
    }
}
