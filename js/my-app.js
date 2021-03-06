var dbRef = new Firebase('https://testproject-aa287.firebaseio.com/');
var recipes = dbRef.child('recipes');
var app = angular.module("test_app", ["ngRoute","ngSanitize","ngMaterial"]);
app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "template/tabs.html"
    });
});
app.controller("tabs",function($scope)
{
    $scope.get_receipt = function()
    {
    	$scope.receipts = [];
    	recipes.on("child_added", function(snap)
	            {
		            var value = snap.val();
		            var key = snap.key();
		            var main_desc = value.description;
		            var desc_length = main_desc.length;
		            if(desc_length > 75)
		            	{
		            		main_desc = main_desc.substring(0,75);
		            	}
		            var output_json = {"title": value.title, "description": main_desc, "key": key};
		            $scope.receipts.push(output_json);
		            $scope.$apply();
		        });
    }
    $scope.get_val = function(firebase_key)
    {
    	var key_ref = recipes.child(firebase_key);
    	key_ref.on('child_added', function(data) {
    		  var data_val = data.val();
    		  var data_key = data.key();
    		  if(data_key == "image")
    			  $scope.shown_image = data_val;
    		  else if(data_key == "title")
    			  $scope.content_title = data_val;
    		  else if(data_key == "description")
    			  $scope.content_desc = data_val;
    		});
    }
    $scope.form_submit = function(title, description, img_url)
    {
    	if(title != undefined && description != undefined && img_url != undefined)
    		{
    			recipes.push(
    	            {
    		            title: title,
    		            description: description,
    		            image: img_url
    		            
    	            });
    			$scope.title = "";
    			$scope.description = "";
    			$scope.img_url = "";
    			alert("Insert Successfully");
    		}
    	else
    		{
    			alert("All fields are mandatory");
    		}
    	
    }
    
});