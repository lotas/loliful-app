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
    $httpBackend.expect('GET', 'http://local.loliful.co/fresh').respond({nails: []});
    MainService.getFresh();
    $httpBackend.flush();
  }));

  it('Should call getTop()', inject((MainService) => {
    $httpBackend.expect('GET', 'http://local.loliful.co/top').respond({jokes: []});
    MainService.getTop();
    $httpBackend.flush();
  }));

  it('Should call getNail()', inject((MainService) => {
    $httpBackend.expect('GET', 'http://local.loliful.co/nail/1').respond({nail: []});
    MainService.getNail(1);
    $httpBackend.flush();
  }));

  ['likes', 'saves', 'nails', 'hammers'].forEach(item => {
    it('Should call getActivity(' + item + ')', inject((MainService) => {
        $httpBackend.expect('GET', 'http://local.loliful.co/activity/' + item)
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


  it('_getQuery()', inject((MainService) => {
      expect(MainService._getQuery).toEqual(jasmine.any(Function));
      expect(MainService._getQuery()).toEqual('');
      expect(MainService._getQuery({})).toEqual('?');
      expect(MainService._getQuery({page: 1})).toEqual('?page=1');
  }));
});
