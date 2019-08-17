angular.module('app.controllers', [])
  
.controller('homeCtrl', ['$scope', '$stateParams', '$state', '$ionicLoading', '$http', '$ionicPopup', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state, $ionicLoading, $http, $ionicPopup) {

	$scope.dados = [];

	$scope.init = function(){
		$ionicLoading.show();
			
		var data = $.param({});
		$http.post(URL_SERVIDOR + 'sliders', data, APP_REQUEST).then(function(response){
			$ionicLoading.hide();
			if(response.data.error){
				$ionicPopup.alert({
	              title: APP_TITULO,
	              content: response.data.msg
	            });
	            return;
			}
			$scope.dados.lista_slider = response.data.posts;
		}, function(error){
			console.log(error);
			$ionicPopup.alert({
              title: APP_TITULO,
              content: error.statusText
            });
            $ionicLoading.hide();
		});
	};

	$scope.init();

}])
   
.controller('jobsCtrl', ['$scope', '$stateParams', '$state', '$ionicLoading', '$http', '$ionicPopup', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state, $ionicLoading, $http, $ionicPopup) {

	$scope.dados = [];

	$scope.init = function(){
		$ionicLoading.show();
			
		var data = $.param({});
		$http.post(URL_SERVIDOR + 'jobs', data, APP_REQUEST).then(function(response){
			$ionicLoading.hide();
			if(response.data.error){
				$ionicPopup.alert({
	              title: APP_TITULO,
	              content: response.data.msg
	            });
	            return;
			}
			$scope.dados.lista_jobs = response.data.posts;
		}, function(error){
			console.log(error);
			$ionicPopup.alert({
              title: APP_TITULO,
              content: error.statusText
            });
            $ionicLoading.hide();
		});
	};

	$scope.formData = function(data){
		var arrayData = data.split("-");
		return arrayData[2]+"/"+arrayData[1]+"/"+arrayData[0];
	};

	$scope.formHora = function(hora){
		var arrayHora = hora.split(":");
		return arrayHora[0]+":"+arrayHora[1];
	};

	$scope.init();

}])
   
.controller('perfilCtrl', ['$scope', '$stateParams', '$state', '$ionicLoading', '$http', '$ionicPopup', '$sce', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state, $ionicLoading, $http, $ionicPopup, $sce) {

	$scope.dados = [];

	$scope.init = function(){
		var GDE_USER = localStorage.getItem('GDE_USER');
		var data = $.param({
            user_id: GDE_USER
        });
		$ionicLoading.show();
		$http.post(URL_SERVIDOR + 'dados_user', data, APP_REQUEST).then(function(response){
			$ionicLoading.hide();
			if(response.data.error){
				$ionicPopup.alert({
	              title: APP_TITULO,
	              content: response.data.msg
	            });
	            return;
			}
			$scope.dados.lista_user = response.data;
		}, function(error){
			$ionicPopup.alert({
              title: APP_TITULO,
              content: error
            });
            $ionicLoading.hide();
		});
	};

	$scope.idade = function(nascimento){
		if(nascimento){
			var arrayNascimento = nascimento.split("-");
			var idade = "";

			var dateObj = new Date();
			var month = dateObj.getUTCMonth() + 1; //months from 1-12
			var day = dateObj.getUTCDate()-1;
			var year = dateObj.getUTCFullYear();

			if(arrayNascimento[1] <= month && arrayNascimento[2] <= day){
				idade = (year - arrayNascimento[0]) + " anos - " + arrayNascimento[2] + "/" + arrayNascimento[1] + "/" + arrayNascimento[0];
			}else{
				idade = ((year-1) - arrayNascimento[0]) + " anos - " + arrayNascimento[2] + "/" + arrayNascimento[1] + "/" + arrayNascimento[0];
			}
			return idade;
		}		
	};

	$scope.sair = function(){
		var confirmPopup = $ionicPopup.confirm({
	       title: APP_TITULO,
	       template: 'Realmente deseja sair?',
	       buttons: [{text:'Não'}, {
	       	text:'Sim',
	       	type: 'button-positive',
           	onTap: function(e) {
           		localStorage.clear();
           		$state.go('login', null);
           	}
	       }]
	    });
	};

	$scope.imgPerfil = function(path){
		return $sce.trustAsResourceUrl('https://galeradeeventos.com.br/uploads/' + path);
	};

	$scope.init();

}])
      
.controller('menuCtrl', ['$scope', '$stateParams', '$state', '$ionicLoading', '$http', '$ionicPopup', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('loginCtrl', ['$scope', '$stateParams', '$state', '$ionicLoading', '$http', '$ionicPopup', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state, $ionicLoading, $http, $ionicPopup) {

	$scope.dados = [];

	$scope.init = function(){
		var GDE_USER = localStorage.getItem('GDE_USER');
		if(GDE_USER != null){
			$state.go('tabs.home', null);
		}else{
			$state.go('login', null);
		}
	};

	$scope.entrar = function(){
		$ionicLoading.show();
		if($scope.dados.email && $scope.dados.senha){
			
			var data = $.param({
	            email: $scope.dados.email,
	            senha: $scope.dados.senha
	        });

			$http.post(URL_SERVIDOR + 'login', data, APP_REQUEST).then(function(response){
				$ionicLoading.hide();
				if(response.data.error){
					$ionicPopup.alert({
		              title: APP_TITULO,
		              content: response.data.msg
		            });
		            return;
				}
				localStorage.setItem('GDE_USER', JSON.stringify(response.data.user_id));
				$state.go('tabs.home', null);
			}, function(error){
				$ionicPopup.alert({
	              title: APP_TITULO,
	              content: error
	            });
	            $ionicLoading.hide();
			});
		}else{
			$ionicLoading.hide();
			$ionicPopup.alert({
              title: APP_TITULO,
              content: 'Informe o Email e Senha!'
            });
		}
	};

	$scope.init();

}])
   
.controller('cadastreSeCtrl', ['$scope', '$stateParams', '$state', '$ionicLoading', '$http', '$ionicPopup', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
 