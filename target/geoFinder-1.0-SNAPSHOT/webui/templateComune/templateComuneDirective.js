angular.module('geoFinderApp.templateComuneModule')

/*DIRETTIVA PER FAR DISEGNARE LA MAPPA A SCHERMO*/
.directive("myMaps",function(datiMappa,HomeService){
        return{
            restrict:'E',
            template:'<div></div>',
            replace:true,
            link:function($scope,element,attrs,$state, $modal,$timeout){
                
                
                
                var gmarkers1 = [];
                var markers1 = [];
                
                
                $scope.categorie = ["tutte","ristoranti","aereoporti","bar","atm","cafe","museo","dottore","palestra","ospedale","farmacia","parcheggio","scuole","università","stazioni del treno"];
                $scope.categoria = $scope.categorie[0];
                
                $scope.catform = ["ristoranti","aereoporti","bar","atm","cafe","museo","dottore","palestra","ospedale","farmacia","parcheggio","scuole","università","stazioni del treno"];
                
                $scope.mostro = ["tutti","generali","personali"];
                $scope.mostra = $scope.mostro[0];

                
                // Sets the map on all markers in the array.
                function setMapOnAll(map) {
                    for (var i = 0; i < gmarkers1.length; i++) {
                        gmarkers1[i].setMap(map);
                    }
                }
                
                // Removes the markers from the map, but keeps them in the array.
                function clearMarkers() {
                    setMapOnAll(null);
                }
                
                 mostrapunti();
                
                function mostrapunti(){
                clearMarkers();
                gmarkers1 = [];
                markers1 = [];
                var utente;   
                if($scope.utenteLoggato != null){
 		    utente = $scope.utenteLoggato.nome;
                 }
                
                else{
                    utente = "admin";
                }                
                var puntoDiInteresse = {
 				   username: utente,
 				   
 		   }
 	           HomeService.getPoint(puntoDiInteresse).then(function(response){
 	 			 if (response.data.esito == false) {
 	 				alert(response.data.descrizione);
 					}
                                 
                                 datiMappa.setPunti('tuttiPunti',response.data.pointOfInterest);
                                 
                                 tuttipunti();
 	 			 
 	            }) 
                }  
                
                
                
                  
               
                function tuttipunti(){
                    var markers1 = datiMappa.getPunti('tuttiPunti');
                     for (i = 0; i < markers1.length; i++) {
                         addMarker(markers1[i]);
                     }

                }
        
                
                var infowindow = new google.maps.InfoWindow({
                    content: ''
                });
                //************************
                // MAPPA A SCHERMO   
                //************************
                 //init map (torvergata)
                 
                 var noPoi = [
                     {
                        "featureType": "administrative",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "poi",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "road",
                        "elementType": "labels.icon",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "transit",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    }
                ];
                       
                 var map = new google.maps.Map(document.getElementById("map-canvas"), {
                     center: {lat: 41.890251, lng: 12.482373},
                     zoom: 6,
                     mapTypeControl: false,
                     styles: noPoi,
                     
                 });
                 
         
                 
    
                function addMarker(marker) {
                    
                    var idPoint = marker.id;
                    var category = marker.tipo;
                    var title = marker.nome;
                    var pos = new google.maps.LatLng(marker.lat, marker.lng);
                    var content = marker.descrizione;
                    if(marker.user.id == 1){
                        var idUser = "generali";
                    }
                    else{
                        var idUser = "personali";
                    }
                    
                    
                    
                    marker1 = new google.maps.Marker({
                        title: title,
                        position: pos,
                        category: category,
                        map: map,
                        idUser: idUser,
                        idPoint : idPoint
                    });
                    
                    if(idUser == "generali"){
                        var iconGenerali = "http://maps.google.com/mapfiles/ms/icons/red-dot.png";
                        marker1.setIcon(iconGenerali);
                    }
                    else{
                        var iconPersonali = "http://maps.google.com/mapfiles/ms/icons/blue-dot.png";
                        marker1.setIcon(iconPersonali);
                    }
                    gmarkers1.push(marker1);
                    

                    
                    
                    google.maps.event.addListener(marker1, 'click', (function (marker1, content) {
                       
                        return function () {
                            if(marker1.getIcon() == iconPersonali){
                            infowindow.setContent(
                                    '<h3>'+title+'</h3>'+
                                    '<div style="font-size: 20px;" id="bodyContent">'+content+
                                    '<h6 style="heigth: 30px; margin-top: 20px; margin-bottom: 20px; \n\
                                     text-decoration: underline; background-color: #2c3e50;"><a style="font-size: 20px; \n\
                                     color: white; margin-left: 200px;" target="_blank" href="https://www.google.com/maps/dir/?api=1&origin='
                                        +markerown.getPosition()+'&destination='+marker1.getPosition()+
                                        '">Guida verso</a><br><span style="color: #66ff33">Rispetto ultima posizione cercata (indirizzo o geolocalizzazione)</span></h6><button id="PP" data-toggle="modal" data-target="#myModal5" type="submit" style="margin-left: 145px">Rimuovi punto personale</button>');
                            infowindow.open(map, marker1);
                            datiMappa.setMarker('delete',marker1.idPoint);
                            map.panTo(marker1.getPosition());
                            map.setZoom(16);
                            
                            
                            }else{
                             infowindow.setContent(
                                    '<h3>'+title+'</h3>'+
                                    '<div style="font-size: 20px;" id="bodyContent">'+content+
                                    '<h6 style="heigth: 30px; margin-top: 20px; margin-bottom: 20px; \n\
                                     text-decoration: underline; background-color: #2c3e50;"><a style="font-size: 20px; \n\
                                     color: white; margin-left: 200px;" target="_blank" href="https://www.google.com/maps/dir/?api=1&origin='+markerown.getPosition()+
                                     '&destination='+marker1.getPosition()+'">Guida verso</a><br><span style="color: #66ff33">Rispetto ultima posizione cercata (indirizzo o geolocalizzazione)</span></h6>'
                                    );
                            infowindow.open(map, marker1);
                            map.panTo(marker1.getPosition());
                            map.setZoom(16);
                            }
                            
                        };
                    })(marker1, content));
                    
                
                }
                
                
                
                 
                 var via = 'http://maps.google.com/mapfiles/kml/pal5/icon14.png';
                 var casa = 'http://maps.google.com/mapfiles/kml/pal3/icon40.png';
                 var markerown = new google.maps.Marker({
                 map: map,
                 
                 });
           
                //************************
                // GPS LOCATION
                //************************
                
                $scope.getLocation = function(){
                    
                    var options = {
                        enableHighAccuracy: true,
                        timeout: 5000,
                        maximumAge: 0
                    };
                    
                    function success(position) {
                        var pos = {
                                lat: position.coords.latitude,
                                lng: position.coords.longitude
                            };
                        alert('accuratezza posizione : metri = '+ position.coords.accuracy);
                        map.setCenter(pos);
                        map.setZoom(16);
                        markerown.setVisible(true);
                        markerown.setPosition(pos);
                        markerown.setIcon(casa);
                        infowindowown.open(map, markerown);
                        setTimeout(function(){infowindowown.close();}, '2500');
                        datiMappa.setPosition('lat',pos.lat);
                        datiMappa.setPosition('lng',pos.lng);
                        
                        funzmostraci();
                        
                    }
                    
                    function error(err) {
                        markerown.setVisible(false);
                        alert("Non è stato possibile trovare la tua posizione. Ricarica la pagina o usa la barra di ricerca indirizzo");
                    }
                    
                    navigator.geolocation.getCurrentPosition(success, error, options);
                    $scope.barra = "";
                    
                };
             
                
                
                //************************
                // SEARCH LOCATION
                //************************
             
                // Create the search box and link it to the UI element.
                var input = document.getElementById('pac-input');
                var searchBox = new google.maps.places.SearchBox(input);
                
                // Bias the SearchBox results towards current map's viewport.
                map.addListener('bounds_changed', function() {
                    searchBox.setBounds(map.getBounds());
                    
                });
                
                
                // Listen for the event fired when the user selects a prediction and retrieve
                // more details for that place.
                searchBox.addListener('places_changed', function() {
                    var places = searchBox.getPlaces();
                    
                    if (places.length == 0) {
                        return;
                    }
                    
                    // For each place, get the icon, name and location.
                    var bounds = new google.maps.LatLngBounds();
                    places.forEach(function(place) {
                        if (!place.geometry) {
                            console.log("Returned place contains no geometry");
                            return;
                        }
                        if (place.geometry.viewport) {
                            // Only geocodes have viewport.
                            bounds.union(place.geometry.viewport);
                        } else {
                            bounds.extend(place.geometry.location);
                        }
                    });
                    map.fitBounds(bounds);
                    
                    markerown.setVisible(true);
                    markerown.setPosition(map.getCenter());
                    markerown.setIcon(via);
                    var pos = markerown.getPosition();
                    datiMappa.setPosition('lat',pos.lat());
                    datiMappa.setPosition('lng',pos.lng());
                    funzmostraci();
                    infowindowown.open(map, markerown);
                    
                    setTimeout(function(){infowindowown.close();}, '2000');
                    
                });

                
                
                //************************
                // MOSTRA TUTTI / CATEGORIA
                //************************
                 $scope.mostraci = function () {
                     
                     funzmostraci();
                   
                     
                   };
                   
                   
                   
                   //##########################
                   
                   function funzmostraci() {
                     
                     
                     function rad(x) {return x*Math.PI/180;}                   
                     
                     if($scope.vicino == true){
                         if(markerown.getPosition() == null){
                   
                            alert("Per trovare il punto più vicino cercare un'indirizzo o la propria posizione, poi ripetere.");
                            $scope.vicino = false;
                           }
                          else{
                              var myLatLng = markerown.getPosition();
                              var lat = myLatLng.lat();
                              var lng = myLatLng.lng();
                              var R = 6371; // radius of earth in km
                              var distances = [];
                              
                           }
                     }
                     var closest = -1;
                    
                     
                     
                    for(i=0; i<gmarkers1.length; i++){
                     
                     marker = gmarkers1[i];
                     infowindow.close();
                     
                    
                     
                     if($scope.mostra == "tutti"){
                         if($scope.categoria == "tutte"){
                             marker.setVisible(true);
                            
                         }
                        else{
                           if(marker.category == $scope.categoria){
                            
                            if($scope.vicino == true){
                               
                                
                                         var marklatlng = marker.getPosition();
                                         var mlat = marklatlng.lat();
                                         var mlng = marklatlng.lng();
                                         var dLat  = rad(mlat - lat);
                                         var dLong = rad(mlng - lng);
                                         var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                                                 Math.cos(rad(lat)) * Math.cos(rad(lat)) * Math.sin(dLong/2) * Math.sin(dLong/2);
                                         var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
                                         var d = R * c;
                                         distances[i] = d;
                                         if ( closest == -1 || d < distances[closest] ) {
                                            
                                            closest = i;
                                             
                                         }
                                         
                               }
                               else{
                                 marker.setVisible(true);
                               }
                           
                           }
                         else{
                             marker.setVisible(false);
                             
                           }
                        }
                        
                     }
                     else{
                         if(marker.idUser == $scope.mostra){
                            if($scope.categoria == "tutte"){
                               marker.setVisible(true);
                            }
                            else{
                             if(marker.category == $scope.categoria){
                               if($scope.vicino == true){
                                   
                                   var marklatlng = marker.getPosition();
                                             var mlat = marklatlng.lat();
                                             var mlng = marklatlng.lng();
                                             var dLat  = rad(mlat - lat);
                                             var dLong = rad(mlng - lng);
                                             var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                                                     Math.cos(rad(lat)) * Math.cos(rad(lat)) * Math.sin(dLong/2) * Math.sin(dLong/2);
                                             var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
                                             var d = R * c;
                                             distances[i] = d;
                                             if ( closest == -1 || d < distances[closest] ) {

                                                 closest = i;
                                                 
                                             }

                               }
                               else{
                                 marker.setVisible(true);
                               }  
                             }
                             else{
                                  marker.setVisible(false);
                             }
                             }
                         }
                         else{
                             marker.setVisible(false);
                             
                         }
                         
                         
                                         
                     
                    }
                     
                   }
                   
                
                   if(closest != -1){
                       markerown.setVisible(true);
                       for(b=0;b<gmarkers1.length;b++){
                           gmarkers1[b].setVisible(false);
                       } 
                       gmarkers1[closest].setVisible(true);
                       var bounds = new google.maps.LatLngBounds();
                       bounds.extend(gmarkers1[closest].getPosition());
                       bounds.extend(markerown.getPosition());
                       map.fitBounds(bounds);
                       map.setZoom(map.getZoom()-1); 

                       
                   }
                   
                     
                   };
                   
                //************************
                // IL PIU VICINO
                //************************
                   
                   
                   $scope.vicini = function(){
                       if($scope.vicino == true){
                        if($scope.categoria == "tutte"){
                            alert("Scegliere prima una SINGOLA categoria!");
                            $scope.vicino = false;
                            }
                            
                        }
                            
                    };
                    
             if($scope.utenteLoggato == null){    
                var infowindowown = new google.maps.InfoWindow({
                    
                    content: '<h5 style="color: #2c3e50;">Vuoi aggiungerlo come punto personale?</h5> <h5 style="color: red;text-decoration: underline;">--azione possibile solo ad utenti registrati--</h5> <button disabled id="punti" type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal" style="margin-left: 150px; margin-top: 20px; background-color: #2c3e50;">AGGIUNGI</button>'
                    
                });
            }else{
               var infowindowown = new google.maps.InfoWindow({
                    
                    content: '<h5 style="color: #2c3e50;">Vuoi aggiungerlo come punto personale?</h5> <button id="punti" type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal" style="margin-left: 150px; margin-top: 20px; background-color: #2c3e50;">AGGIUNGI</button>'
                    
                });
                
            }
                
                
               
                markerown.addListener('click', function() {
                            
                            
                            infowindowown.open(map, markerown);
                            map.panTo(markerown.getPosition());
                            map.setZoom(16);
                            

                            
                    
                });
                
           
                
                 $scope.aggiungi = function(){
                     
                    mostrapunti();
                    infowindowown.close();
                    $scope.nome = null;
                    $scope.catforms = null;
                    $scope.descrizione = null;
                    $scope.vicino = null;
                    $scope.categoria = $scope.categorie[0];
                    $scope.mostra = $scope.mostro[0];                 
                
                }
                
                 $scope.rimuovi = function(){
                    
                    mostrapunti();
                    $scope.vicino = false;
                    $scope.vicino = null;
                    $scope.categoria = $scope.categorie[0];
                    $scope.mostra = $scope.mostro[0];  
                };
                
                
    

                 
                  
                
                var iconBase = 'http://maps.google.com/mapfiles/ms/icons/';
                var icons = {
                    generali: {
                        name: 'GENERALI',
                        icon: iconBase + 'red-dot.png'
                    },
                    personali: {
                        name: 'PERSONALI',
                        icon: iconBase + 'blue-dot.png'
                    },
                    
                };
        
                var legend = document.getElementById('legend');
                for (var key in icons) {
                    var type = icons[key];
                    var name = type.name;
                    var icon = type.icon;
                    var div = document.createElement('div');
                    div.innerHTML = '<img src="' + icon + '"> ' + name;
                    legend.appendChild(div);
                }                 
                  
                map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push
                     (document.getElementById('legend'));
                                         
                 
                
                  
                  
            }
				
     }
     
  });