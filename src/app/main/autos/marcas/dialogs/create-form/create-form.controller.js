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
  }


})();
