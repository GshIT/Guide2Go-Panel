(function() {
  'use strict';

  angular
    .module('app.autos.versiones')
    .controller('VersionesController', VersionesController);

  /** @ngInject */
  function VersionesController(
    $state, api, $document, $mdDialog, $mdToast,
    moment, utils, $timeout, $scope, versiones, DtOptions, paradas
  ) {
    var vm = this;

    vm.versiones = versiones;
    vm.showEditForm = showEditForm;
    vm.showCreateForm = showCreateForm;
    vm.destroy = destroy;

    vm.dtOptions = DtOptions;

    function showEditForm(version, e) {
		  $mdDialog.show({
		    controller: 'EditFormVersionesController',
		    controllerAs: 'vm',
		    templateUrl: 'app/main/autos/versiones/dialogs/edit-form/edit-form.html',
		    parent: angular.element($document.body),
		    targetEvent: e,
		    clickOutsideToClose: true,
		    locals: {
		      version: version
		    }
		  }).then(function(data) {
        return api.versiones.update(data);
      }).then(function() {
        utils.successToast('Version de Auto actualizado exitosamente!');
				$timeout($state.reload(), 4000);
			}).catch(function(err) {
        if (err === "closed-manually" || typeof(err) === 'undefined') return;
        utils.errorToast('Error al actualizar Version de auto!');
      });
		}

    function showCreateForm(e) {
		  $mdDialog.show({
		    controller: 'CreateFormVersionesController',
		    controllerAs: 'vm',
		    templateUrl: 'app/main/autos/versiones/dialogs/create-form/create-form.html',
		    parent: angular.element($document.body),
		    targetEvent: e,
		    clickOutsideToClose: true,
        locals: {
          paradas: paradas,
        }
		  }).then(function(res) {
        utils.successToast('Audio creado exitosamente!');
				$timeout($state.reload(), 4000);
			}).catch(function(err) {
        if (err === "closed-manually" || typeof(err) === 'undefined') return;
        utils.errorToast('Error al crear Audio!');
      });
		}

    function destroy(version) {
      swal(utils.swalDeleteObject({
        title: 'Seguro que quieres eliminar esta Version de auto?',
        preConfirm: function() {
          return api.versiones.destroy(version);
        }
      })).then(function(res) {
        utils.removeObjectFromArray(vm.versiones, version, 'id_version');
        $scope.$apply();
        swal({
          type: 'success',
          title: 'Se elimino la Version de auto exitosamente!',
        });
      }).catch(function(err) {
        if (err === "cancel") return;
        swal({
          type: 'warning',
          title: 'Error al intentar eliminar la Version de auto!',
          text: 'Intente de nuevo mas tarde.'
        });
      });
    }

  }
})();
