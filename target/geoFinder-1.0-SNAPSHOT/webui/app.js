
angular.module('geoFinderApp',
                                    [
                                        'ngAnimate',
                                        'ngMessages',
                                        'ngRoute',
                                        'ngCookies',
                                        'geoFinderApp.templateComuneModule',
                                        'geoFinderApp.HomeModule',
                                        'geoFinderApp.LoginModule',
                                        'geoFinderApp.RegisterModule',
                                    ])
.config(['$routeProvider',
    function ($routeProvider){
        $routeProvider
            .when('/home', {
                controller: 'HomeController',
                templateUrl: 'webui/Home/home.html',
            })
            
            .when('/login', {
                controller: 'LoginController',
                templateUrl: 'webui/Login/login.html',
            })
            
            .when('/register', {
                controller: 'RegisterController',
                templateUrl: 'webui/Register/register.html',
            })

            .when('/access-denied', {
                controller: 'LoginController',
                templateUrl: 'webui/Login/access-denied.html',
            })

            .otherwise({ redirectTo: '/home' });
    }
])

.config(function($httpProvider) {
	  $httpProvider.defaults.useXDomain = true;
      $httpProvider.defaults.headers.common['X-Requested-With'];
})

.constant('BackendCfg',  {
    url: '/geoFinder',
    setupHttp: function(http) {
        http.defaults.useXDomain = true;
        http.defaults.withCredentials = true;
    }
})

