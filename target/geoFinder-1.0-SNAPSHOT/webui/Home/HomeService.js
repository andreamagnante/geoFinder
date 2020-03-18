angular.module('geoFinderApp.HomeModule')
.service('HomeService', function ($http) {
    	
    	return {
    		
    		savePoint: function(puntoDiInteresse){
    			return $http.post('geoFinder/home/savePoint' ,puntoDiInteresse);
    		},
                
                getPoint: function(puntoDiInteresse){
    			return $http.post('geoFinder/home/getPoint' ,puntoDiInteresse);
    		},
                
                removePoint: function(puntoDiInteresse){
    			return $http.post('geoFinder/home/removePoint' ,puntoDiInteresse);
    		}
 
    		
    	};
        });