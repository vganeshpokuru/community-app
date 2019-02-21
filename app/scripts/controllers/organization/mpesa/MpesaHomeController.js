(function (module) {
    mifosX.controllers = _.extend(module, {
        MpesaHomeController: function (scope, routeParams, route, location, resourceFactory, http, $uibModal, API_VERSION, $rootScope, Upload) {
            scope.isWalletNumberVerified = false;
            scope.isMobileNumberVerified = false;
            scope.isGeneratedStringVerified = false;
            scope.proceedToBankTransaction = false;
            scope.ministatement = [{}];
            scope.balanceDetails = {};
            scope.proceedToWalletBankTransaction = false;
            scope.transactionDetails = {};
            scope.freezTransactionDetails = false;
            scope.bankDetails = [];
            scope.responseDataSaved;
            scope.getbankdetails = function(){
              resourceFactory.mpesaBankResource.getBankDetails({},{},function (data) {
                  scope.bankDetails = data;
              });
            };
            scope.verifympesanumber = function(){
                scope.isWalletNumberVerified = false;
                scope.isMobileNumberVerified = false;
                resourceFactory.mpesaVerifyResource.verify({},this.formdata,function(data){
                    scope.isWalletNumberVerified = data.isWalletVerified;
                    scope.isMobileNumberVerified = data.isMobileVerified;
                    scope.responseDataSaved = data.generateString;
                });
            };
            scope.ResetAllVariables = function(){
                scope.isWalletNumberVerified = false;
                scope.isMobileNumberVerified = false;
                scope.isGeneratedStringVerified = false;
                scope.proceedToBankTransaction = false;
                scope.proceedToWalletBankTransaction = false;
                scope.freezTransactionDetails = false;
            };
            scope.verifygeneratedString = function(){
                if(this.formdata.generatedString == scope.responseDataSaved){
                    scope.isGeneratedStringVerified = true;
                }
            };
            scope.getMpesaStatement = function(){
                scope.ministatement = [{}];
                resourceFactory.mpesaMiniStatementResource.getMiniStatement({},{},function(data){
                    scope.ministatement = data;
                });
            };
            scope.checkMpesaBalance = function(){
                scope.balanceDetails = {};
                resourceFactory.mpesaBalanceResource.getBalance({},{},function(data){
                    scope.balanceDetails = data;
                });
            };
            scope.proceedtobanktransaction = function() {
                scope.proceedToWalletBankTransaction = true;
                scope.getbankdetails();
            };
            scope.doMpesaBankTransaction = function(){
                scope.freezTransactionDetails = true;
                resourceFactory.mpesaTransactionResource.doTransaction({},this.formdata,function(data){
                    scope.transactionDetails = data;
                });
            };
            scope.goBack = function(){
              location.path("/organization");
            };
        }
    });
    mifosX.ng.application.controller('MpesaHomeController', ['$scope', '$routeParams', '$route', '$location', 'ResourceFactory', '$http', '$uibModal', 'API_VERSION', '$rootScope', 'Upload', mifosX.controllers.MpesaHomeController]).run(function ($log) {
        $log.info("MpesaHomeController initialized");
    });
}(mifosX.controllers || {}));