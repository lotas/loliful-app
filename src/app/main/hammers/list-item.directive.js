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

        this.isOwn = AuthService.getUserId() === this.hammer.$user.id;

        this.dropdown = [{
            "text": "Report Abuse",
            "click": "hli.report()"
        }];
    }

    report() {
        this.Hammer.prototype$report({id: this.hammer.id}).$promise.then(() => {
            this.hammer._isReported = true;
            this.toastr.success('Thank you for reporting!');
        }).catch(err => {
            this.$log.debug(err);
            this.toastr.warning('oh no!, something horrible happened');
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
        this.Hammer.prototype$vote({id: this.hammer.id}).$promise.then(res => {
            this.hammer.countVotes = res.countVotes;
            this.hammer._votes = true;
        }).catch(err => {
            this.$log.debug(err);
            this.toastr.warning('oh no!, vote failed');
        });
    }

    delete() {
        if (this.isOwn) {
            this.SweetAlert.confirm('Remove', 'Is it this bad? Okay to remove it?', (res) => {
                if (res === true) {
                    this.Hammer.deleteById({id: this.hammer.id}).$promise.then(response => {
                        this.hammer.$user = undefined;
                        this.hammer.text = '[removed]';
                    }).catch(err => {
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
