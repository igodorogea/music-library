;(function () {
  angular.module('musicLibrary.artists', [])
    .config(routerConfig)

  function routerConfig ($stateProvider) {
    $stateProvider
      .state('artists', {
        url: '/artists',
        templateUrl: 'app/artists/list.html',
        controller: ArtistsController,
        controllerAs: 'vm'
      })
      .state('artists_add', {
        url: '/artists/add',
        templateUrl: 'app/artists/add.html',
        controller: ArtistsController,
        controllerAs: 'vm'
      })
      .state('artists_edit', {
        url: '/artists/:id/edit',
        templateUrl: 'app/artists/edit.html',
        controller: ArtistsController,
        controllerAs: 'vm'
      })
  }

  routerConfig.$inject = ['$stateProvider']

  function ArtistsController ($resource, $state, $stateParams) {
    const ctrl = this
    const ArtistResource = $resource('/api/artists/:id', null, {
      update: {method: 'PUT'},
      query: {method: 'GET', isArray: true}
    })

    ctrl.initList = () => {
      ctrl.artists = ArtistResource.query()
    }

    ctrl.create = (artist) => {
      ArtistResource
        .save(artist)
        .$promise
        .then((artist) => {
          $state.go('artists')
        })
    }

    ctrl.initEdit = () => {
      ctrl.artist = ArtistResource.get({id: $stateParams.id})
    }

    ctrl.update = (artist) => {
      ArtistResource
        .update({id: artist.id}, artist)
        .$promise
        .then((artist) => {
          $state.go('artists')
        })
    }

    ctrl.remove = (id) => {
      ArtistResource
        .remove({id: id})
        .$promise
        .then(() => {
          $state.reload()
        })
    }
  }

  ArtistsController.$inject = ['$resource', '$state', '$stateParams']
})()
