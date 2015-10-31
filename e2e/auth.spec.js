'use strict';

describe('Authorization', function() {
    var po;

    beforeEach(function() {
        browser.get('index.html');
        po = require('./login.po');
    });

    it('should automatically redirect to /login', function() {
        browser.waitForAngular();

        expect(po.submit.isPresent()).toBeTruthy();
        expect(browser.getLocationAbsUrl()).toMatch("/login");
    });

    describe('auth flow', function() {
        it('should login and go to main page and logout', function() {
            expect(po.username.isPresent()).toBeTruthy();
            expect(po.password.isPresent()).toBeTruthy();
            expect(po.submit.isPresent()).toBeTruthy();

            po.username.sendKeys('kontra@kontra.com');
            po.password.sendKeys('123123');
            browser.waitForAngular();

            po.submit.click().then(() => {
                browser.waitForAngular();

                expect(browser.getLocationAbsUrl()).toMatch('/fresh');
            });
        });

        it('should logout', function() {
            element(by.css('[ui-sref="logout"]')).click().then(function() {
                // page would be redirected back to login
                expect(browser.getLocationAbsUrl()).toMatch('/login');
            });
        });
    });
});
