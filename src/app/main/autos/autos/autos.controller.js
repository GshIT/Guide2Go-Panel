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
    DtOptions, $http, users
  ) {

    var vm = this;

    //vm.autos = autos;
    vm.users = users;
    vm.showEditForm = showEditForm;
    vm.showCreateForm = showCreateForm;
    vm.destroy = destroy;

    vm.dtOptions = DtOptions;

  
    function showEditForm(user, e) {
		  $mdDialog.show({
		    controller: 'EditFormAutosController',
		    controllerAs: 'vm',
		    templateUrl: 'app/main/autos/autos/dialogs/edit-form/edit-form.html',
		    parent: angular.element($document.body),
		    targetEvent: e,
		    clickOutsideToClose: true,
		    locals: {
		      user: user
		    }
		  }).then(function(res) {
        console.log(res);
        utils.successToast('Usuario actualizado exitosamente!');
				$timeout($state.reload(), 4000);
			}).catch(function(err) {
        if (err === "closed-manually" || typeof(err) === 'undefined') return;
        utils.errorToast('Error al actualizar el Usuario!');
      });
		}

    function showCreateForm(e, user) {
      user = user || {};
		  $mdDialog.show({
		    controller: 'CreateFormAutosController',
		    controllerAs: 'vm',
		    templateUrl: 'app/main/autos/autos/dialogs/create-form/create-form.html',
		    parent: angular.element($document.body),
		    targetEvent: e,
		    clickOutsideToClose: true,
        locals: {
          user: user
		    }
      }).then(function(res) {
        utils.successToast('Usuario creado exitosamente!');
				$timeout($state.reload(), 4000);
			}).catch(function(err) {
        if (err === "closed-manually" || typeof(err) === 'undefined') return;
        utils.errorToast('Error al crear Usuario!');
      });
		}

    function destroy(user) {
      swal(utils.swalDeleteObject({
        title: 'Seguro que quieres eliminar este Usuario?',
        preConfirm: function() {
          return api.users.destroy(user);
        }
      })).then(function(res) {
        console.log(res);
        utils.removeObjectFromArray(vm.users, user, 'id');
        console.log(res);
        $scope.$apply();
        swal({
          type: 'success',
          title: 'Se elimino el Usuario exitosamente!',
        });
      }).catch(function(err) {
        console.log(err);
        if (err === "cancel") return;
        swal({
          type: 'warning',
          title: 'Error al intentar eliminar el Usuario!',
          text: 'Intente de nuevo mas tarde.'
        });
      });
    }

  }
})();
