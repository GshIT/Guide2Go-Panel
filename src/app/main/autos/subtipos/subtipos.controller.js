(function() {
  'use strict';

  angular
    .module('app.autos.subtipos')
    .controller('SubTiposController', SubTiposController);

  /** @ngInject */
  function SubTiposController(
    $state, api, $document, $mdDialog, $mdToast,
    moment, utils, $timeout, $scope, subtipos, DtOptions, zonas
  ) {
    var vm = this;

    vm.subtipos = subtipos;
    vm.showEditForm = showEditForm;
    vm.showCreateForm = showCreateForm;
    vm.destroy = destroy;

    vm.dtOptions = DtOptions;

    function showEditForm(subtipo, e) {
		  $mdDialog.show({
		    controller: 'EditFormSubTiposController',
		    controllerAs: 'vm',
		    templateUrl: 'app/main/autos/subtipos/dialogs/edit-form/edit-form.html',
		    parent: angular.element($document.body),
		    targetEvent: e,
		    clickOutsideToClose: true,
		    locals: {
		      subtipo: subtipo
		    }
		  }).then(function(data) {
        return api.subtipos.update(data);
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
		    controller: 'CreateFormSubTiposController',
		    controllerAs: 'vm',
		    templateUrl: 'app/main/autos/subtipos/dialogs/create-form/create-form.html',
		    parent: angular.element($document.body),
		    targetEvent: e,
		    clickOutsideToClose: true,
        locals: {
          zonas: zonas
        }
		  }).then(function(newSubTipo) {
        return api.subtipos.create(newSubTipo);
      }).then(function(res) {
        utils.successToast('SubTipo de Auto creado exitosamente!');
				$timeout($state.reload(), 4000);
			}).catch(function(err) {
        if (err === "closed-manually" || typeof(err) === 'undefined') return;
        utils.errorToast('Error al crear SubTipo de auto!');
      });
		}

    function destroy(subtipo) {
      swal(utils.swalDeleteObject({
        title: 'Seguro que quieres eliminar este SubTipo de auto?',
        preConfirm: function() {
          return api.subtipos.destroy(subtipo);
        }
      })).then(function(res) {
        utils.removeObjectFromArray(vm.subtipos, subtipo, 'id_subtipo');
        $scope.$apply();
        swal({
          type: 'success',
          title: 'Se elimino el subtipo de auto exitosamente!',
        });
      }).catch(function(err) {
        if (err === "cancel") return;
        swal({
          type: 'warning',
          title: 'Error al intentar eliminar el SubTipo de auto!',
          text: 'Intente de nuevo mas tarde.'
        });
      });
    }

  }
})();
