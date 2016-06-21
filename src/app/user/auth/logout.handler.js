export function logoutHandler(User, Storage, $window, toastr) {
    'ngInject';

    toastr.info('See ya!');
    User.logout(() => {
        Storage.clearAll();
        $window.location.replace('/');
    });
}
