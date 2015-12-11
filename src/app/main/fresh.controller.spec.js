describe('Fresh Controller', () => {
  let vm;

  beforeEach(angular.mock.module('loliful'));

  beforeEach(inject(($controller, toastr, MainService) => {
    spyOn(MainService, 'getFresh').and.callFake(function() {
        return new Promise((resolve) => {
            resolve({
                nails: []
            });
        });
    });

    vm = $controller('FreshController');
  }));

  it('should loadFresh nails', inject((MainService) => {
      expect(vm.loadFresh).toEqual(jasmine.any(Function));
      expect(MainService.getFresh).toHaveBeenCalled();
  }));

  it('should have onAdd()', () => {
    expect(vm.onAdd).toEqual(jasmine.any(Function));

    vm.nails = [];
    spyOn(vm, 'onAdd').and.callThrough();
    vm.onAdd({one: true});

    expect(vm.onAdd).toHaveBeenCalled();
    expect(vm.nails.length).toEqual(1);
  });

});
