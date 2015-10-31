describe('controllers', () => {
  let vm;

  beforeEach(angular.mock.module('loliful'));

  beforeEach(inject(($controller, toastr) => {
    //spyOn(toastr, 'info').and.callThrough();

    vm = $controller('FreshController');
  }));

  it('should have a timestamp creation date', () => {
    //expect(vm.creationDate).toEqual(jasmine.any(Number));
  });

  it('should show a Toastr info and stop animation when invoke showToastr()', inject(toastr => {
    //vm.showToastr();
    //expect(toastr.info).toHaveBeenCalled();
    //expect(vm.classAnimation).toEqual('');
  }));

});
