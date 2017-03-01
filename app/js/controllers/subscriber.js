app.controller("subscriberCtrl", function($scope, $http, $window, userService, CONSTANTS) {
	$scope.subscriberData = {};
	$scope.submitedStatus = {};
	$scope.complaintById = {};
	$scope.userData = {};
	$scope.complaintByDate = {};
	$scope.showLatestComplaintHistory = false;
	$scope.subscriberDataUpdated = {};
	$scope.todayStatusBySubscriber ={"status":"", "comments":""};
	$scope.actionStatus = {'success':false, 'info':false, 'failure':false};
	$scope.items = [{'itemId': 1, 'itemName': 'Not Delivered'}, {'itemId': 2, 'itemName': 'Late Delivered'}];
	$scope.filterHistory = "!";
	$scope.complaintByDate = {};
	$scope.lastOpenedComplaint = false;
		
	var init = function() {
		$scope.getDeliveryHistory();
		$scope.getTodayStatus();
		$scope.getLatestComplaint();
		$scope.userfn();
	};

	$scope.toggleShowLatestComplaintHistory= function() {
		$scope.showLatestComplaintHistory = !$scope.showLatestComplaintHistory;
	}

	$scope.abc = function(){

		$scope.todayStatusBySubscriber.status = 0; //User saying paper is delivered
		$scope.submitDeliveryStatus();
	}

	$scope.getLatestComplaint = function() {
		$http
		.get(CONSTANTS.URL_PREFIX+'/Subscriber/latestComplaint')
		.success(function(data, status, headers, config) {
			console.log(data, status, headers, config);
			$scope.subscriberData.recent_complaint = data;
		})
		.error(function(data, status, headers, config) {
			console.log(data, status, headers, config)
		});
	};
	
	$scope.escalate = function(item1, status) {
		$scope.actionObj ={'item':item1, 'compId':item1.comp_id, 'compDate':item1.delivery_time, "comments":"", 
				"status": status};
		//console.log($scope.actionObj, compIndex);
	}	

	$scope.submitNewStatus = function(){
		$http
	      .post(CONSTANTS.URL_PREFIX+'/Subscriber/submitNewStatus',$scope.actionObj)
	      .success(function (data, status, headers, config) {
	        //console.log(data, $window.sessionStorage);
	        $("#escalateModalClose").click();
	        $scope.getTodayStatus();
		$scope.getLatestComplaint();
		//TODO(nareshb): This is costly, Shoule be updating the one only got changed by this call.
	        $scope.getDeliveryHistory();
	      })
	      .error(function (data, status, headers, config) {
	      });
	}

	$scope.getLastestComplaintHistory = function(compId) {
		$scope.topHistoryCompId = compId;
		$scope.complaintById = {};
		if($scope.complaintById[compId]){
			$scope.complaintById[compId].show = !$scope.complaintById[compId].show;
			return;
		}
		$http
			.get(CONSTANTS.URL_PREFIX+'/Subscriber/getLatestComplaintHistory/'+compId)
			.success(function(data, status, headers, config) {
			$scope.complaintById[compId] = data;
			$scope.complaintById[compId].show = true
		})
		.error(function(data, status, headers, config) {
			console.log(data, status, headers, config)
		});
	};

	$scope.submitDeliveryStatus = function() {
		$http
		.post(CONSTANTS.URL_PREFIX+'/Subscriber/updateTodayStatus/',$scope.todayStatusBySubscriber)
		.success(function(data, status, headers, config) {
			console.log(typeof data, data, status, headers, config);
			$scope.actionStatus = $scope.todayStatusBySubscriber.status ==0 ? {'info': true} : {'success':true};
			$("#myModalClose").click();
			$scope.todayStatusBySubscriber.comments = "";
			$scope.getTodayStatus();
			$scope.getLatestComplaint();
			//TODO(nareshb): This is costly, Shoule be updating the one only got changed by this call.
	        	$scope.getDeliveryHistory();
		})
		.error(function(data, status, headers, config) {
			$scope.actionStatus = {'failure':true};
		});
	};

	$scope.getComplaintHistory = function(compId) {
		//$compId = dat;
		if($scope.complaintByDate[compId]){
			//$scope.lastOpenedComplaint && compId != $scope.lastOpenedComplaint && $scope.complaintByDate[$scope.lastOpenedComplaint].show = false;
			$scope.complaintByDate[compId].show = !$scope.complaintByDate[compId].show;
			//$scope.complaintByDate[compId].show && $scope.lastOpenedComplaint = compId;
			return;
		}
		
		$http
			.get(CONSTANTS.URL_PREFIX+'/Subscriber/getCompHistory/'+compId)
			.success(function(data, status, headers, config) {
			$scope.complaintByDate[compId] = data;
			$scope.complaintByDate[compId].show = true
		})
		.error(function(data, status, headers, config) {
			console.log(data, status, headers, config)
		});
	};

	$scope.getDeliveryHistory = function() {
		$http
		.get(CONSTANTS.URL_PREFIX+'/Subscriber/history')
		.success(function(data, status, headers, config) {
			console.log(data, status, headers, config);
			$scope.subscriberData.history = data;
			$scope.subscriberDataUpdated.history = angular.copy(data);
		})
		.error(function(data, status, headers, config) {
			console.log(data, status, headers, config)
		});
	};

	$scope.getTodayStatus = function() {
		$http
		.get(CONSTANTS.URL_PREFIX+'/Subscriber/todayStatus')
		.success(function(data, status, headers, config) {
			console.log(data, status, headers, config);
			$scope.subscriberData.today_status = data;
			$scope.subscriberDataUpdated.today_status = angular.copy(data);
		})
		.error(function(data, status, headers, config) {
			console.log(data, status, headers, config)
		});
	};

	$scope.userfn = function() {
		$http
		.get(CONSTANTS.URL_PREFIX+'/Subscriber/getUserData')
		.success(function(data, status, headers, config) {				
			console.log(data, status, headers, config);
			$scope.userData.users = data;
			//$scope.userDataStatus.users = angular.copy(data);
		})
		.error(function(data, status, headers, config) {
			console.log(data, status, headers, config)
		});
	};

	init();
});