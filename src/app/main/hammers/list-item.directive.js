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
     * @param  {any} Nail
     * @param  {any} Hammer
     * @param  {any} ShareService
     * @param  {any} toastr
     * @param  {any} $log
     */
    constructor(Nail, Hammer, ShareService, toastr, $log) {
        'ngInject';

        this.Nail = Nail;
        this.Hammer = Hammer;
        this.$log = $log;
        this.toastr = toastr;
        this.ShareService = ShareService;

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
