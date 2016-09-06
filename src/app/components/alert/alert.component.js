export const alertComponent = {
    templateUrl: 'app/components/alert/alert.html',
    bindings: {
        type: '<',
        icon: '@',
        text: '@',
        link: '@'
    },
    controller: function() {
        var ctrl = this;

        ctrl.class = `alert-${this.type}`;

        if (!ctrl.icon) {
            switch (this.type) {
                case 'danger':
                    ctrl.icon = 'icon-loliful-icon-warning';
                    break;
                case 'info':
                case 'success':
                    ctrl.icon = 'icon-loliful-icon-checkmark';
                    break;
                case 'warning':
                default:
                    ctrl.icon = 'icon-loliful-icon-refresh';
                    break;
            }
        }
    }
};
