document.addEventListener(
    "DOMContentLoaded",
    () => {
      console.log("find-a-market-app JS imported successfully!");
    },
    false
  );
  
  //Places autocomplete
  
  
  
  let autocomplete;
  function initAutocomplete(){
  autocomplete = new google.maps.places.Autocomplete(
   document.getElementById('autocomplete'), 
    {
    types: ['establishment'],
    fields: ['place_id', 'geometry', 'name']
    });
  autocomplete.addListener('place_changed', onPlaceChanged);
    }
    function onPlaceChanged(){
       var place = autocomplete.getPlace();
      console.log(place.geometry.location)
       if(!place.geometry){
      //User did not select a prediction; reset the input field
       document.getElementById('autocomplete').placeholder = 'Enter a place';
       }else{
       //Display detais about the valid place
       document.getElementById('details').innerHTML = place.name;
       }
  }
  