export function JokeListItemDirective() {
    'ngInject';

    let directive = {
        restrict: 'E',
        templateUrl: 'app/main/jokes/list-item.html',
        controller: JokeListItemController,
        controllerAs: 'jli',
        scope: {
            joke: '='
        },
        bindToController: true,
        replace: true
    };

    return directive;
}

class JokeListItemController {
    /**
     * @param  {any} Hammer
     * @param  {any} ShareService
     * @param  {any} toastr
     * @param  {any} $log
     */
    constructor(Hammer, ShareService, toastr, $log) {
        'ngInject';

        this.Hammer = Hammer;
        this.$log = $log;
        this.toastr = toastr;
        this.ShareService = ShareService;
    }

    report() {
        this.Hammer.prototype$report({id: this.joke.id}).$promise.then(() => {
            this.joke._isReported = true;
            this.toastr.success('Thank you for reporting!');
        }).catch(err => {
            this.$log.debug(err);
            this.toastr.warning('oh no!, something horrible happened');
        });
    }

    favorite() {
        this.Hammer.prototype$addToFav({id: this.joke.id}).$promise.then(() => {
            this.joke._favorite = true;
        }).catch(err => {
            this.$log.debug(err);
            this.toastr.warning('oh no!, something horrible happened');
        });
    }

    vote() {
        this.Hammer.prototype$vote({id: this.joke.id}).$promise.then(res => {
            this.joke.countVotes = res.countVotes;
            this.joke._votes = true;
        }).catch(err => {
            this.$log.debug(err);
            this.toastr.warning('oh no!, vote failed');
        });
    }

    share() {
        if (!this.joke._share) {
            this.ShareService.getShare(this.joke.id).then(res => {
                 this.joke._share = res;
                 this.ShareService.showDialog(res);
            }).catch(err => {
                this.$log.debug(err);
                 this.toastr.warning('Oh boy... God knows how hard I try, but it failed this time');
            });
        } else {
            this.ShareService.showDialog(this.joke._share);
        }
    }
}
