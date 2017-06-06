(function() {
  'use strict';

  angular
    .module('app.autos.marcas')
    .controller('CreateFormMarcasController', CreateFormMarcasController);

  /** @ngInject */
  function CreateFormMarcasController($scope, $mdDialog, subzonas, api) {
    var vm = this;

    vm.close = close;
    vm.save = save;

		// El tema del zoooooom
		vm.updateSubZone = updateSubZone;
		vm.polygon = null;

    vm.creating = false;

    vm.subzonas = subzonas;
    vm.parada = {};
    vm.parada.sub_zonas_id = vm.subzonas[0].id;
    vm.parada.categoria_id = 1;

    function save() {
      vm.parada.punto = localStorage.getItem('punto');
      var localParada = vm.parada;
      vm.creating = true;
      api.paradas.create(localParada).then(function(res) {
        var data = res.data;
        return res;
      }).then(function(res) {
        vm.creating = false;
        $mdDialog.hide(res);
      });
    }

    function close() {
      $mdDialog.cancel('closed-manually');
    }

		function updateSubZone(sZone) {
			console.log(sZone);
			let map = uniqueStopMap;
			let fixedPoints = getBounds(sZone);
			let p = calcCenter(sZone);
			let center = new google.maps.LatLng(p); 
		
			if (vm.polygon) vm.polygon.setMap(null);
			vm.polygon = new google.maps.Polygon({
				paths: fixedPoints,
				strokeColor: '#0000FF',
				strokeOpacity: 0.8,
				strokeWeight: 2,
				fillColor: '#0000FF',
				fillOpacity: 0.35
			});
			map.setCenter(center);
			map.setZoom(7);
			vm.polygon.setMap(map);
		}

		function getBounds(pol) {
			let points = pol.poligono.linestrings[0].points;
			let fixedPoints = [];
			for (let i=0; i < points.length; i++) {
				fixedPoints.push({
					lat: points[i].lat,
					lng: points[i].lon
				});
			}

			return fixedPoints;
		}

		function calcCenter(pol) {
			let points = pol.poligono.linestrings[0].points;
			let coord = { lat: 0, lng: 0 };

			coord = points.reduce(function(acc, val) {
				acc.lat += val.lat;
				acc.lng += val.lon; // No debe ser lon!!!
				return acc;
			}, {
				lat: 0,
				lng: 0
			});

			if (coord.lat != 0) coord.lat /= points.length;
			if (coord.lng != 0) coord.lng /= points.length;

			return coord;
		}
  }


})();
