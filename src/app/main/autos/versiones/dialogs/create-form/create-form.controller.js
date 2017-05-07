(function() {
  'use strict';

  angular
    .module('app.autos.versiones')
    .controller('CreateFormVersionesController', CreateFormVersionesController)

  /** @ngInject */
  function CreateFormVersionesController($scope, $mdDialog, paradas, api, Upload) {
    var vm = this;

    vm.close = close;
    vm.save = save;
    vm.version = {};

    vm.audio = {};
    vm.paradas = paradas;
    vm.audio.spot = 1;
    vm.audio.lang = 1;

    $scope.submit = function() {
      if ($scope.form.file.$valid && $scope.file) {
        $scope.upload($scope.file);
      }
    };

    // upload on file select or drop
    $scope.upload = function (file) {
        Upload.upload({
            url: 'http://digitalcook.info:8000/api/audio?token='+localStorage.getItem('token'),
            data: {aud: file, spot: vm.audio.spot, lang: vm.audio.lang,}
        }).then(function (resp) {
            console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
        }, function (resp) {
            console.log(resp);
        }, function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% '); 
            vm.load = progressPercentage + '%';
        });
    };

    function save() {

      let localAudio = vm.audio;

      vm.creating = true;
      api.audios.create(localAudio).then(function(res) {
        var data = res.data;
        return res;
      }).then(function(res) {
        $mdDialog.hide(res);
      });
    }

    function close() {
      $mdDialog.cancel('closed-manually');
    }
  }


})();
