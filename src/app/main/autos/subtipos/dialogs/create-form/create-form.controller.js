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
    vm.subtipo = {};
    
    vm.zonas = zonas;
    vm.subzona = {};
    vm.subzona.zona_id = vm.zonas[0].id;

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
  }


})();
