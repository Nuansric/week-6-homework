//varriable of the array of sweets given to the user as the page loads
	var topics = ["cake", "chocolate", "icecream", "pie", "waffle", "pancake"];


// Function to add the button of the sweets once it is in the array

	function addButton(){

		//clear the div in order to no repeat button
		$("#sweetButton").empty();

		//loop through the array
		for (var i=0; i < topics.length; i++){

			//to create the button
			var Sbutton = $("<button>");

			//to each button created, the same class is addted
			Sbutton.addClass("buttonClass");

			//However, different data-attribute is given to it by the sweet name
			Sbutton.data("name", topics[i]);
			// the text in each button is also set the the sweet name
			Sbutton.text(topics[i]);

			//add the button to the existing div
			$("#sweetButton").append(Sbutton);
		} //for loop

	} // addButton function


// Function to add the user input into the array
	
	$("#addSweet").on("click", function(){

		// set the value of user sweet-input to the variable without space
		var sweetInput = $("#sweet-input").val().trim();

		topics.push(sweetInput);

		//run add button function to add the newly added array menber to button

		addButton();

		//empty the text box

		$("#sweet-input").val("");

		//enter key doesn't affect the page
		return false;

	});  // on click

	
//function to let the image animate when click
	function displaySweet() {

		//first empty the div 
	        $("#sweetPics").empty();

	    // interent the data attribute from the button that was click, which will be the name of the sweets
	        var sweetChoice = $(this).data("name");

	        console.log(sweetChoice);

	    // the URL for the ajax call, using the name of the sweets inherrient from the button to search, the limit of the search is set to 10 pictures
	        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + sweetChoice + "&limit=10&rating=pg&api_key=dc6zaTOxFJmzC";

	        console.log(queryURL);


	    //ajax call using get method
	        $.ajax({ url: queryURL, method: 'GET' })

	        // when the ajax call is succesful
	            .done(function (response) {

	            //loop through the object that is received for each of the 10 images
	                for (var i = 0; i < response.data.length; i++) {

	                //url for the anmating image
	                    var imageAnimated = response.data[i].images.fixed_height.url;

	               	//url for the still image
	                    var imageStill = response.data[i].images.fixed_height_still.url;

	                //the rating for the image
	                    var rating = response.data[i].rating;

	                    


	                    console.log(imageAnimated);
	                    console.log(imageStill);

	                   
	                //create the span in the html element for each image
	                    var imageContainer = $("<span>");
	                
	                //create the paragraph for each image that contain its rating
	 					var ratingP = $("<p>").text("RATED:  " + rating);
	 				
	 				//give the <p> a class for CSS 
	 					ratingP.addClass("Rating");

	                    //storing the id attribute of the image variable in imageId variable
	                    var imageId = i.toString().trim();



	                    var image = $("<img>").attr('src', imageStill).attr('id' , imageId);

	                    //setting data-attribute to the image in case of animating
	                    image.data("animated", imageAnimated);

	                     //setting data-attribute to the image in case of still
	                    image.data("still", imageStill);

	                    //setting data-attribute to the image which is currently being shown
	                    image.data("shownImage", imageStill);
	                  	
	                    
	                    imageContainer.append(image);

	                    imageContainer.append(ratingP);

	                    $("#sweetPics").append(imageContainer);



	                   

	                    	$(("#" + imageId).trim()).on("click", function(){


	                    		//storing the url of the image being click in still mode
	                    		var StillUrl = $(this).data("still");

	                    		//storing the url of the image being click in animated mode
		        				var AnimatedUrl = $(this).data("animated");

		        				


		        				//storing the url of the image being click 
		        				var CurrentImage = $(this).data("shownImage"); //imageStill
		        

						        if (CurrentImage == StillUrl) {

						        	//reset the data-attribute of the image to be animated url
						            $(this).data("shownImage", AnimatedUrl);

						            //remove the current image source and replace with the animated source
						            $(this).attr('src', AnimatedUrl);
						        }

						        else
						            if (CurrentImage == AnimatedUrl) {

						            	//reset the data-attribute of the image to be still url
						                $(this).data("shownImage", StillUrl);
						                
						                //remove the current image source and replace with the still source
						                $(this).attr('src', StillUrl);
						            }







	                    });

                }

                console.log(response);
            })
	 
	    

	}
//when click the sweet's name button, call the function to show the images in the sweetPics div
	$(document).on("click", ".buttonClass", displaySweet);



//call the function addButton right away to let the user add button
addButton();



	
