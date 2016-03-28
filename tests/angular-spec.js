angular.module('app', [])
.controller('TestController', function($scope){
	$scope.greet = 'Hello there!';
});

describe('TestController', function(){

	beforeEach(module('app'));

	var $controller;

	beforeEach(inject(function(_$controller_){
		$controller = _$controller_;
	}));

	it('should test $scope.greet', function(){
		var $scope = {};
		var controller = $controller('TestController', {$scope: $scope });

		expect($scope.greet).toBe('Hello there!');

	});


});