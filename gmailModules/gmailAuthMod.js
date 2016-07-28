/**
 * Created by Seamy on 7/27/2016.
 */
var gmailMod =  angular.module('gmailMod', []);

gmailMod.directive('gmailTable', function() {


    return{


        restrict: 'EA',
        replace: true,
        scope: true,
        templateUrl: 'directives/emailTableTemplate.html',
        controller: 'gmailCtrl',
        controllerAs: 'gmail'

    }


});

gmailMod.controller('gmailCtrl',function gmailCtrl(gmailFactory){
    this.messages = gmailFactory.receivedMessages;

       this.authorize = function(){

           console.log("clicking");
           gmailFactory.gmailAuthorize();

       };

        this.getInbox = function() {

            console.log(this.messages[1]);

        }




});





gmailMod.factory('gmailFactory', function gmailFactory(){
    var gmailExports = {};
    gmailExports.receivedMessages = [];



   gmailExports.gmailAuthorize = function gmail(event) {
       console.log("entering authorization");
       var CLIENT_ID = '228281290720-vnh3s84bnht5mrglpafggne34edpi1a7.apps.googleusercontent.com';

       var SCOPES = ['https://www.googleapis.com/auth/gmail.compose'];
   handleAuthClick(event);



       /**
        * Check if current user has authorized this application.
        */
       function checkAuth() {
           gapi.auth.authorize(
               {
                   'client_id': CLIENT_ID,
                   'scope': SCOPES.join(' '),
                   'immediate': true
               }, handleAuthResult);
           console.log("gapi.auth");
       }

       /**
        * Handle response from authorization server.
        *
        * @param {Object} authResult Authorization result.
        */
       function handleAuthResult(authResult) {

           if (authResult && !authResult.error) {
               // Hide auth UI, then load client library.

               loadGmailApi();
               console.log("handleAuth");
           } else {
               // Show auth UI, allowing the user to initiate authorization by
               // clicking authorize button.

           }
       }

       /**
        * Initiate auth flow in response to user clicking authorize button.
        *
        * @param {Event} event Button click event.
        */
       function handleAuthClick(event) {
           gapi.auth.authorize(
               {client_id: CLIENT_ID, scope: SCOPES, immediate: false},
               handleAuthResult);
           return false;
       }

       /**
        * Load Gmail API client library. List labels once client library
        * is loaded.
        */
       function loadGmailApi() {
           gapi.client.load('gmail', 'v1', listLabels);
       }

       /**
        * Print all Labels in the authorized user's inbox. If no labels
        * are found an appropriate message is printed.
        */
       function listLabels() {
           var request = gapi.client.gmail.users.labels.list({
               'userId': 'me'
           });

           request.execute(function(resp) {
               var labels = resp.labels;
                this.lables = labels;

               if (labels && labels.length > 0) {
                   for (i = 0; i < labels.length; i++) {
                       var label = labels[i];
                       console.log(label.name)

                   }
               } else {
                   console.log('No Labels found.');
               }

               displayInbox();
           });
       }

       function displayInbox() {
           console.log("entering display inbox");
           var request = gapi.client.gmail.users.messages.list({
               'userId': 'me',
               'labelIds': 'INBOX',
               'maxResults': 10
           });

           request.execute(function(response) {


              gmailExports.messages = response.messages;
               console.log("entered request.excuse", gmailExports.messages);


               for(var x = 0; x<=gmailExports.messages.length; x++) {


                   var messageRequest = gapi.client.gmail.users.messages.get({
                       'userId': 'me',
                       'id': gmailExports.messages[x].id
                   });

                   messageRequest.execute(appendMessageRow);


               }



           });
       }


       function appendMessageRow (message){

        gmailExports.receivedMessages.push(message);

       }




   };

    gmailExports.getInbox =  function getInbox(){

            console.log("executing");


            var request = gapi.client.gmail.users.messages.list({
                'userId': 'me',
                'labelIds': 'INBOX',
                'maxResults': 10
            });

            request.execute(function(resp) {
                var content = document.getElementById("message-list");
                angular.forEach(resp, function(message) {
                    var email = gapi.client.gmail.users.messages.get({'id': message.id});
                    // var raw = email.payload.parts;
                    // console.log(raw);
                    content.innerHTML += JSON.stringify(email) + "<br>";
                })
            });




    };

    gmailExports.getHeaders = function getHeaders(headers, index){




    };
    return gmailExports;
});