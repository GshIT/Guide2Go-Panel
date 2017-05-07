(function() {
  'use strict';

  angular
    .module('app.autos.marcas')
    .controller('MarcasController', MarcasController);

  /** @ngInject */
  function MarcasController(
    $state, api, $document, $mdDialog, $mdToast, moment, $timeout, $scope, utils, DtOptions, subzonas, paradas
  ) {
    var vm = this;

    vm.showEditForm = showEditForm;
    vm.showCreateForm = showCreateForm;
    vm.destroy = destroy;
    vm.paradas = paradas;
    vm.removeObjectFromArray = utils.removeObjectFromArray;

    vm.dtOptions = DtOptions;

    function showEditForm(marca, e) {
		  $mdDialog.show({
		    controller: 'EditFormMarcasController',
		    controllerAs: 'vm',
		    templateUrl: 'app/main/autos/marcas/dialogs/edit-form/edit-form.html',
		    parent: angular.element($document.body),
		    targetEvent: e,
		    clickOutsideToClose: true,
		    locals: {
		      marca: marca
		    }
		  }).then(function() {
				$mdToast.show(
					$mdToast.simple()
						.textContent("Marca actualizada exitosamente!")
						.toastClass("toast-successfully")
						.hideDelay(3000)
				);
				$timeout(function() {
					$state.reload();
				}, 2000);
			}).catch(function(err) {
        if (err === "closed-manually" || typeof(err) === 'undefined') return;
        $mdToast.show(
					$mdToast.simple()
		        .textContent("Error al actualizar marca!")
	          .toastClass("toast-error")
            .hideDelay(3000)
				);
      });
		}

    function showCreateForm(e, marca) {
      marca = marca || {};
		  $mdDialog.show({
		    controller: 'CreateFormMarcasController',
		    controllerAs: 'vm',
		    templateUrl: 'app/main/autos/marcas/dialogs/create-form/create-form.html',
		    parent: angular.element($document.body),
		    targetEvent: e,
		    clickOutsideToClose: true,
        locals: {
          subzonas: subzonas
        }
		  }).then(function(res) {
        $mdToast.show(
          $mdToast.simple()
            .textContent("Parada creada de manera exitosa!")
            .toastClass("toast-successfully")
            .hideDelay(3000)
        );
        $timeout($state.reload, 2000);
      }).catch(function (err) {
        if (err === "closed-manually" || typeof(err) === 'undefined') return;
        console.log(err);
        $mdToast.show(
          $mdToast.simple()
            .textContent("Error al crear la Parada")
            .toastClass("toast-error")
            .hideDelay(3000)
        );
      });
		}

    function destroy(marca) {
      swal(utils.swalDeleteObject({
        title: 'Seguro que quieres eliminar esta marca?',
        preConfirm: function() {
          return api.marcas.destroy(marca);
        }
      })).then(function(res) {
        vm.removeObjectFromArray(vm.marcas, marca, 'id_marca');
        $scope.$apply();
        swal({
          type: 'success',
          title: 'Se elimino la marca exitosamente!',
        });
      }).catch(function(err) {
        if (err === "cancel") return;
        swal({
          type: 'warning',
          title: 'Error al intentar eliminar la marca!',
          text: 'Intente de nuevo mas tarde.'
        });
      });
    }
  }
})();
