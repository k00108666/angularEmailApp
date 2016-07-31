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
    var scrolled = false;


    document.getElementById("sts-container").onscroll = function(scrolled){
        gmailFactory.tblScrolled(scrolled);
        console.log("new scrolled value", scrolled);

           if(scrolled = true) {

               var oldNum = emailNum;
               emailNum = emailNum + 10;
               gmailFactory.getMail(emailNum, oldNum);


           }

        };

    this.search = "";

    var emailNum = 0;

    this.messages = gmailFactory.receivedMessages;

    this.authorize = function(){

           console.log("clicking");
           gmailFactory.gmailAuthorize();

       };

    this.getMail = function() {
        var oldNum = emailNum;
        emailNum = emailNum + 10;
        gmailFactory.getMail(emailNum, oldNum);

    };

    this.tblScrolled = function() {
    console.log(this.search);
      gmailFactory.tblScrolled();


    };




});





gmailMod.factory('gmailFactory', function gmailFactory(){
    var gmailExports = {};
    gmailExports.receivedMessages = [];




   gmailExports.gmailAuthorize = function gmail(event) {

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
           gapi.client.load('gmail', 'v1');
       }

       /**
        * Print all Labels in the authorized user's inbox. If no labels
        * are found an appropriate message is printed.
        */


   };



    gmailExports.getHeaders = function getHeaders(headers, index){

    };

    gmailExports.getMail = function getMail(maxResults, currentResultSize){


        console.log("entering display inbox");
        var request = gapi.client.gmail.users.messages.list({
            'userId': 'me',
            'labelIds': 'INBOX',
            'maxResults': maxResults
        });

        request.execute(function(response) {


            gmailExports.messages = response.messages;

            for(var x = currentResultSize; x<=gmailExports.messages.length; x++) {
                var messageRequest = gapi.client.gmail.users.messages.get({
                    'userId': 'me',
                    'id': gmailExports.messages[x].id
                });
                console.log(messageRequest);
                messageRequest.execute(appendMessageRow);
            }
        });



        function appendMessageRow (message){
            console.log("new email", message);
            gmailExports.receivedMessages.push(message);

        }


    };

    gmailExports.tblScrolled = function (){

        var table = document.getElementById("sts-container");
        if(table.scrollTop + table.offsetHeight >= table.scrollHeight ){



        }


    };


    return gmailExports;
});

