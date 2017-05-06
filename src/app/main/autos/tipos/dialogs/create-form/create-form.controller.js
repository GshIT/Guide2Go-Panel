(function() {
  'use strict';

  angular
    .module('app.autos.tipos')
    .controller('CreateFormTiposController', CreateFormTiposController);

  /** @ngInject */
  function CreateFormTiposController($scope, $mdDialog, api) {
    var vm = this;

    vm.close = close;
    vm.save = save;
    vm.tipo = {};

    //estoy hay q cambiarlo cuando tenga el getter
    vm.zona ={};

    function save() {
      vm.zona.polygon = localStorage.getItem('poligono');
      var localZona = vm.zona;
      vm.creating = true;
      api.zonas.create(localZona).then(function(res) {
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
