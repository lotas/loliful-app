export function NailListItemDirective() {
    'ngInject';

    let directive = {
        restrict: 'E',
        templateUrl: 'app/main/nails/list-item.html',
        controller: NailListItemController,
        controllerAs: 'nlm',
        scope: {
            nail: '=',
            showHammers: '='
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
     * @param {User} User
     * @param {toastr} toastr
     * @param {$log} log
     */
    constructor(Nail, User, toastr, $log) {
        'ngInject';

        this.Nail = Nail;
        this.User = User;
        this.$log = $log;
        this.toastr = toastr;
    }

    report() {
        this.Nail.prototype$report({id: this.nail.id}).$promise.then(() => {
            this.nail._isReported = true;
            this.toastr.success('Thank you for reporting!');
        }).catch(err => {
            this.$log.debug(err);
            this.toastr.warning('oh no!, something horrible happened');
        });
    }

    favorite() {
        let func = !this.nail._favorite ? 'prototype$addToFav' : 'prototype$removeFromFav';
        this.Nail[func]({id: this.nail.id}).$promise.then(() => {
            this.nail._favorite = !this.nail._favorite;
        }).catch(err => {
            this.$log.debug(err);
            this.toastr.warning('oh no!, something horrible happened');
        });
    }

    vote() {
        this.Nail.prototype$vote({id: this.nail.id}).$promise.then(res => {
            this.nail.countVotes = res.countVotes;
            this.nail._votes = true;
        }).catch(err => {
            this.$log.debug(err);
            this.toastr.warning('oh no!, vote failed');
        });
    }

    reply() {
        this.Nail.prototype$__create__hammers({id: this.nail.id}, this._hammer)
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
            })
            .catch(err => {
                this.$log.debug(err);
                this.toastr.warning('oops, I failed again');
            });
    }

}
