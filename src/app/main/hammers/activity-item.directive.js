export function HammerActivityItemDirective() {
    'ngInject';

    let directive = {
        restrict: 'E',
        templateUrl: 'app/main/hammers/activity-item.html',
        controller: HammerActivityItemController,
        controllerAs: 'hai',
        scope: {
            hammer: '='
        },
        bindToController: true,
        replace: true
    };

    return directive;
}

class HammerActivityItemController {
    /**
     * @param  {any} Nail
     * @param  {any} Hammer
     * @param  {any} $log
     */
    constructor(Nail, Hammer, $log) {
        'ngInject';

        this.Nail = Nail;
        this.Hammer = Hammer;
        this.$log = $log;
    }

    vote() {
        this.hammer._votes = true;
        this.Hammer.prototype$vote({
            id: this.hammer.id
        }).$promise.then(res => {
            this.hammer.countVotes = res.countVotes;
        }).catch(err => {
            this.hammer._votes = false;
            this.$log.debug(err);
            this.toastr.warning('oh no!, vote failed');
        });
    }
}
