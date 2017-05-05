(function() {
  'use strict';

  angular
    .module('app.autos.autos')
    .controller('EditFormAutosController', EditFormAutosController);

  /** @ngInject */
  function EditFormAutosController(
    auto, $mdDialog, marcas, tipos, subtipos, versiones, combustibles, motores, api
  ) {

    var vm = this;

    vm.close = close;
    vm.auto = auto;
    vm.update = update;
    vm.updating = false;

    vm.marcas = marcas;
    vm.tipos = tipos;
    vm.subtipos = subtipos;
    vm.modelos = [];
    vm.versiones = versiones;
    vm.combustibles = combustibles;
    vm.motores = motores;

    function update() {
      var localAuto = vm.auto;
      vm.updating = true;
      api.autos.update(localAuto).then(function(res) {
        if (localAuto.file.length < 1) return false;
        var formData = new FormData();
        formData.append('id_auto', localAuto.id_auto);
        formData.append('archivo', localAuto.file[0].lfFile);
        return api.autos.updateImage(formData);
      }).then(function(res) {
        vm.updating = false;
        $mdDialog.hide(res);
      });
    }

    function close() {
      $mdDialog.cancel();
    }
  }


})();
