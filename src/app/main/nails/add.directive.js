const addPlaceholders = [
    'Make them think',
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
        replace: true,
        scope: {
            onAdd: '&',
            onClose: '&'
        },
        bindToController: true
    };

    return directive;
}

export class NailAddController {
    constructor(Nail, toastr, $rootScope) {
        'ngInject';

        this.Nail = Nail;
        this.nail = {text: ''};
        this.toastr = toastr;
        this.$rootScope = $rootScope;

        this.placeholder = addPlaceholders[Math.floor(Math.random() * addPlaceholders.length)];
    }

    create() {
        if (!this.nail.text || this.nail.text.length < 2 || this.nail.text.length > 212) {
            return false;
        }
        this.saving = true;
        this.Nail.create(this.nail, res => {
            this.saving = false;
            this.$rootScope.$emit('nail.add.success', res);
            this.nail.text = '';
            this.toastr.success(`Added! Let's see how they reply.`);
        }, err => {
            if (err.status === 422) {
                this.toastr.error('Somebody already asked this question, sorry');
            } else {
                this.toastr.error('Oops, something went wrong, please try again')
            }
            this.saving = false;
            this.$rootScope.$emit('nail.add.error', err);
        });
    }
}
