describe('Fresh Controller', () => {
  let vm;

  beforeEach(angular.mock.module('loliful'));

  beforeEach(inject(($controller, toastr, $rootScope, MainService) => {
    spyOn(MainService, 'getFresh').and.callFake(function () {
      return new Promise((resolve) => {
        resolve({
          nails: []
        });
      });
    });

    vm = $controller('FreshController', {
        $scope: $rootScope.$new()
    });
  }));

  it('should loadFresh nails', inject((MainService) => {
    expect(vm.loadFresh).toEqual(jasmine.any(Function));
    expect(MainService.getFresh).toHaveBeenCalled();
  }));

  it('should loadFresh nails: popular', inject((MainService) => {
    vm.type = 'popular';
    vm.loadFresh();
    expect(MainService.getFresh).toHaveBeenCalledWith({type: 'popular', limit: 20});
  }));

  it('should loadFresh nails: recent', inject((MainService) => {
    vm.type = 'recent';
    vm.loadFresh();
    expect(MainService.getFresh).toHaveBeenCalledWith({type: 'recent', limit: 20});
  }));

  it('should have onAdd()', () => {
    expect(vm.onAdd).toEqual(jasmine.any(Function));

    vm.nails = [];
    spyOn(vm, 'onAdd').and.callThrough();
    vm.onAdd({ one: true });

    expect(vm.onAdd).toHaveBeenCalled();
    expect(vm.nails.length).toEqual(1);
  });

  it('should loadMore()', inject((MainService) => {
    expect(vm.loadMore).toEqual(jasmine.any(Function));
    expect(vm.page).toEqual(1);

    vm.loadMore();
    expect(MainService.getFresh).toHaveBeenCalled();
    expect(vm.$loading).toEqual(true);
  }));

});
