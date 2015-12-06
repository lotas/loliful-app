export class ActivityController {

    /**
     * @param  {User} User
     * @param  {MainService} MainService
     * @param  {$stateParams} $stateParams
     * @param  {$log} $log
     */
    constructor(User, MainService, $stateParams, $log) {
        'ngInject';

        this.User = User;
        this.MainService = MainService;
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
        if (typeof this.types[this.type] === 'undefined') {
            return false;
        }

        this.MainService.getActivity(this.type).then((data) => {
            this.items = data[this.type];
        }).catch((err) => {
            this.$log.error(err);
        });
    }

}
