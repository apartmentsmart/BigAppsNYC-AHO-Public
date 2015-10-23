angular.module('application').factory('dataService', function($http){

	function async(endpoint, data){

		var promise = $http({
			url: endpoint,
			method: "GET",
			params: data
		}).then(function(response){

			return response.data;

		});

		return promise;

	}

	function push(endpoint, data){

		console.log(endpoint)
		console.log(data)
		var promise = $http({
			url:endpoint,
			method: "POST",
			data: data,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		}).then(function(response){
			console.log(response.data)

			return response.data;
		})

		return promise;

	}

	return { async:async, push:push };

})