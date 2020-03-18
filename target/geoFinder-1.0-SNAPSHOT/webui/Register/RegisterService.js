
'use strict';
angular.module('geoFinderApp.RegisterModule')
    .service('RegisterService', function ($http) {
    	
    	return {
    		
    		datiRegistrazione: function(nuovoUtente){
    			return $http.post('geoFinder/register' ,nuovoUtente);
    		}
    		
    	}
           
    });
    