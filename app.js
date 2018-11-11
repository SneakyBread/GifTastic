$(document).ready(function(){

// Array of strings
var topics = ["toyota", "mazda", "ford", "nissan", "mclaren", "bmw", 
"subaru", "honda", "audi", "tesla", "aston martin"];

// function that takes items in array and create buttons for each item into HTML
// (Try using a loop that appends a button for each string in the array.)
function makesButtons() {
    $("#empty-div").empty();
    for (var i = 0; i < topics.length; i++) {
        var btnCreator = $("<button style='margin: 0px 10px 10px 0px;' data-Carmake='" + topics[i] +  "'>" + topics[i] + "</button>");
            // add this to HTML ex: <button data-Carmake='toyota'>toyota</button>
            // "Hans 'Alexander'" + "Tang"
            // "Hans 'Alexander' Tang"
        $("#empty-div").append(btnCreator);
    }
};

makesButtons();
        
// function for grabbing 10 static, non-animated gif
// images from the GIPHY API and placing them on the page
$(document).on("click", "button", function ajaxCall() {
    var carMake = $(this).attr("data-Carmake");
    console.log("Car make selected: " + carMake);

    $.ajax({
        url: "http://api.giphy.com/v1/gifs/search?q=" + carMake + 
        "&api_key=qxSkk3PrLddbMzsIAi33MG0osLFWaNkB&limit=10",
        method: "GET"

    }).then(function(response){
        console.log(response);
        var results = response.data;

        for (var i = 0; i < results.length; i++) {
            var topicDiv = $("<div>");
            var topicImage = $("<img>");
            var static = results[i].images.fixed_height_still.url;
            var animated = results[i].images.fixed_height.url
            var rating = $("<p>").text("Rating: " + results[i].rating);

            // add these attributes for later reference and manipulation to <img> tag
            topicImage.attr("src", static);
            topicImage.attr("data-still", static);
            topicImage.attr("data-animate", animated);
            topicImage.attr("data-state", "still");
            topicImage.attr("class", "gifClass");
            topicImage.css("style", "margin: 10px;");

            // wrap a div around the image and rating 
            topicDiv.append(topicImage);
            topicDiv.append(rating);
            topicDiv.attr("class", "imageWrap");

            // add everything into larger holding div
            $("#gif_holder").prepend(topicDiv);
        }
    });
});

// When the user clicks one of the still GIPHY images, the gif should animate. 
// If the user clicks the gif again, it should stop playing.
$(document).on("click", ".gifClass", function pause_play() {
    // store image's data-state
    var state = $(this).attr("data-state");

    if (state==="still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    }

    else if (state==="animate") {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});

// Add a form to your page takes the value from a user input box and adds it into your topics array. 
// Then make a function call that takes each topic in the array remakes the buttons on the page.
$(document).on("click", "#submit_button", function add2Array() {
    event.preventDefault();
    var inputBox = $("#user_input").val().trim();
    topics.push(inputBox);
    makesButtons();
});

});