(function() {
  'use strict';

  angular
    .module('app.dealers')
    .controller('DealersController', DealersController);

  /** @ngInject */
  function DealersController(
    $state, api, $document, $mdDialog, $mdToast,
    moment, utils, $timeout, $scope, dealers, DtOptions,
    GeolocationService, position
  ) {
    var vm = this;

    vm.dealers = dealers;
    vm.showEditForm = showEditForm;
    vm.showCreateForm = showCreateForm;
    vm.destroy = destroy;

    var currentPos = position;

    vm.dtOptions = DtOptions;

    function showEditForm(dealer, e) {
		  $mdDialog.show({
		    controller: 'EditFormDealersController',
		    controllerAs: 'vm',
		    templateUrl: 'app/main/dealers/dialogs/edit-form/edit-form.html',
		    parent: angular.element($document.body),
		    targetEvent: e,
		    clickOutsideToClose: true,
		    locals: {
		      dealer: dealer,
          position: currentPos
		    }
		  }).then(function(data) {
        return api.dealers.update(data);
      }).then(function() {
        utils.successToast('Dealer actualizado exitosamente!');
				$timeout($state.reload(), 4000);
			}).catch(function(err) {
        if (err === "closed-manually" || typeof(err) === 'undefined') return;
        utils.errorToast('Error al actualizar Dealer!');
      });
		}

    function showCreateForm(e) {
		  $mdDialog.show({
		    controller: 'CreateFormDealersController',
		    controllerAs: 'vm',
		    templateUrl: 'app/main/dealers/dialogs/create-form/create-form.html',
		    parent: angular.element($document.body),
		    targetEvent: e,
		    clickOutsideToClose: true,
        locals: {
          position: currentPos
        }
		  }).then(function(dealer) {
        return api.dealers.create(dealer);
      }).then(function(res) {
        utils.successToast('Dealer creado exitosamente!');
				$timeout($state.reload(), 4000);
			}).catch(function(err) {
        if (err === "closed-manually" || typeof(err) === 'undefined') return;
        utils.errorToast('Error al crear Dealer!');
      });
		}

    function destroy(dealer) {
      swal(utils.swalDeleteObject({
        title: 'Seguro que quieres eliminar este Dealer?',
        preConfirm: function() {
          return api.dealers.destroy(dealer);
        }
      })).then(function(res) {
        utils.removeObjectFromArray(vm.dealers, dealer, 'id_dealer');
        $scope.$apply();
        swal({
          type: 'success',
          title: 'Se elimino el Dealer exitosamente!',
        });
      }).catch(function(err) {
        if (err === "cancel") return;
        swal({
          type: 'warning',
          title: 'Error al intentar eliminar el Dealer!',
          text: 'Intente de nuevo mas tarde.'
        });
      });
    }

  }
})();
