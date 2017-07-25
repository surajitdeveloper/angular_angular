var dbRef = new Firebase('https://testproject-aa287.firebaseio.com/');
var recipes = dbRef.child('recipes');
var app = angular.module("business", ["ngRoute","ngSanitize","ngMaterial"]);
app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "template/tabs.html"
    });
});
app.controller("tabs",function($scope,$location,$http,$timeout, $mdSidenav)
{
    //For loader start
    $scope.loading=false;
    //For loader stop
    //for menu
    $scope.toggleLeft = buildToggler('left');
    $scope.toggleRight = buildToggler('right');

    function buildToggler(componentId) {
      return function() {
        $mdSidenav(componentId).toggle();
      };
    }
    $scope.get_receipt = function()
    {
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
		            jQuery("#inserted_element").append("<li onclick=get_val('"+key+"') class='list-group-item'>"+value.title+"<br>"+main_desc+"</li>");
		            
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
function get_val(firebase_key)
{
	recipes.on("child_added", function(snap)
            {
	            var value = snap.val();
	            var key = snap.key();
	            if(key == firebase_key)
	            	{
	            		jQuery("#shown_image").attr("src",value.image);
	            		jQuery("#content_title").html(value.title);
	            		jQuery("#content_desc").html(value.description);
	            		jQuery("#hidden").show();
	            	}
	            
	        });
}