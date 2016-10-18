const SWAL_DELAY = 100;
export class SweetAlert {
    constructor($timeout, $window) {
        'ngInject';

        this.$timeout = $timeout;
        this.$window = $window;
        this.swal = $window.swal;
    }

    adv(object) {
        this.$timeout(() => {
            this.swal(object);
        }, SWAL_DELAY);
    }

    timed(title, message, type, time) {
        this.$timeout(() => {
            this.swal( {
                title: title,
                text: message,
                type: type,
                timer: time
            });
        }, SWAL_DELAY);
    }

    success(title, message) {
        this.$timeout(() => {
            this.swal(title, message, 'success');
        }, SWAL_DELAY);
    }

    error(title, message) {
        this.$timeout(() => {
            this.swal(title, message, 'error');
        }, SWAL_DELAY);
    }

    warning(title, message) {
        this.$timeout(() => {
            this.swal(title, message, 'warning');
        }, SWAL_DELAY);
    }

    confirm(title, message, opts, callback) {
        if (typeof opts === 'function' && typeof callback === 'undefined') {
            callback = opts;
            opts = {};
        }
        this.$timeout(() => {
            this.swal(angular.extend({
                title: title,
                text: message,
                type: 'warning',
                showCancelButton: true,
                closeOnConfirm: true,
                cancelButtonText: 'Передумал',
                confirmButtonText: 'Да'
            }, opts), callback);
        }, SWAL_DELAY);
    }

    info(title, message) {
        this.$timeout(() => {
            this.swal(title, message, 'info' );
        }, SWAL_DELAY);
    }

    block(title, message, type) {
        this.$timeout(() => {
            this.swal({
                title: title,
                text: message,
                type: type || 'warning',
                showCancelButton: false,
                showConfirmButton: false,
                allowEscapeKey: false,
                closeOnCanceL: false,
                closeOnConfirm: false
            });
        }, SWAL_DELAY);
    }

}

