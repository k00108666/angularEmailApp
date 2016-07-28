/**
 * Created by Seamy on 7/19/2016.
 */


angular.module('seamysApp', ['ngRoute', 'smart-table', 'emailMod', 'gmailMod'])

.config(function($routeProvider) {

            'use strict';

        $routeProvider


            .when('/index.html', {

                templateUrl: 'views/inbox.html',
                controller: 'inboxCtrl',
                controllerAs: 'inbox'





            })



            .when('/inbox/email/:id', {


                templateUrl: 'views/email.html',
                controller: 'inboxCtrl',
                controllerAs: 'inbox'



            })



            .when('/inbox.html', {


                templateUrl: 'views/inbox.html',
                controller: 'inboxCtrl',
                controllerAs: 'inbox'


            })

            .when('/sentBox', {


                templateUrl: 'views/email.html',
                controller: 'senboxCtrl',
                controllerAs: 'sentbox'




            })

            .otherwise({

                redirectTo: '/inbox.html'


            })





    });



