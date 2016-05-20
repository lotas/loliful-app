const addPlaceholders = [
    'Once upon a dime...',
    'In a galaxy near, far, away..',
    'Seven is bigger than seven',
    'World is a placeholder for jokes',
    'This is going to be hilarious',
    'Remember, funny...',
    'Try to be smart'
];

export function NailAddDirective() {
    'ngInject';

    let directive = {
        restrict: 'E',
        templateUrl: 'app/main/nails/add.html',
        controller: NailAddController,
        controllerAs: 'nailAdd',
        scope: {
            onAdd: '&',
            onClose: '&'
        },
        replace: true,
        bindToController: true
    };

    return directive;
}

class NailAddController {
    constructor(Nail, toastr) {
        'ngInject';

        this.Nail = Nail;
        this.nail = {text: ''};
        this.toastr = toastr;

        this.placeholder = addPlaceholders[Math.floor(Math.random() * addPlaceholders.length)];
    }

    create() {
        this.saving = true;
        this.Nail.create(this.nail, res => {
            this.saving = false;
            // TODO: Send broadcast event
            if (angular.isFunction(this.onAdd)) {
                this.onAdd({nail: res});
            }
            this.nail.text = '';
        }, err => {
            if (err.status === 422) {
                this.toastr.error('Somebody already asked this question, sorry');
            } else {
                this.toastr.error('Oops, we cannot accept this text now, sorry.')
            }
            this.saving = false;
        });
    }
}
