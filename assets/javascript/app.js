//Initial array of actions
$(document).ready(function() {

  var topics = ["laugh", "fall", "slap", "cry", "hug", "kick", "run", "bounce"];  

  //  create topics array buttons
  function renderButtons(){
    $('#buttons-view').empty();

    for (var i = 0; i < topics.length; i++) {
            //create all buttons
            var a = $('<button>');
            a.addClass('action');
            a.attr('data-name', topics[i]);
            a.text(topics[i]);
            $('#buttons-view').append(a);
          }
        }    
        renderButtons();

//on button click action
$(document).on('click', '.action', function() {

    //new var will log the text info  from each button
    var actions = $(this).html(); 
    // console.log(actions);

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + actions + "&api_key=dc6zaTOxFJmzC&limit=10";
    // console.log(queryURL);

    // Creating an AJAX call for the action button
    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {

      var results = response.data;
        //console.log(results);
        //clears the div before adding more gifs
        $('#action-view').empty();
        for ( var j=0; j < results.length; j++) {
                    var imageDiv = $('<div>');
                    var imageView = results[j].images.fixed_height.url;
                    var still = results[j].images.fixed_height_still.url;
                        // console.log(imageView);  

        var gifImage = $('<img>').attr("src", still).attr('data-animate', imageView).attr('data-still', still);
                    gifImage.attr('data-state', 'still');
                    $('#action-view').prepend(gifImage);
                    gifImage.on('click', playGif);

        // puts gif rating
        var rating = results[j].rating;
            // console.log(rating);
        var displayRated= $('<p>').text("Rating: " + rating);
        $('#action-view').prepend(displayRated);
  } 

}); 

        //function to stop and start gifs
        function playGif() { 
                    var state = $(this).attr('data-state');
                    console.log(state);
                 if (state == 'still'){
                     $(this).attr('src', $(this).data('animate'));
                      $(this).attr('data-state', 'animate');
                 } else{
                     $(this).attr('src', $(this).data('still'));
                     $(this).attr('data-state', 'still');
                    }

                } 

      }); 

          //adding array for new button
        $(document).on('click', '#add-action', function(){
            if ($('#action-input').val().trim() == ''){
              alert('Input can not be left blank');
           }
           else {
            var action = $('#action-input').val().trim();
            topics.push(action);
            $('#action-input').val('');
            renderButtons();
            return false;

            }

        });
                      

        });