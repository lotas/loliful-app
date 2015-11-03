export class ActivityController {
    /**
     *
     * @param {User} User
     * @param {Nail} Nail
     */
    constructor(User, Activity, $stateParams, $log) {
        'ngInject';

        this.User = User;
        this.Activity = Activity;
        this.$log = $log;
        this.type = $stateParams.type;

        this.types = {
            nails: 'Nails',
            hammers: 'Hammers',
            saves: 'Saves',
            likes: 'Likes'
        };

        this.panelClass = {
            nails: 'panel-info',
            hammers: 'panel-warning',
            saves: 'panel-success',
            likes: 'panel-danger'
        }[this.type];

        this.items = [];
        this.loadActivity();
    }

    loadActivity() {
        let map = {
            nails: 'recentNails',
            hammers: 'recentHammers',
            saves: 'recentSaves',
            likes: 'recentLikes'
        };
        if (typeof map[this.type] === 'undefined') {
            return false;
        }

        let self = this;
        this.Activity[map[this.type]]({}, function(res) {
            self.items = res[self.type];
        }, function(err) {
            this.$log.error(err);
        });
    }

}
