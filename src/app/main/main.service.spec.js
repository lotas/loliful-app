describe('Main Service', () => {
  let $httpBackend;

  beforeEach(angular.mock.module('loliful'));

  beforeEach(inject(($injector) => {
     $httpBackend = $injector.get('$httpBackend');
  }));
  afterEach(() => {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
 });

  it('Should call getFresh()', inject((MainService) => {
    $httpBackend.expect('GET', 'http://local.loliful.io/fresh').respond({nails: []});
    MainService.getFresh();
    $httpBackend.flush();
  }));

  it('Should call getTop()', inject((MainService) => {
    $httpBackend.expect('GET', 'http://local.loliful.io/top').respond({jokes: []});
    MainService.getTop();
    $httpBackend.flush();
  }));

  it('Should call getNail()', inject((MainService) => {
    $httpBackend.expect('GET', 'http://local.loliful.io/nail/1').respond({nail: []});
    MainService.getNail(1);
    $httpBackend.flush();
  }));

  ['likes', 'saves', 'nails', 'hammers'].forEach(item => {
    it('Should call getActivity(' + item + ')', inject((MainService) => {
        $httpBackend.expect('GET', 'http://local.loliful.io/activity/' + item)
                    .respond({[item]: []});
        MainService.getActivity(item);
        $httpBackend.flush();
    }));
  });

  it('getActivity() Should throw exception for unknown type', inject((MainService) => {
      expect(() => {
        MainService.getActivity('fake');
      }).toThrow(new Error('Unknown type fake'));
  }));
});
