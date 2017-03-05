function OnConfig($stateProvider, $locationProvider, $urlRouterProvider, $compileProvider) {
    'ngInject';

    if (process.env.NODE_ENV === 'production') {
        $compileProvider.debugInfoEnabled(false);
    }

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });

    $stateProvider
        .state('home', {
            url: '/',
            //controller: 'HomePageCtrl', // controller logic goes here.
            templateUrl: 'home.html',
            title: 'Suparna Global',
        })
        // About us state
        .state('aboutus', {
            url: '/aboutus',
            templateUrl: 'aboutus.html',
            title: 'Suparna Global -- About us'
        })
        // login 
        .state('login', {
            url: '/login',
            templateUrl: 'login.html',
            title: 'SPG-Login'
        })
        // signup
        .state('signup', {
            url: '/signup',
            templateUrl: 'login.html',
            title: 'SPG-signup'
        });

    $urlRouterProvider.otherwise('/');

}

export default OnConfig;