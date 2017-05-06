(function() {
  'use strict';

  angular
    .module('app.autos.autos')
    .controller('CreateFormAutosController', CreateFormAutosController);

  /** @ngInject */
  function CreateFormAutosController(
    $scope, $mdDialog, user, api
  ) {

    var vm = this;

    vm.close = close;
    vm.save = save;
    //vm.auto = auto;
    vm.creating = false;
    vm.user = user;
    vm.user.user_types_id = 1;
    /*vm.marcas = marcas;
    vm.tipos = tipos;
    vm.subtipos = subtipos;
    vm.modelos = [];
    vm.versiones = versiones;
    vm.combustibles = combustibles;
    vm.motores = motores;*/

    function save() {
      var localUser = vm.user;
      vm.creating = true;
      api.users.create(localUser).then(function(res) {
        var data = res.data;
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
