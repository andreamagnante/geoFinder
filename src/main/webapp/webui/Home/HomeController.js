angular.module('geoFinderApp.HomeModule')

.controller('HomeController', ['$scope', '$rootScope','$location','$http','HomeService','$window','$anchorScroll', '$q','datiMappa', function ($scope, $rootScope,$location,$http,HomeService,$window,$anchorScroll,$q,datiMappa) {
	
        
        
        
	$scope.utenteLoggato = JSON.parse(JSON.stringify(eval('(' + sessionStorage.getItem('utenteLoggato')+')')));
	
        document.getElementById("puntopersonale").addEventListener("click", function(){
                               $('#myModal').modal('hide');
                               
                            });
                            
        document.getElementById("rimuovipunto").addEventListener("click", function(){
                               $('#myModal5').modal('hide');
                               
                            });
                            
        $scope.aggiungiPuntoDiInteresse = function (){
                
                var lat = datiMappa.getPosition('lat');
                var lng = datiMappa.getPosition('lng');
                
    		var puntoDiInteresse = {
                       
    			username: $scope.utenteLoggato.nome,
    			pointOfInterest : {
    				nome: $scope.nome,
    				tipo: $scope.catforms,
    				descrizione: $scope.descrizione,
    				geometry: {
    					location: {
    						lat: lat,
    						lng: lng,
    					}
    				}
    			},
    		}
    		HomeService.savePoint(puntoDiInteresse).then(function(response){
    			if (response.data.esito == false) {
    				$window.alert(response.data.descrizione);
				} else {
					$window.alert(response.data.descrizione);
                                        
				}
                                
                $scope.aggiungi();
        	})
                
    	}
        
        	  
 	   
        
        
        
        $scope.eliminaPuntoInteresse = function(){
                  var id = datiMappa.getMarker('delete');
 		  var puntoDiInteresse = {
				   idPoint: id,
		   }
 		 HomeService.removePoint(puntoDiInteresse).then(function(response){
 			 if (response.data.esito == false) {
 				 	$window.alert(response.data.descrizione);
				} else {
					$window.alert(response.data.descrizione);
		 			
				}
                  $scope.rimuovi();
 		  })
                  
                  
 	   }
                            
                            
            
                            
	}])






   