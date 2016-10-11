describe('Share Service', () => {
    let $httpBackend;

    beforeEach(angular.mock.module('loliful'));

    beforeEach(inject(($injector) => {
        $httpBackend = $injector.get('$httpBackend');
    }));
    afterEach(() => {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('Should call getShareIntro()', inject((ShareService) => {
        $httpBackend.expect('GET', 'http://local.loliful.co/share/1').respond({url: 'url'});
        ShareService.getShareIntro(1);
        $httpBackend.flush();
    }));

    it('Should call addShareClick()', inject((ShareService) => {
        $httpBackend.expect('POST', 'http://local.loliful.co/share/1/fb').respond({});
        ShareService.addShareClick(1, 'fb');
        $httpBackend.flush();
    }));

    it('Should load share', inject((ShareService) => {
        $httpBackend.expect('GET', 'http://local.loliful.co/share/1/2').respond({url: 'url'});
        ShareService.showShareDialog({id: 2, nailId: 1});
        $httpBackend.flush();

    }));
    it('Should just show', inject(function(ShareService) {
        ShareService.showShareDialog({
            id: 1,
            _share: {}
        });
    }));

});
