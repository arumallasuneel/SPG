app.controller("publisherCtrl", function($scope, $http, $window, CONSTANTS) {
	$scope.DeliveredData = {};
	$scope.selectedDeliveryBoyId = "!";
	$scope.selectedAgentId = "!";
	$scope.NotDeliveredData = {};
	$scope.NotUpdatedData = {};
	$scope.agentData = {};
	$scope.hierarchyDataList = {};
	$scope.complaintData = {};
	$scope.agentsList = {};
	$scope.deliveryBoysList = {};
	$scope.actionObj ={'compId':0, "action":"", "comments":""};
	$scope.topBtn = 0;
	$scope.complaintResolution = "!";
	$scope.complaintHistoy = {};
	$scope.agentIdTemp = 3;
	$scope.prevExpCompId = null;
	var init = function() {
		$scope.getDeliveredData();
		$scope.getNotDeliveredData();
		$scope.getNotUpdatedData();
		$scope.getDayComplaint();
		$scope.getAgentList();
	};
	$scope.getDeliveredData = function() {
		$http
		.get(CONSTANTS.URL_PREFIX+'/Publisher/getDeliveredList/')
		.success(function(data, status, headers, config) {
			//console.log(data, status, headers, config);
			$scope.DeliveredData = data;
		})
		.error(function(data, status, headers, config) {
			//console.log(data, status, headers, config)
		});
	};

	$scope.getNotDeliveredData = function() {
		$http
		.get(CONSTANTS.URL_PREFIX+'/Publisher/getNotDeliveredList/')
		.success(function(data, status, headers, config) {
			$scope.NotDeliveredData = data;
		})
		.error(function(data, status, headers, config) {
		});
	};

	$scope.getNotUpdatedData = function() {
		$http
		.get(CONSTANTS.URL_PREFIX+'/Publisher/getNotUpdatedList/')
		.success(function(data, status, headers, config) {
			$scope.NotUpdatedData = data;
		})
		.error(function(data, status, headers, config) {
		});
	};

	$scope.getHierarchyBySubcriberId = function(subscriberId) {
		$scope.hierarchyDataList = {};
		if($scope.hierarchyDataList[subscriberId]){
			$scope.hierarchyDataList[subscriberId].show = !$scope.hierarchyDataList[subscriberId].show;
			return;
		}
		$http
		.get(CONSTANTS.URL_PREFIX+'/Publisher/getHierarchyByID/'+subscriberId)
		.success(function(data, status, headers, config) {
			$scope.hierarchyDataList[subscriberId] = data;
			$scope.hierarchyDataList[subscriberId].show = true;
		})
		.error(function(data, status, headers, config) {
		});
	};

	$scope.getComplaintDetailsBySubcriberId = function(subscriberId) {
		//alert("Hi");
		if($scope.agentData[subscriberId]){
			$scope.agentData[subscriberId].show = !$scope.agentData[subscriberId].show;
			return;
		}
		$http
		.get(CONSTANTS.URL_PREFIX+'/Publisher/getData/'+subscriberId)
		.success(function(data, status, headers, config) {
			//console.log(typeof data, data, status, headers, config);
			$scope.agentData[subscriberId] = data;
			$scope.agentData[subscriberId].show = true;
		})
		.error(function(data, status, headers, config) {
			//console.log(data, status, headers, config)
		});
	};

	$scope.getDayComplaint = function() {
		$http
		.get(CONSTANTS.URL_PREFIX+'/Publisher/getComplaints/')
		.success(function(data, status, headers, config) {
			console.log(typeof data, data, status, headers, config);
			$scope.complaintData = data;
			if(data.user_type == 3) {
				$scope.selectedAgentId = data.user_id;
				$scope.getDelBoyList();
			}
		})
		.error(function(data, status, headers, config) {
			//console.log(data, status, headers, config)
		});
	};
	
	$scope.getAgentList = function(){
		$http
		.get(CONSTANTS.URL_PREFIX+'/Publisher/getAgentsList/')
		.success(function(data, status, headers, config) {
		$scope.agentsList = data;
		})
		.error(function(data, status, headers, config) {
		});
	}

	$scope.filterAgent = function(selectedAgent){
		/*$http
		.get(CONSTANTS.URL_PREFIX+'/Publisher/filterAgentsList/')
		.success(function(data, status, headers, config) {
			//console.log(data, status, headers, config);
		$scope.agentsList = data;
		})
		.error(function(data, status, headers, config) {
			//console.log(data, status, headers, config)
		});*/
		//console.log(selectedAgent);
		$scope.searchAgent=selectedAgent;
	}

	$scope.actOnComplaint = function(item){
		$scope.actionObj ={'item':item, 'compId':item.comp_id, "action":"", "comments":""};
		//console.log($scope.actionObj, compIndex);

	}	

	$scope.submitNewStatus = function(){
		$http
	      .post(CONSTANTS.URL_PREFIX+'/Publisher/submitNewStatus',$scope.actionObj)
	      .success(function (data, status, headers, config) {
	        //console.log(data, $window.sessionStorage);
	        $("#myModalClose").click();
	      })
	      .error(function (data, status, headers, config) {
	      });
	}

	//method to get complaint history
	$scope.getComplaintHistory = function(compId) {
		if($scope.complaintHistoy[compId]){
			$scope.complaintHistoy[compId].show = !$scope.complaintHistoy[compId].show;
			return;
		}
		
		$http
			.get(CONSTANTS.URL_PREFIX+'/Publisher/getCompHistory/'+compId)
			.success(function(data, status, headers, config) {
			$scope.complaintHistoy[compId] = data;
			$scope.complaintHistoy[compId].show = true
		})
		.error(function(data, status, headers, config) {
			console.log(data, status, headers, config)
		});
	};

	$scope.getDelBoyList = function(){
		$http
		.get(CONSTANTS.URL_PREFIX+'/Publisher/getDelBoyListByAgentId/'+$scope.selectedAgentId)
		.success(function(data, status, headers, config) {
			console.log(data, status, headers, config);
		$scope.deliveryBoysList = data;
		$scope.selectedDeliveryBoyId = "!";
		})
		.error(function(data, status, headers, config) {
			console.log(data, status, headers, config)
		});
	};

	init();
});