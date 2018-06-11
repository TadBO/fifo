angular.module('app.filters', [])

	.filter("UseStatusFilter", function() {
		return function(useStatus) {
			if(useStatus == 1) {
				return "已启用";
			}
			if(useStatus == 0) {
				return "未启用";
			}
			return "-";
		}
	})

;