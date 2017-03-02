function ContactCtrl($scope, $http, $window, userService, CONSTANTS) {
    $scope.ContactStatus = { 'username': '', 'email': '', 'description': '' };

    $scope.submitContactStatus = function() {
        //alert('please show data');
        $http
            .post(CONSTANTS.URL_PREFIX + '/Contactus/submitContactStatus/', $scope.ContactStatus)

        .success(function(data, status, headers) {
                console.log(data, status, headers);
            })
            .error(function(data, status, headers) {});
    }
}

export default {
    name: 'ContactCtrl',
    fn: ContactCtrl
};


// app.controller('ContactCtrl', function($scope, $http, $window, userService, CONSTANTS) {

//     $scope.ContactStatus = { 'username': '', 'email': '', 'description': '' };

//     $scope.submitContactStatus = function() {
//             //alert('please show data');
//             $http
//                 .post(CONSTANTS.URL_PREFIX + '/Contactus/submitContactStatus/', $scope.ContactStatus)

//             .success(function(data, status, headers, config) {
//                     console.log(data, status, headers, config);
//                 })
//                 .error(function(data, status, headers, config) {});
//         }
//         //init();
// });