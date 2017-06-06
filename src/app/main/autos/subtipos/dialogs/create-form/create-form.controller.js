(function() {
	'use strict';

	angular
		.module('app.autos.subtipos')
		.controller('CreateFormSubTiposController', CreateFormSubTiposController);

	/** @ngInject */
	function CreateFormSubTiposController($scope, $mdDialog, zonas, api) {
		var vm = this;

		vm.close = close;
		vm.save = save;

		// El tema del Zoooooooooooooom
		vm.updateZone = updateZone;
		vm.polygon = null;

		vm.subtipo = {};

		vm.zonas = zonas;
		vm.subzona = {};
		vm.subzona.zona_id = vm.zonas[0].id;

		console.log(vm.zonas);

		function save() {
			vm.subzona.zona_id = parseInt(vm.subzona.zona_id,10);
			vm.subzona.polygon = localStorage.getItem('poligono');
			var localSubZona = vm.subzona;
			vm.creating = true;
			api.subzonas.create(localSubZona).then(function(res) {
				var data = res.data;
				return res;
			}).then(function(res) {
				$mdDialog.hide(res);
			});
		}

		function close() {
			$mdDialog.cancel('closed-manually');
		}

		function updateZone(zone) {
			console.log(zone);
			let map = uniqueSubZoneMap;
			let fixedPoints = getBounds(zone);
			let p = calcCenter(zone);
			let center = new google.maps.LatLng(p); 
		
			if (vm.polygon) vm.polygon.setMap(null);
			vm.polygon = new google.maps.Polygon({
				paths: fixedPoints,
				strokeColor: '#FF0000',
				strokeOpacity: 0.8,
				strokeWeight: 2,
				fillColor: '#FF0000',
				fillOpacity: 0.35
			});
			map.setCenter(center);
			map.setZoom(5);
			vm.polygon.setMap(map);
		}

		function getBounds(zone) {
			let points = zone.poligono.linestrings[0].points;
			let fixedPoints = [];
			for (let i=0; i < points.length; i++) {
				fixedPoints.push({
					lat: points[i].lat,
					lng: points[i].lon
				});
			}

			return fixedPoints;
		}

		function calcCenter(zone) {
			let points = zone.poligono.linestrings[0].points;
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
