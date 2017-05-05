(function() {
  'use strict';

  angular.module('fuse').config(config);

  /** @ngInject */
  function config($translateProvider, $httpProvider) {
    // Put your common app configurations here

    // angular-translate configuration
    $translateProvider.useLoader('$translatePartialLoader', {urlTemplate: '{part}/i18n/{lang}.json'});
    $translateProvider.preferredLanguage('en');
    $translateProvider.useSanitizeValueStrategy('sanitize');

    // $httpProvider.defaults.headers.common = {};
    // $httpProvider.defaults.headers.post = {};
    // $httpProvider.defaults.headers.put = {};
    // $httpProvider.defaults.headers.patch = {};
  }

})();
