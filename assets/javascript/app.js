// Coding boot camp week 6 homework. AJAX and APIs.

// variables
var arrayCartoons = ["Thundercats", "Masters of the Universe", "Super Friends", "Danger Mouse", "Scooby Doo", "Doug"];



// functions

// create a button based on the button name provided
function createButton(buttonName) {

	// button details
	var newButton = $("<button>");
		newButton.addClass("subjectButton");
		newButton.attr("data-subject", buttonName);
		newButton.text(buttonName);

	// add button to display
	$("#buttons").append(newButton);

}; // end createButton function


// ajax query and display images when a subject button is clicked
$(document.body).on("click", ".subjectButton", function() {

	// get the search topic from the button attributes
	var searchTopic = $(this).attr("data-subject");

	console.log("searchTopic : " + searchTopic);

	// create an ajax query string
	var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=kYICtWZcT1fj7pthCgscE5oHfqWoa3zP&limit=10" + "&q=cartoon+" + searchTopic;

	// run ajax query
	$.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {
 
 		// assign the data array from the ajax response to a variable
		var results = response.data;

	    console.log(results.length);

	    // display the search topic and clear the images div
	    $("#subject").html("<h1>" + searchTopic + "</h1>");
	    $("#images").empty();


	    // loop through each image in the ajax response
        for (var j = 0; j < results.length; j++) {

        	// only include images that don't have a rating of "r" or "pg-13" 
        	if (results[j].rating !== "r" && results[j].rating !== "pg-13") {
			
				// put the rating in a paragraph tag
				var rating = "<p>Rating: " + results[j].rating + "</p>";

				// create a new div for the image and include the rating paragraph
				var imageDiv = $("<div>");
				 	imageDiv.addClass("giphyImage");
				 	imageDiv.html(rating);

				// create an image tag and append it to the inage div
				var newImage = $("<img>");
					newImage.attr("src", results[j].images.fixed_height_still.url);
					newImage.attr("data-stillURL", results[j].images.fixed_height_still.url);
					newImage.attr("data-URL", results[j].images.fixed_height.url);
					newImage.attr("data-imageStatus", "still");
					imageDiv.append(newImage);

				// display the new image div
				$("#images").prepend(imageDiv);

			} //end if

        } //end for loop

	}); //end ajax function

}); // end subjectButton click



// run once the page has loaded
$(document).ready(function() {

	// create a button for each subject in the initial array
	for (var i = 0; i < arrayCartoons.length; i++) {
		createButton(arrayCartoons[i]);		
	}

});