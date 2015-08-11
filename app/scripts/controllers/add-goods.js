(function () {
'use strict';
var module = angular.module('fim.base');

module.controller('AddGoodsCtrl', function($location, $q, $scope, modals, $routeParams, nxt, db, plugins, requests, $timeout, 
  ActivityProvider, MessagesProvider, BlocksProvider, AliasProvider, NamespacedAliasProvider, AssetsProvider, CurrencyProvider, AccountProvider, 
  BuyOrderProvider, SellOrderProvider, AccountPostProvider, AccountForgerProvider, AccountLessorsProvider, 
  dateParser, dateFilter, accountsService, PaymentsProvider, $rootScope, serverService) {

    $scope.id_rs          = $routeParams.id_rs;

    var api = nxt.get($scope.id_rs);
    console.log(api);

    $scope.showError = false;
    $scope.isNumber = false;
    

      $scope.saveGoods = function(goods){

      //   api.engine.socket().getAccount({
      //     'account': $scope.id_rs
      //   }).then(function(accountData) {
      //     $scope.accountInfo = accountData;
      //     console.log($scope.accountInfo);

        var args = {
          // secretPhrase: $rootScope.currentAccount.secretPhrase,
          requestType: 'dgsListing',
          name: goods.name,
          description: goods.description,
          tags: goods.tags,
          quantity: goods.quantity,
          priceNQT: goods.pricenqt
          // deadline: '60',
          // feeNQT: '100000000'
        }

      //   api.engine.socket().callAPIFunction(args).then(function(data) { 
      //     console.log(data);
      //     if(data.errorCode == 3){
      //       console.log('Error');
      //       $scope.showError = true;
      //       $scope.isNumber = false;
      //     }
      //     else if(data.errorCode == 4) {
      //       $scope.showError = false;
      //       $scope.isNumber = true;
      //     }
      //     else {
      //       $location.path('/accounts/'+$scope.id_rs+'/goods'); 
      //     }
      //   })        
      // })

          plugins.get('transaction').get('dgsListing').execute($scope.id_rs, args)

          $location.path('/accounts/'+$scope.id_rs+'/goods');
    }

  });
})();