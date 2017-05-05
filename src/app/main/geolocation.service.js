(function() {
  'use strict';

  angular
    .module('fuse')
    .factory('GeolocationService', GeolocationService);

  /** @ngInject */
  function GeolocationService($http) {
    var service = {};

    service.geolocate = geolocate;

    function geolocate() {
      var f = navigator.geolocation ? navigatorLocate : googleLocate;
      return f();
    }

    function navigatorLocate() {
      return new Promise(function(resolve, reject) {
        navigator.geolocation.getCurrentPosition(function(pos) {
          resolve({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude
          });
        }, function(err) {
          var errorMessage = '';
          if (err.code === 0 || err.code === 2) {
            errorMessage += error.message;
          }
          reject('Geolocation Error: ' + errorMessage);
        })
      });
    }

    function googleLocate() {
      var baseUrl = 'https://www.googleapis.com/geolocation/v1/geolocate?key=';
      var apiKey = 'AIzaSyBbNa0uGlxuJZxOZOOiu1dx3eHRsp3CcqI';
      var url = baseUrl + apiKey;
      return $http.post(url)
        .then(function(res) {
          var pos = res.data.location;
          return {
            latitude: pos.lat,
            longitude: pos.lng
          };
        });
    }

    return service
  }
})();
