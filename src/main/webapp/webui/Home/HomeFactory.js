angular.module('geoFinderApp.HomeModule')

.factory('datiMappa', function () {
    var factory = {};
    var position = {};
    var markerdelete = {};
    var punti = {};

    factory.setPosition = function(key,value) {
       position[key] = value;
    };
    factory.getPosition = function(key) {
       return position[key];
    };
    
    factory.setMarker = function(key,value){
        markerdelete[key] = value;
    };
    
    factory.getMarker = function(key){
        return markerdelete[key];
    };
    
    factory.setPunti = function(key,value){
        punti[key] = value;
    };
    
    
    factory.getPunti = function(key){
        
        return punti[key];
        
    };
    
    return factory;
})


