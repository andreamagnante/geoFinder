'use strict';
angular.module('geoFinderApp.LoginModule')
    .service('LoginService', function ($http) {
    	
    	return {
    		
    		login: function(utente){
    			return $http.post('geoFinder/login' ,utente);
    		}
    		
    	}
           
    });
    
       