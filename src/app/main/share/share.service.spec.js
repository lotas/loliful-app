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

  it('Should show modal', inject((ShareService) => {
    spyOn(ShareService, '$modal').and.returnValue(0);
    ShareService.showDialog({url: '1'});
    expect(ShareService.$modal).toHaveBeenCalled();
  }));

  it('Should show warning', inject((ShareService, SweetAlert) => {
    spyOn(SweetAlert, 'warning').and.returnValue(1);
    ShareService.showDialog({});
    expect(SweetAlert.warning).toHaveBeenCalled();
  }));

});
