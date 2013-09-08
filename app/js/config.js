
angular.module('project.config', [])
   .constant('version', '0.1')

   // end this with a trailing slash
   .constant('FIREBASE_URL', 'https://fit4.firebaseio.com/')

   .constant('authProviders', [
//      { id: 'persona',  name: 'Persona',  icon: 'icon-user'     },
//      { id: 'twitter',  name: 'Twitter',  icon: 'icon-twitter'  },
      { id: 'facebook', name: 'Facebook', icon: 'icon-facebook' },
//      { id: 'github',   name: 'GitHub',   icon: 'icon-github'   }
//         { id: 'email',    name: 'Email',    icon: 'icon-envelope' }
   ])

   .config(function($logProvider) {
      // uncomment to enable dev logging in the app
      //$logProvider.debugEnabled && $logProvider.debugEnabled(true);
   });