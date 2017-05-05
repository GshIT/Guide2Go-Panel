(function ()
{
    'use strict';

    angular
      .module('fuse')

      .constant('DtOptions', {
  			dom       : '<"top"f>rt<"bottom"<"left"<"length"l>><"right"<"info"i><"pagination"p>>>',
  			pagingType: 'simple',
  			autoWidth : false,
  			responsive: true,
        language: {
          "search":   "Buscar:",
          "info":     "Mostrando desde _START_ hasta  _END_, de _TOTAL_ registros",
          "lengthMenu":     "Mostrando _MENU_ registros",
          "paginate": {
            "first":    "Primera",
            "last":     "Pagina",
            "next":     "Proxima",
            "previous": "Anterior"
          },
          // "sInfo": "Showing _START_ to _END_ of _TOTAL_ entries"
        }
  		});
})();
