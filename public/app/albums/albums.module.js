;(function () {
  /* global angular */
  angular.module('musicLibrary.albums', [])
    .config(routerConfig)

  function routerConfig ($stateProvider) {
    $stateProvider
      .state('albums', {
        url: '/albums',
        templateUrl: 'app/albums/list.html',
        controller: AlbumsController,
        controllerAs: 'vm'
      })
      .state('albums_add', {
        url: '/albums/add',
        templateUrl: 'app/albums/add.html',
        controller: AlbumsController,
        controllerAs: 'vm'
      })
      .state('albums_edit', {
        url: '/albums/:id/edit',
        templateUrl: 'app/albums/edit.html',
        controller: AlbumsController,
        controllerAs: 'vm'
      })
  }

  routerConfig.$inject = ['$stateProvider']

  function AlbumsController ($resource, $state, $stateParams) {
    const ctrl = this
    const AlbumResource = $resource('/api/albums/:id', null, {update: {method: 'PUT'}})

    ctrl.initList = () => {
      ctrl.albums = AlbumResource.query()
    }

    ctrl.create = (album, form) => {
      if (isValid(form)) {
        AlbumResource
          .save(album)
          .$promise
          .then(() => {
            $state.go('albums')
          })
      }
    }

    ctrl.initArtists = () => {
      ctrl.artists = $resource('/api/artists/:id').query()
    }

    ctrl.initEdit = () => {
      ctrl.initArtists()
      ctrl.album = AlbumResource.get({id: $stateParams.id})
    }

    ctrl.update = (album, form) => {
      if (isValid(form)) {
        AlbumResource
          .update({id: album.id}, album)
          .$promise
          .then(() => {
            $state.go('albums')
          })
      }
    }

    ctrl.remove = (id) => {
      AlbumResource
        .remove({id: id})
        .$promise
        .then(() => {
          $state.reload()
        })
    }

    function isValid (form) {
      return form.$valid && form.$dirty && form.artistId.$valid
    }
  }

  AlbumsController.$inject = ['$resource', '$state', '$stateParams']
})()
