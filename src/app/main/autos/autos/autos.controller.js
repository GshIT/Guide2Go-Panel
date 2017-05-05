(function() {
  'use strict';

  angular
    .module('app.autos.autos')
    .controller('AutosController', AutosController);

  /** @ngInject */
  function AutosController(
    autos, $state, api, $document, $mdDialog, $mdToast,
    moment, utils, $timeout, $scope,
    marcas, tipos, subtipos, versiones, combustibles, motores,
    DtOptions
  ) {

    var vm = this;

    vm.autos = autos;
    vm.showEditForm = showEditForm;
    vm.showCreateForm = showCreateForm;
    vm.destroy = destroy;

    vm.dtOptions = DtOptions;

    function showEditForm(auto, e) {
		  $mdDialog.show({
		    controller: 'EditFormAutosController',
		    controllerAs: 'vm',
		    templateUrl: 'app/main/autos/autos/dialogs/edit-form/edit-form.html',
		    parent: angular.element($document.body),
		    targetEvent: e,
		    clickOutsideToClose: true,
		    locals: {
		      auto: auto,
          marcas: marcas,
          tipos: tipos,
          subtipos: subtipos,
          versiones: versiones,
          combustibles: combustibles,
          motores: motores
		    }
		  }).then(function(answer) {
        return api.autos.update(answer);
      }).then(function() {
        if (auto.file.length < 1) return false;
        var formData = new FormData();
        formData.append('id_auto', auto.id_auto);
        formData.append('archivo', auto.file[0].lfFile);
        return api.autos.updateImage(formData);
      }).then(function() {
        utils.successToast('Auto actualizado exitosamente!');
				$timeout($state.reload(), 4000);
			}).catch(function(err) {
        if (err === "closed-manually" || typeof(err) === 'undefined') return;
        utils.errorToast('Error al actualizar el Auto!');
      });
		}

    function showCreateForm(e, auto) {
      auto = auto || {};
		  $mdDialog.show({
		    controller: 'CreateFormAutosController',
		    controllerAs: 'vm',
		    templateUrl: 'app/main/autos/autos/dialogs/create-form/create-form.html',
		    parent: angular.element($document.body),
		    targetEvent: e,
		    clickOutsideToClose: true,
        locals: {
          auto: auto,
          marcas: marcas,
          tipos: tipos,
          subtipos: subtipos,
          versiones: versiones,
          combustibles: combustibles,
          motores: motores
		    }
      }).then(function(res) {
        utils.successToast('Auto creado exitosamente!');
				$timeout($state.reload(), 4000);
			}).catch(function(err) {
        if (err === "closed-manually" || typeof(err) === 'undefined') return;
        utils.errorToast('Error al crear Auto!');
      });
		}

    function destroy(auto) {
      swal(utils.swalDeleteObject({
        title: 'Seguro que quieres eliminar este Auto?',
        preConfirm: function() {
          return api.autos.destroy(auto);
        }
      })).then(function(res) {
        utils.removeObjectFromArray(vm.autos, auto, 'id_auto');
        $scope.$apply();
        swal({
          type: 'success',
          title: 'Se elimino el Auto exitosamente!',
        });
      }).catch(function(err) {
        if (err === "cancel") return;
        swal({
          type: 'warning',
          title: 'Error al intentar eliminar el Auto!',
          text: 'Intente de nuevo mas tarde.'
        });
      });
    }

  }
})();
