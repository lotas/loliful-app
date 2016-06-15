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
     * @param  {any} toastr
     * @param  {any} $log
     */
    constructor(Nail, Hammer, ShareService, AuthService, SweetAlert, toastr, $log) {
        'ngInject';

        this.Nail = Nail;
        this.Hammer = Hammer;
        this.$log = $log;
        this.toastr = toastr;
        this.ShareService = ShareService;
        this.SweetAlert = SweetAlert;

        this.isOwn = this.hammer.userId && String(AuthService.getUserId()) === String(this.hammer.userId);
    }

    report() {
        this.SweetAlert.confirm(
            'Report abuse',
            `<img src="/assets/img/loliman-broken-helmet.svg"/>
            <p>You are about to flag this joke inappropriate. Please confirm.</p>`,
            {
                customClass: 'no-icon',
                html: true
            },
            (res) => {
            if (res === true) {
                this.Hammer.prototype$report({id: this.hammer.id}).$promise.then(() => {
                    this.hammer._isReported = true;
                    this.toastr.success('Thank you for reporting!');
                }).catch(err => {
                    this.$log.debug(err);
                    this.toastr.warning('oh no!, something horrible happened');
                });
            }
        });
    }

    favorite() {
        this.Hammer.prototype$addToFav({id: this.hammer.id}).$promise.then(() => {
            this.hammer._favorite = true;
        }).catch(err => {
            this.$log.debug(err);
            this.toastr.warning('oh no!, something horrible happened');
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
            this.toastr.warning('oh no!, vote failed');
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
                    this.Hammer.deleteById({id: this.hammer.id}).$promise.then(response => {
                        this.$log.debug(response);
                        this.hammer = null;
                    }).catch(err => {
                        this.toastr.warning(err.data.error.message || 'Oops, you cannot delete this');
                        this.$log.debug(err);
                    });
                }
            });
        }
    }

    share() {
        if (!this.hammer._share) {
            this.ShareService.getShare(this.hammer.id).then(res => {
                this.hammer._share = res;
                this.ShareService.showDialog(res);
            }).catch(err => {
                this.$log.debug(err);
                this.toastr.warning('Oh boy... God knows how hard I try, but it failed this time');
            });
        } else {
            this.ShareService.showDialog(this.hammer._share);
        }
    }
}
