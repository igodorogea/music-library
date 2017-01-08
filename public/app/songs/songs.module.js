;(function () {
  angular.module('musicLibrary.songs', [])
    .config(routerConfig)

  function routerConfig ($stateProvider) {
    $stateProvider
      .state('songs', {
        url: '/songs',
        templateUrl: 'app/songs/list.html',
        controller: SongsController,
        controllerAs: 'vm'
      })
      .state('songs_add', {
        url: '/songs/add',
        templateUrl: 'app/songs/add.html',
        controller: SongsController,
        controllerAs: 'vm'
      })
      .state('songs_edit', {
        url: '/songs/:id/edit',
        templateUrl: 'app/songs/edit.html',
        controller: SongsController,
        controllerAs: 'vm'
      })
  }

  routerConfig.$inject = ['$stateProvider']

  function SongsController ($resource, $state, $stateParams) {
    const ctrl = this
    const SongResource = $resource('/api/songs/:id', null, {update: {method: 'PUT'}})

    ctrl.initList = () => {
      ctrl.songs = SongResource.query()
    }

    ctrl.create = (song, form) => {
      if (isValid(form)) {
        SongResource
          .save(song)
          .$promise
          .then(() => {
            $state.go('songs')
          })
      }
    }

    ctrl.initAlbums = () => {
      ctrl.albums = $resource('/api/albums/:id').query()
    }

    ctrl.initEdit = () => {
      ctrl.initAlbums()
      ctrl.song = SongResource.get({id: $stateParams.id})
    }

    ctrl.update = (song, form) => {
      if (isValid(form)) {
        SongResource
          .update({id: song.id}, song)
          .$promise
          .then(() => {
            $state.go('songs')
          })
      }
    }

    ctrl.remove = (id) => {
      SongResource
        .remove({id: id})
        .$promise
        .then(() => {
          $state.reload()
        })
    }

    function isValid (form) {
      return form.$valid && form.$dirty && form.albumId.$valid
    }
  }

  SongsController.$inject = ['$resource', '$state', '$stateParams']
})()
