(function() {
  'use strict';

  angular
    .module('app.autos.tipos')
    .controller('TiposController', TiposController);

  /** @ngInject */
  function TiposController(
    $state, api, $document, $mdDialog, $mdToast,
    moment, utils, $timeout, $scope, tipos, DtOptions, zonas
  ) {
    var vm = this;

    vm.tipos = tipos;
    vm.showEditForm = showEditForm;
    vm.showCreateForm = showCreateForm;
    vm.destroy = destroy;

    vm.dtOptions = DtOptions;

    vm.zonas = zonas;

    function showEditForm(tipo, e) {
		  $mdDialog.show({
		    controller: 'EditFormTiposController',
		    controllerAs: 'vm',
		    templateUrl: 'app/main/autos/tipos/dialogs/edit-form/edit-form.html',
		    parent: angular.element($document.body),
		    targetEvent: e,
		    clickOutsideToClose: true,
		    locals: {
		      tipo: tipo
		    }
		  }).then(function(data) {
        return api.tipos.update(data);
      }).then(function() {
        utils.successToast('Tipo de Auto actualizado exitosamente!');
				$timeout($state.reload(), 4000);
			}).catch(function(err) {
        if (err === "closed-manually" || typeof(err) === 'undefined') return;
        utils.errorToast('Error al actualizar tipo de auto!');
      });
		}

    function showCreateForm(e) {
		  $mdDialog.show({
		    controller: 'CreateFormTiposController',
		    controllerAs: 'vm',
		    templateUrl: 'app/main/autos/tipos/dialogs/create-form/create-form.html',
		    parent: angular.element($document.body),
		    targetEvent: e,
		    clickOutsideToClose: true,
		  }).then(function(res) {
        console.log("Creado");
        utils.successToast('Zona creada exitosamente!');
				$timeout($state.reload(), 4000);
			}).catch(function(err) {
        if (err === "closed-manually" || typeof(err) === 'undefined') return;
        utils.errorToast('Error al crear Zona!');
      });
		}

    function destroy(tipo) {
      swal(utils.swalDeleteObject({
        title: 'Seguro que quieres eliminar este tipo de auto?',
        preConfirm: function() {
          return api.tipos.destroy(tipo);
        }
      })).then(function(res) {
        utils.removeObjectFromArray(vm.tipos, tipo, 'id_tipo');
        $scope.$apply();
        swal({
          type: 'success',
          title: 'Se elimino el tipo de auto exitosamente!',
        });
      }).catch(function(err) {
        if (err === "cancel") return;
        swal({
          type: 'warning',
          title: 'Error al intentar eliminar el tipo de auto!',
          text: 'Intente de nuevo mas tarde.'
        });
      });
    }

  }
})();
