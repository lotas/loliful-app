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
     *
     * @param {Nail} Nail
     * @param {Nail} toastr
     */
    constructor(Nail, Hammer, toastr, $log) {
        'ngInject';

        this.Nail = Nail;
        this.Hammer = Hammer;
        this.$log = $log;
        this.toastr = toastr;
    }

    report() {
        this.Hammer.prototype$report(this.hammer).$promise.then(res => {
            this.hammer._isReported = true;
            this.toastr.success('Thank you for reporting!');
        }).catch(err => {
            this.toastr.warning('oh no!, something horrible happened');
        });
    }

    favorite() {
        this.Hammer.prototype$addToFav(this.hammer).$promise.then(res => {
            this.hammer._isFav = true;
        }).catch(err => {
            this.toastr.warning('oh no!, something horrible happened');
        });
    }

    vote() {
        this.Hammer.prototype$vote(this.hammer).$promise.then(res => {
            this.nail.countVotes = res.countVotes;
            this.nail._isVoted = true;
        }).catch(err => {
            this.toastr.warning('oh no!, vote failed');
        });
    }

}
