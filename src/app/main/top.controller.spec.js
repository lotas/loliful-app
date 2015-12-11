describe('Top Controller', () => {
  let vm;

  beforeEach(angular.mock.module('loliful'));

  beforeEach(inject(($controller, toastr, MainService) => {
    spyOn(MainService, 'getTop').and.callFake(function() {
        return new Promise((resolve) => {
            resolve({
                jokes: []
            });
        });
    });

    vm = $controller('TopController');
  }));

  it('should getTop jokes', inject((MainService) => {
      expect(vm.loadTop).toEqual(jasmine.any(Function));
      expect(MainService.getTop).toHaveBeenCalled();
  }));

  it('should define jokes[]', () => {
    expect(vm.jokes).toEqual(jasmine.any(Array));
  });

});
