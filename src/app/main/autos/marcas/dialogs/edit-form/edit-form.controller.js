(function() {
  'use strict';

  angular
    .module('app.autos.marcas')
    .controller('EditFormMarcasController', EditFormMarcasController);

  /** @ngInject */
  function EditFormMarcasController(marca, api, $mdDialog) {
    var vm = this;

    vm.updating = false;

    vm.close = close;
    vm.marca = marca;
    vm.update = update;
    vm.updating = false;

    function update() {
      var localMarca = vm.marca;
      vm.updating = true;
      api.marcas.update(localMarca).then(function(res) {
          if (localMarca.file.length < 1) return false;
          var formData = new FormData();
          formData.append('id_marca', localMarca.id_marca);
          formData.append('archivo', localMarca.file[0].lfFile);
          return api.marcas.updateImage(formData);
      }).then(function(response) {
        vm.updating = false;
        $mdDialog.hide(localMarca);
      });
    }

    function close() {
      $mdDialog.cancel('closed-manually');
    }
  }


})();
