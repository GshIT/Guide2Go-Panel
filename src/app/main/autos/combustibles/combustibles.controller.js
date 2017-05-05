(function() {
  'use strict';

  angular
    .module('app.autos.combustibles')
    .controller('CombustiblesController', CombustiblesController);

  /** @ngInject */
  function CombustiblesController(
    $state, api, $document, $mdDialog, $mdToast,
    moment, utils, $timeout, $scope, combustibles, DtOptions
  ) {
    var vm = this;

    vm.combustibles = combustibles;
    vm.showEditForm = showEditForm;
    vm.showCreateForm = showCreateForm;
    vm.destroy = destroy;

    vm.dtOptions = DtOptions;

    function showEditForm(combustible, e) {
      combustible.octanaje = Number(combustible.octanaje);
		  $mdDialog.show({
		    controller: 'EditFormCombustiblesController',
		    controllerAs: 'vm',
		    templateUrl: 'app/main/autos/combustibles/dialogs/edit-form/edit-form.html',
		    parent: angular.element($document.body),
		    targetEvent: e,
		    clickOutsideToClose: true,
		    locals: {
		      combustible: combustible
		    }
		  }).then(function(data) {
        return api.combustibles.update(data);
      }).then(function() {
        utils.successToast('Combustible actualizado exitosamente!');
				$timeout($state.reload(), 4000);
			}).catch(function(err) {
        if (err === "closed-manually" || typeof(err) === 'undefined') return;
        utils.errorToast('Error al actualizar Combustible!');
      });
		}

    function showCreateForm(e) {
		  $mdDialog.show({
		    controller: 'CreateFormCombustiblesController',
		    controllerAs: 'vm',
		    templateUrl: 'app/main/autos/combustibles/dialogs/create-form/create-form.html',
		    parent: angular.element($document.body),
		    targetEvent: e,
		    clickOutsideToClose: true,
		  }).then(function(combustible) {
        return api.combustibles.create(combustible);
      }).then(function(res) {
        utils.successToast('Combustible creado exitosamente!');
				$timeout($state.reload(), 4000);
			}).catch(function(err) {
        if (err === "closed-manually" || typeof(err) === 'undefined') return;
        utils.errorToast('Error al crear Combustible!');
      });
		}

    function destroy(combustible) {
      swal(utils.swalDeleteObject({
        title: 'Seguro que quieres eliminar este Combustible?',
        preConfirm: function() {
          return api.combustibles.destroy(combustible);
        }
      })).then(function(res) {
        utils.removeObjectFromArray(vm.combustibles, combustible, 'id_combustible');
        $scope.$apply();
        swal({
          type: 'success',
          title: 'Se elimino el Combustible exitosamente!',
        });
      }).catch(function(err) {
        if (err === "cancel") return;
        swal({
          type: 'warning',
          title: 'Error al intentar eliminar el Combustible!',
          text: 'Intente de nuevo mas tarde.'
        });
      });
    }

  }
})();
