/**
 * Created by Seamy on 7/19/2016.
 */

var emailModule = angular.module('emailMod', ['ui.bootstrap']);

console.log("Loading Email Mods");

emailModule.directive('inboxDirective', function inboxDirective() {



        return{

            restrict: 'EA',
            scope: true,
            replace: true,
            templateUrl: 'directives/inboxDirectiveTemplate.html',
            controller: 'inboxCtrl',
            controllerAs: 'inbox'

         }





});


emailModule.controller('inboxCtrl', function inboxCtrl(inboxFactory, $http) {

    'use strict';



    inboxFactory.gotMessages($http)
        .then(angular.bind(this, function then() {

            this.messages = inboxFactory.messages;
            this.messagesLength = this.messages.length;
            console.log(this.messages);


        }));

    this.deleteMessage = function(id, index){

        inboxFactory.deleteMessage(id, index);
    };

    this.goToMessage = function(id) {


        inboxFactory.goToMessage(id);

    };




    this.title = "Inbox";


});


emailModule.factory('inboxFactory', function inboxFactory ($http, $q, $location) {

    'use strict';

    var exports = {};



    exports.gotMessages = function($http) {

        var deferred = $q.defer();

           return $http.get('testData/inboxData.json')
                .success (function (data) {
              exports.messages = data;
              deferred.resolve(data);
               console.log('success');

          })

              .error(function (data){

                  deferred.reject(data);
                    console.log('error');


              });



    };



    exports.deleteMessage = function(index) {


        this.messages.splice(index, 1);

    };

    exports.goToMessage = function(id) {

      $location.path('inbox/email/' +id);

    };






    return exports;

});

emailModule.directive('emailDirective', function(){


    return{

        restrict: 'EA',
        scope: true,
        replace: true,
        templateUrl: 'directives/emailDirectiveTemplate.html',
        controller: 'emailViewCtrl',
        controllerAs: 'email'


    }



});


emailModule.controller('emailViewCtrl', function emailCtrl(emailFactory, $routeParams){





   emailFactory.getMessage($routeParams)
       .then(angular.bind(this, function then(){

            this.message = emailFactory.message;



       }))


});

emailModule.directive('replyEmailDirective', function(){

    return{

        restrict: 'EA',
        scope: true,
        replace: true,
        templateUrl: 'directives/replyDirectiveTemplate.html',
        controller: 'emailViewCtrl',
        controllerAs: 'email'

    }



});

emailModule.directive('forwardEmailDirective', function(){

    return{


        restrict: 'EA',
        scope: true,
        replace: true,
        templateUrl: 'directives/forwardDirectiveTemplate.html',
        controller: 'emailViewCtrl',
        controllerAs: 'email'


    }




});

emailModule.controller('emailReplyCtrl', function (emailFactory) {


});

emailModule.factory('emailFactory', function emailFactory($q, $http, $location) {

    'use strict';
    var exports2 = {};
    var resolve = $q.defer();






    exports2.getMessage = function(params) {

        if (params.id) {

            console.log(params.id);

            return $http.get('testData/inboxData.json')
                .success(function (data){

                    exports2.message = "";


                    for(var x = 0; x<= data.length; x++) {

                      if(data[x].id == params.id){

                          exports2.message = data[x];
                          console.log("this is my message", exports2.message);
                          break;

                      }
                    }

                    console.log("success");
                })
                .error(function (data) {

                    console.log("Error", data)
                })

        } else{

            console.log("problem with the param id")

        }

    };



    return exports2;


});