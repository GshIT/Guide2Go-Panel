(function() {
  'use strict';

  angular
    .module('app.autos.motores')
    .controller('CreateFormMotoresController', CreateFormMotoresController);

  /** @ngInject */
  function CreateFormMotoresController($scope, $mdDialog, zonas, api) {
    var vm = this;

    vm.close = close;
    vm.save = save;
    vm.motor = {};

    vm.zonas = zonas;
    vm.guia = {};

    vm.guia.zone = vm.zonas[0].id;
    vm.guia.lang = 1;

    function save() {
      var localGuia = vm.guia;
      vm.creating = true;
      api.guias.create(localGuia).then(function(res) {
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
