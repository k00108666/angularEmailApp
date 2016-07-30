/**
 * Created by Seamy on 7/19/2016.
 */


angular.module('seamysApp', ['ui.router', 'smart-table', 'emailMod', 'gmailMod'])

.config(function($stateProvider, $urlRouterProvider) {

            'use strict';

        $urlRouterProvider.otherwise("/inbox.html");

        $stateProvider
            .state('index', {
                url: "/index",
                templateUrl: 'angularJsGmailApp/views/inbox.html',
                controller: 'inboxCtrl',
                controllerAs: 'inbox'
            })
            .state('emailId', {

                templateUrl: 'angularJsGmailApp/views/email.html',
                controller: 'inboxCtrl',
                controllerAs: 'inbox'
            })
            .state('inbox', {
                url: '/inbox.html',
                templateUrl: 'views/inbox.html',
                controller: 'inboxCtrl',
                controllerAs: 'inbox'

            })



    });



