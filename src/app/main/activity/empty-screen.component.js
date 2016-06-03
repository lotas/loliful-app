export const activityEmptyScreenComponent = {
    templateUrl: 'app/main/activity/empty-screen.html',
    bindings: {
        type: '<'
    },
    controller: function() {
        var ctrl = this;

        ctrl.img = '/assets/img/empty-card.png';
        ctrl.actionName = 'Take me to intros';
        ctrl.topText = false;

        ctrl.$onInit = onInit;

        function onInit() {
            if (ctrl.type === 'nails') {
                ctrl.img = '/assets/img/loliman-chill.svg';
                ctrl.topText = 'Intros you create will appear here';
            } else if (ctrl.type === 'hammers') {
                ctrl.img = '/assets/img/loliman-jump.svg';
                ctrl.actionName = 'Add Intro';
                ctrl.topText = 'Outros you create will appear here';
            }
        }
    }
};
