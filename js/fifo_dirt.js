angular.module('app.directives', [])

.directive('repeatFinish', function($timeout) {
	return {
		restrict : 'A',
		link : function(scope, elem, attr) {
			if (scope.$last === true) {
				$timeout(function() {
					scope.$emit('repeatFinishCallback');
				}, 100);
			}
		}
	}
});