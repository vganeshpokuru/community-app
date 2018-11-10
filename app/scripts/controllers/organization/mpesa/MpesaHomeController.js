(function (module) {
    mifosX.controllers = _.extend(module, {
        MpesaHomeController: function (scope, routeParams, route, location, resourceFactory, http, $uibModal, API_VERSION, $rootScope, Upload) {
            scope.isWalletNumberVerified = false;
            scope.proceedToBankTransaction = false;
            scope.ministatement = [{}];
            scope.balanceDetails = {};
            scope.proceedToWalletBankTransaction = false;
            scope.transactionDetails = {};
            scope.freezTransactionDetails = false;
            scope.verifympesanumber = function(){
                scope.isWalletNumberVerified = false;
                resourceFactory.mpesaVerifyResource.verify({},this.formdata,function(data){
                    scope.isWalletNumberVerified = data.isVerified;
                });
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