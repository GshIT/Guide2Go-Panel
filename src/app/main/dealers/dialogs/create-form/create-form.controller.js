(function() {
  'use strict';

  angular
    .module('app.dealers')
    .controller('CreateFormDealersController', CreateFormDealersController);

  /** @ngInject */
  function CreateFormDealersController($scope, $mdDialog, position, NgMap, $timeout) {
    var vm = this;

    // Attributes
    vm.dealer = {};
    vm.currentPos = position;
    vm.mapCenter = vm.currentPos.latitude + ',' + vm.currentPos.longitude;
    vm.marker = {
      lat: vm.currentPos.latitude,
      lng: vm.currentPos.longitude
    };
    vm.type = "['geocode']";
    vm.googleMapsUrl = 'https://maps.googleapis.com/maps/api/js?libraries=places';

    // Methods
    vm.close = close;
    vm.save = save;
    vm.handleMarkerDrag = handleMarkerDrag;
    vm.centerOnMarker = centerOnMarker;
    vm.placeChanged = placeChanged;

    /* HotFix for not rendering again bullshit */
    vm.render = false;
    $timeout(function () {
      vm.render = true;
      activate();
    }, 1000);

    function save() {
      vm.dealer.latitude = vm.marker.lat;
      vm.dealer.longitude = vm.marker.lng;
      vm.direccion = vm.address;
      $mdDialog.hide(vm.dealer);
    }

    function close() {
      $mdDialog.cancel('closed-manually');
    }

    function activate() {
      NgMap.getMap().then(function(map) {
        vm.map = map;
        vm.map.setCenter({
          lat: vm.currentPos.latitude,
          lng: vm.currentPos.longitude
        });
      });
    }

    function placeChanged() {
      vm.place = this.getPlace();
      vm.map.panTo(vm.place.geometry.location);
      updateMarker(vm.place.geometry.location);
    }

    function handleMarkerDrag(event) {
      if (typeof vm.map === 'undefined') return;
      vm.map.panTo(event.latLng);
      updateMarker(event.latLng);
    }

    function centerOnMarker() {
      if (typeof vm.map === 'undefined') return;
      vm.map.panTo(marker.latLng);
    }

    function updateMarker(latLng) {
      vm.marker = {
        lat: latLng.lat(),
        lng: latLng.lng(),
        latLng: latLng,
      }
    }
  }


})();
