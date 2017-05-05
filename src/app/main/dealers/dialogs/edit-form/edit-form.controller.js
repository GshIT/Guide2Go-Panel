(function() {
  'use strict';

  angular
    .module('app.dealers')
    .controller('EditFormDealersController', EditFormDealersController);

  /** @ngInject */
  function EditFormDealersController(dealer, $mdDialog, position, NgMap, $timeout) {
    var vm = this;

    vm.close = close;
    vm.update = update;
    vm.dealer = dealer;

    vm.dealer.latitude = parseFloat(vm.dealer.latitude);
    vm.dealer.longitude = parseFloat(vm.dealer.longitude);

    vm.currentPos = {
      latitude: vm.dealer.latitude,
      longitude: vm.dealer.longitude
    };
    vm.mapCenter = vm.dealer.latitude + ',' + vm.dealer.longitude;
    vm.marker = {
      lat: vm.dealer.latitude,
      lng: vm.dealer.longitude
    };
    vm.type = "['geocode']";
    // &key=AIzaSyA_fCROr8fx9o9mQCMG4ESUfBv7ZabAqaU
    vm.googleMapsUrl = 'https://maps.googleapis.com/maps/api/js?libraries=places';

    /* Methods */
    vm.handleMarkerDrag = handleMarkerDrag;
    vm.centerOnMarker = centerOnMarker;
    vm.placeChanged = placeChanged;

    /* HotFix for not rendering again bullshit */
    vm.render = false;
    $timeout(function () {
      vm.render = true;
      activate();
    }, 1000);

    function update() {
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
      console.log('location', vm.place.geometry.location);
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
