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

  it('Should call getShare()', inject((ShareService) => {
    $httpBackend.expect('GET', 'http://local.loliful.io/share/1').respond({url: 'url'});
    ShareService.getShare(1);
    $httpBackend.flush();
  }));

  it('Should load share', inject((ShareService) => {
    $httpBackend.expect('GET', 'http://local.loliful.io/share/1').respond({url: 'url'});
    ShareService.showShareDialog({id: 1});
    $httpBackend.flush();

  }));
  it('Should just show', inject(function(ShareService) {
    ShareService.showShareDialog({
        id: 1,
        _share: {}
    });
  }));

});
