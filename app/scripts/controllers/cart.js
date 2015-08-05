(function () {
'use strict';
var module = angular.module('fim.base');

module.controller('CartCtrl', function($location, $q, $scope, modals, $routeParams, nxt, db, plugins, requests, $timeout, 
  ActivityProvider, MessagesProvider, BlocksProvider, AliasProvider, NamespacedAliasProvider, AssetsProvider, CurrencyProvider, AccountProvider, 
  BuyOrderProvider, SellOrderProvider, AccountPostProvider, AccountForgerProvider, AccountLessorsProvider, 
  dateParser, dateFilter, accountsService, PaymentsProvider, $rootScope, serverService, shoppingCartService) {

		$scope.id_rs          = $routeParams.id_rs;

		var api = nxt.get($scope.id_rs);
		console.log(api);

		$scope.shoppingCart = shoppingCartService.get();
		console.log($scope.shoppingCart);

		$scope.placeOrder = function() {
			$scope.shoppingCart.forEach(function(abc) {
				console.log(abc);
				var order_args = {
					requestType: "dgsPurchase",
					goods: abc.goods,
					quantity: '1',
					SecretPhrase: "I won't tell you",
					priceNQT: abc.priceNQT,
					deliveryDeadlineTimestamp: '1'
				}

				api.engine.socket().callAPIFunction(order_args).then(function(data) {
					console.log(data);
					$location.path('/accounts/'+$scope.id_rs+'/goods')
				})
			})
		}

		$scope.remove = function(index) {
			var abc = shoppingCartService.removeItem(index);
			$scope.shoppingCart.splice(index, 1);
		}
	});
})();


