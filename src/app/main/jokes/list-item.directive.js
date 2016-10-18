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
    constructor(Hammer, ShareService, toastr, $log, AuthService) {
        'ngInject';

        this.Hammer = Hammer;
        this.$log = $log;
        this.toastr = toastr;
        this.ShareService = ShareService;

        this.isOwn = this.joke.userId && String(AuthService.getUserId()) === String(this.joke.userId);
    }

    report() {
        this.Hammer.prototype$report({
            id: this.joke.id
        }).$promise.then(() => {
            this.joke._isReported = true;
            this.toastr.success('Спасибо за помощь!');
        }).catch(err => {
            this.$log.debug(err);
            this.toastr.warning('Опа! Не получилось что-то');
        });
    }

    favorite() {
        this.joke.$favorite = this.joke.$favorite ? false : Date.now();
        this.Hammer.prototype$addToFav({
            id: this.joke.id
        }).$promise.then(() => {

        }).catch(err => {
            this.joke.$favorite = false;
            this.$log.debug(err);
            this.toastr.warning('Опа! Не получилось что-то');
        });
    }

    vote() {

        let method;
        if (this.joke.$votes) {
            method = 'prototype$unvote';
            this.joke.$votes = false;
        } else {
            method = 'prototype$vote';
            this.joke.$votes = true;
        }

        this.Hammer[method]({
            id: this.joke.id
        }).$promise.then(res => {
            this.joke.countVotes = res.countVotes;
        }).catch(err => {
            this.$log.debug(err);
            this.toastr.warning('Опа! Не получилось что-то');
        });
    }

    share() {
        this.ShareService.showShareDialog(this.joke);
    }
}
