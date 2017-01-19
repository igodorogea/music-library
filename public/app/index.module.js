angular.module('musicLibrary',
  [
    'ngAnimate',
    'ngMessages',
    'ngAria',
    'ngResource',
    'ui.router',
    'ngMaterial',
    'angular-duration-format',
    'musicLibrary.artists',
    'musicLibrary.albums',
    'musicLibrary.songs'
  ])
  .config(routerConfig)

function routerConfig($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: '/',
      template: '<h1>Welcome</h1>'
    })

  $urlRouterProvider.otherwise('/')
}

routerConfig.$inject = ['$stateProvider', '$urlRouterProvider']
