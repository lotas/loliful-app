describe('Avatar directive', () => {
  var elm, scope;

  beforeEach(angular.mock.module('loliful'));
  beforeEach(angular.mock.module('loliful.components'));
  beforeEach(inject(($compile, $rootScope) => {
    elm = angular.element('<avatar user="{avatar: 1}" />');
    $compile(elm)($rootScope.$new());
    $rootScope.$digest();
    scope = elm.isolateScope();
  }));

  it('should be compiled', () => {
     expect(elm.html()).not.toEqual(null);
     expect(scope.user).toBeDefined();
     expect(scope.user.avatar).toEqual(1);
  });

  it('should have img', () => {
      expect(elm.html()).toContain('<img');
      expect(elm.html()).toContain('ng-src="');
  });

});
