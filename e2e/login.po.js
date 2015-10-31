'use strict';

var LoginPage = function() {
    this.username = element(by.model('vm.username'));
    this.password = element(by.model('vm.password'));
    this.submit = element(by.css('input[type=submit]'));
};

module.exports = new LoginPage();
