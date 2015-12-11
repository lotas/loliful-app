describe('Activity Controller', () => {
  let vm;

  beforeEach(angular.mock.module('loliful'));

  beforeEach(inject(($controller, toastr, MainService) => {
    vm = $controller('ActivityController');
    spyOn(MainService, 'getActivity').and.callFake(function(type) {
        return new Promise((resolve) => {
            resolve({
                [type]: []
            });
        });
    });
  }));

  it('should not getActivity of invalid type', inject((MainService) => {
    vm.type = 'invalidType';
    let result = vm.loadActivity();
    expect(result).toBeFalsy();
    expect(MainService.getActivity).not.toHaveBeenCalled();
  }));

  it('should getActivity of valid type', inject((MainService) => {
    vm.type = 'nails';
    let result = vm.loadActivity();
    expect(result).toEqual(undefined);
    expect(MainService.getActivity).toHaveBeenCalled();
  }));

  it('should enumerate supported types', () => {
    expect(vm.types.nails).toBeDefined();
    expect(vm.types.hammers).toBeDefined();
    expect(vm.types.saves).toBeDefined();
    expect(vm.types.likes).toBeDefined();
  });


});
