app.controller("deliveryBoyCtrl", function($scope, $http, $window, CONSTANTS) {
	$scope.subscriberData = {};
	
	$scope.userData = {};
	$scope.subscriberStatusUpdated = {};
	$scope.filterStatusBy = "!";
	$scope.selectedItems = [];
	$scope.selectedAll = {};
	$scope.actionStatus = {'success':false, 'info':true,};
	$scope.items = [{'itemId': 0, 'itemName': 'Delivered'},{'itemId': 1, 'itemName': 'Not Delivered'}, {'itemId': 2, 'itemName': 'Late Delivered'}];


	var init = function() {
		$scope.testfn();
		$scope.userfn();
	};

	$scope.subscriberStatusUpdated.subscribers = [
	   {value:'', selected:false}
    ];

          $scope.toggleSelectAll = function() {
            $scope.subscriberStatusUpdated.subscribers.forEach(function(item){
              item.selected = !item.selected;

            });
          };
          $scope.selectAll = function() {
            $scope.subscriberStatusUpdated.subscribers.forEach(function(item){
              item.selected = true;
            });
          };
          $scope.unSelectAll = function() {
            $scope.subscriberStatusUpdated.subscribers.forEach(function(item){
              item.selected = false;
            });
          };

    $scope.updateDeliveryStatus = function(actionID){
    	$scope.selectedItems = [];
		$scope.subscriberStatusUpdated.subscribers.forEach(function(item){
              item.selected == true && $scope.selectedItems.push(item.subscriber_id);
           });
		if (!$scope.selectedItems.length) {
			//alert("Please Select atleast one item");
			$("#myModal").modal();
			return;
		}

    	$http
		.post(CONSTANTS.URL_PREFIX+'/deliveryboy/updateDeliveryStatus',{'actionID': actionID, 'selectedItems': $scope.selectedItems})
		.success(function(data, status, headers, config) {
			console.log(data, status, headers, config);
			$scope.actionStatus = $scope.selectedItems.status ==0 ? {'info': true} : {'success':true};
			$("#myModalClose").click();

			$scope.testfn();

		})
		.error(function(data, status, headers, config) {
			console.log(data, status, headers, config)
		});
	};


	$scope.testfn = function() {
		//alert("Please success data");
		$http
		.get(CONSTANTS.URL_PREFIX+'/deliveryboy/getSubscriberData')
		.success(function(data, status, headers, config) {
			console.log(data, status, headers, config);
			$scope.subscriberData = data;
			$scope.subscriberStatusUpdated = angular.copy(data);
		})
		.error(function(data, status, headers, config) {
			console.log(data, status, headers, config)
		});
	};


	$scope.userfn = function() {
		$http
		.get(CONSTANTS.URL_PREFIX+'/deliveryboy/getUserData')
		.success(function(data, status, headers, config) {				
			console.log(data, status, headers, config);
			$scope.userData.users = data;
		})
		.error(function(data, status, headers, config) {
			console.log(data, status, headers, config)
		});
	};



	$scope.filterStatus = function(id){
		if(id == -1) {
			$scope.subscriberStatusUpdated.subscribers = $scope.subscriberData.subscribers;
			return;
		}
		var Mapid = {"0": "Not Updated", "1": "Delivered", "2": "Not Delivered", "3":"Late Delivered"}

			$scope.subscriberStatusUpdated.subscribers = [];
			$.each($scope.subscriberData.subscribers, function(index, data){
				console.log(data, data.boy_delivery_status == Mapid[id], id);
				if(data.boy_delivery_status == Mapid[id]) 
				{
					console.log(data);
					$scope.subscriberStatusUpdated.subscribers.push(data);
				}
			});
	};
	init();
});
