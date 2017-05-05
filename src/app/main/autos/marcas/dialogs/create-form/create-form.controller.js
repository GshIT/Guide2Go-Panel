(function() {
  'use strict';

  angular
    .module('app.autos.marcas')
    .controller('CreateFormMarcasController', CreateFormMarcasController);

  /** @ngInject */
  function CreateFormMarcasController($scope, $mdDialog, marca, api) {
    var vm = this;

    vm.close = close;
    vm.save = save;
    vm.marca = marca;
    vm.creating = false;

    function save() {
      var localMarca = vm.marca;
      vm.creating = true;
      api.marcas.create(localMarca).then(function(res) {
        var data = res.data;
        if (data.state) {
          var idMarca = data.created_id;
          if (localMarca.file.length < 1) return false;
          var formData = new FormData();
          formData.append('id_marca', idMarca);
          formData.append('archivo', localMarca.file[0].lfFile);
          return api.marcas.updateImage(formData);
        }
        return response;
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
