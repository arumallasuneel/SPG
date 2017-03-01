//this is used to parse the profile
function url_base64_decode(str) {
  var output = str.replace('-', '+').replace('_', '/');
  switch (output.length % 4) {
    case 0:
      break;
    case 2:
      output += '==';
      break;
    case 3:
      output += '=';
      break;
    default:
      throw 'Illegal base64url string!';
  }
  return window.atob(output); //polifyll https://github.com/davidchambers/Base64.js
}
var serialize = function(obj, prefix) {
  var str = [];
  for(var p in obj) {
    if (obj.hasOwnProperty(p)) {
      var k = prefix ? prefix + "[" + p + "]" : p, v = obj[p];
      str.push(typeof v == "object" ?
        serialize(v, k) :
        encodeURIComponent(k) + "=" + encodeURIComponent(v));
    }
  }
  return str.join("&");
};
var app = angular.module("onCycle", ['ngCookies']);
app.constant("CONSTANTS", {'URL_PREFIX': '/CI_SuparnaGlobal'});
app.factory('authInterceptor', function ($rootScope, $q, $window) {
  return {
    request: function (config) {
      config.headers = config.headers || {};
      if ($window.sessionStorage.token) {
        config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
        config.headers.Userid = $window.sessionStorage.token;
      }
      console.log(config,$window.sessionStorage.token);
      return config;
    },
    responseError: function (rejection) {
      if (rejection.status === 401) {
        // handle the case where the user is not authenticated
      }
      return $q.reject(rejection);
    }
  };
});

app.service('userService', function() {
    this.users = ['John', 'James', 'Jake'];
    var init = function() {
    localStorage.token = localStorage.token || "token";
   }
    init();
});

app.config(function ($httpProvider) {
  $httpProvider.interceptors.push('authInterceptor');
});
app.controller('UserCtrl', function ($scope, $http, $window, $cookies, CONSTANTS) {
  $scope.username = "";
  $scope.password = "";
  $scope.isAuthenticated = false;
  $scope.welcome = '';
  $scope.message = '';
  $scope.userLandingPage = ['', '/subscriber', '/deliveryboy', '/agent', '/publisher'];

  $scope.submit = function () {
    $http
      .post(CONSTANTS.URL_PREFIX+'/User/authenticate', {username: $scope.username, password: $scope.password})
      .success(function (data, status, headers, config) {
        $window.sessionStorage.token = data.token;
        $cookies.put('Userid', data.token+"".trim() , {'path': '/'});
        console.log(data, $window.sessionStorage);
        $scope.isAuthenticated = true;
        window.location = CONSTANTS.URL_PREFIX + $scope.userLandingPage[data.user.user_type];
        /*var encodedProfile = data.token.split('.')[1];
        var profile = JSON.parse(url_base64_decode(encodedProfile));
        $scope.welcome = 'Welcome ' + profile.first_name + ' ' + profile.last_name;*/
      })
      .error(function (data, status, headers, config) {
        // Erase the token if the user fails to log in
        delete $window.sessionStorage.token;
        $scope.isAuthenticated = false;

        // Handle login errors here
        $scope.error = 'Error: Invalid user or password';
        $scope.welcome = '';
      });
  };
  $scope.logout = function () {
    $scope.welcome = '';
    $scope.message = '';
    $scope.isAuthenticated = false;
    $cookies.put('Userid', 0, {'path': '/'});
    delete $window.sessionStorage.token;
    window.location = CONSTANTS.URL_PREFIX + '/user/login';
  };

  var init = function() {
    if ($window.sessionStorage.token) {
      $scope.isAuthenticated = true;
    }
  };

  init();

});