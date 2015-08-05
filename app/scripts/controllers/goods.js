(function () {
'use strict';
var module = angular.module('fim.base');

module.controller('GoodsCtrl', function($location, $q, $scope, modals, $routeParams, nxt, db, plugins, requests, $timeout, 
  ActivityProvider, MessagesProvider, BlocksProvider, AliasProvider, NamespacedAliasProvider, AssetsProvider, CurrencyProvider, AccountProvider, 
  BuyOrderProvider, SellOrderProvider, AccountPostProvider, AccountForgerProvider, AccountLessorsProvider, 
  dateParser, dateFilter, accountsService, PaymentsProvider, $rootScope, serverService, shoppingCartService) {

		$scope.id_rs          = $routeParams.id_rs;

		var api = nxt.get($scope.id_rs);
		console.log(api);

		$scope.shoppingCart = shoppingCartService.get();
		console.log($scope.shoppingCart);

		var getAllGoodsargs = {
			requestType: 'getDGSGoods',
			seller: $scope.id_rs
		}
		api.engine.socket().callAPIFunction(getAllGoodsargs).then(function(data) {
			console.log(data);
			$scope.allGoods = data.goods;
			console.log($scope.allGoods.goods);
		})


		$scope.deleteGood = function(good) {
			console.log(good);
			 api.engine.socket().getAccount({
	          'account': $scope.id_rs
	        }).then(function(data) {
	          $scope.accountInfo = data;
	          console.log(data);
				var deleteGoodArgs = {
					requestType: 'dgsDelisting',
					goods: good.goods,
					publicKey: $scope.accountInfo.publicKey,
					deadline: '60',
					feeNQT: '100000000'
				}
				api.engine.socket().callAPIFunction(deleteGoodArgs).then(function(data) {
					console.log(data);
				}, function(err) {
					console.log(err);
				})
			}, function(err) {
				console.log(err);
			})
		}

		$scope.details = function(goodsDetails) {
			console.log(goodsDetails);
			$location.path('/accounts/'+$scope.id_rs+'/goods/'+goodsDetails.goods+'/details');
		}

	});
})();