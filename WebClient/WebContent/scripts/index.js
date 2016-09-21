(function() {
	var app = angular.module('index', [ 'ngCookies', 'angular-jwt' ]);
	app
			.controller(
					'indexController',
					function($scope, $http, $cookies, jwtHelper) {

						this.username = "";
						this.password = "";
						this.result;
						this.resultAuth;

						if ($cookies.get("access_token")) {
							$http.defaults.headers.common.Authorization = 'Bearer '
									+ $cookies.get("access_token");
							// getOrganization();
						}

						this.login = function() {

							var tmp = this;
							// var credential = {username : tmp.username,
							// password:
							// tmp.password}

							// console.log(credential);
							// console.log(JSON.stringify(credential));

							var data = $.param({
								username : tmp.username,
								password : tmp.password
							});

							$http(
									{
										method : "POST",
										url : "http://localhost:8080/AuthService/AuthenticationService",
										headers: {'content-type' : 'application/x-www-form-urlencoded'},
										data : data
									})
									.success(
											function(data, status, headers,
													config) {
												console.log(data);
												$http.defaults.headers.common.Authorization = 'Bearer '
														+ data.username;
												var expiredDate = new Date(
														new Date().getTime() + 300000);
												$cookies
														.put(
																"access_token",
																data.username,
																{
																	'expires' : expiredDate
																});
												tmp.result = data;
												window.location.href = "Index.html"
											}).error(function(message) {
										console.log(message);
									});

							this.reset();
						};

						this.reset = function() {
							this.username = "";
							this.password = "";
							this.result = "";
							this.resultAuth = "";
							$cookies.remove("access_token");
						};

						function getOrganization() {
							var token = $cookies.get("access_token");
							var payload = jwtHelper.decodeToken(token);
							console.log(payload);
							$scope.organization = payload.organization;

							/*
							 * $http.get("http://localhost:8081/spring-security-oauth-resource/users/extra")
							 * .then(function(response) { console.log(response);
							 * $scope.organization = response.data.organization;
							 * });
							 */
						}

						this.get = function() {
							var tmp = this;
							$http(
									{
										method : "GET",
										url : "http://localhost:8080/ApiService/myresource",
										headers: {'Authorization' : $cookies.get("access_token")}
									}).success(
									function(data, status, headers, config) {
										tmp.result = data;
									}).error(function(data) {
								console.log(data);
							});
						};
						
						this.getAuth = function() {
							var tmp = this;
							$http(
									{
										method : "GET",
										url : "http://localhost:8080/ApiService/ReconService",
										headers: {'Authorization' : $cookies.get("access_token")}
									}).success(
									function(data, status, headers, config) {
										tmp.resultAuth = data.Test;
									}).error(function(data) {
										tmp.resultAuth  = data;
								console.log(data);
							});
						};

					})
})();