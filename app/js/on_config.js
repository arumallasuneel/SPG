function OnConfig($stateProvider, $locationProvider, $urlRouterProvider, $compileProvider) {
    'ngInject';

    if (process.env.NODE_ENV === 'production') {
        $compileProvider.debugInfoEnabled(false);
    }

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });

    // $stateProvider
    // .state('Home', {
    //   url: '/',
    //   controller: 'ExampleCtrl as home',
    //   templateUrl: 'home.html',
    //   title: 'Home'
    // });

    $stateProvider
        .state('/', {
            url: '/',
            controller: 'HomePageCtrl',
            templateUrl: '../home.html',
            title: 'Suparna Global'
        });
    // .state('', {}) // About us state
    // .state('', {})
    // .state('', {}); // About us state

    $urlRouterProvider.otherwise('/');

}

export default OnConfig;