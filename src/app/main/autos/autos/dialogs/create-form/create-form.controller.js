(function() {
  'use strict';

  angular
    .module('app.autos.autos')
    .controller('CreateFormAutosController', CreateFormAutosController);

  /** @ngInject */
  function CreateFormAutosController(
    $scope, $mdDialog, auto, marcas, tipos, subtipos, versiones, combustibles, motores, api
  ) {

    var vm = this;

    vm.close = close;
    vm.save = save;
    vm.auto = auto;
    vm.creating = false;

    vm.marcas = marcas;
    vm.tipos = tipos;
    vm.subtipos = subtipos;
    vm.modelos = [];
    vm.versiones = versiones;
    vm.combustibles = combustibles;
    vm.motores = motores;

    function save() {
      var localAuto = vm.auto;
      vm.creating = true;
      localAuto.id_modelo = "101";
      api.autos.create(localAuto).then(function(res) {
        var data = res.data;
        if (data.state) {
          var idAuto = data.created_id;
          if (localAuto.file.length < 1) return false;
          var formData = new FormData();
          formData.append('id_auto', idAuto);
          formData.append('archivo', localAuto.file[0].lfFile);
          return api.autos.updateImage(formData);
        }
        return res;
      }).then(function(res) {
        $mdDialog.hide(res);
      });
    }

    function close() {
      $mdDialog.cancel();
    }
  }


})();
