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

  it('should getTop jokes', inject((MainService, $timeout) => {
      expect(vm.loadTop).toEqual(jasmine.any(Function));
      $timeout.flush();
      expect(MainService.getTop).toHaveBeenCalled();
  }));

  it('should define jokes[]', () => {
    expect(vm.jokes).toEqual(jasmine.any(Array));
  });

  it('should loadMore()', inject((MainService) => {
      expect(vm.loadMore).toEqual(jasmine.any(Function));
      expect(vm.page).toEqual(1);

      vm.loadMore();
      expect(MainService.getTop).toHaveBeenCalled();
      expect(vm.$loading).toEqual(true);
  }));

});
