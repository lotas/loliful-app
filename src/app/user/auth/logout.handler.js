export function logoutHandler(User, Storage, $window, toastr) {
    'ngInject';

    toastr.info('Пока, пока!');
    User.logout(() => {
        Storage.clearAll();
        $window.location.replace('/');
    });
}
