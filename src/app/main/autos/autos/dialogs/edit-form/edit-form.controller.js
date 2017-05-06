(function() {
  'use strict';

  angular
    .module('app.autos.autos')
    .controller('EditFormAutosController', EditFormAutosController);

  /** @ngInject */
  function EditFormAutosController(
    user, $mdDialog, api
  ) {

    var vm = this;

    vm.close = close;
    //vm.auto = auto;
    vm.update = update;
    vm.updating = false;
    vm.user = user;

    if(vm.user.user_type == "admin"){vm.user.user_types_id = 1;}
    else if(vm.user.user_type == "blogger"){vm.user.user_types_id = 2;}
    else if(vm.user.user_type == "normal"){vm.user.user_types_id = 3;}

    /*vm.marcas = marcas;
    vm.tipos = tipos;
    vm.subtipos = subtipos;
    vm.modelos = [];
    vm.versiones = versiones;
    vm.combustibles = combustibles;
    vm.motores = motores;*/

    function update() {
      console.log(vm.user.password);
      var localUser = vm.user;
      vm.updating = true;
      api.users.update(localUser).then(function(res) {
        var formData = new FormData();
        formData.append('id', localUser.id);
        return res;
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
