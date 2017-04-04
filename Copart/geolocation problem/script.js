// This example displays an address form, using the addrAuto feature
// of the Google Places API to help users fill in the information.

// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

var placeSearch, addrAuto;
var componentForm = {
  street_number: 'short_name',
  route: 'long_name',
  locality: 'long_name',
  administrative_area_level_1: 'short_name',
  country: 'long_name',
  postal_code: 'short_name'
};
// format the phone number on key up event
function formatPhoneNo(event){
	
	var phoneNo=document.getElementById('phoneNo').value;
	//extract the digits from the string
	phoneNo = phoneNo.replace(/[^0-9\.]/g,''); 
	phoneNo=phoneNo.trim();
	var formattedNo;
	if(phoneNo.length>0 && phoneNo.length<4)
	{
		formattedNo="("+phoneNo;
	}
	else if(phoneNo.length>=4 && phoneNo.length<7)
	{
		//window.alert(phoneNo);
		formattedNo="("+phoneNo.substring(0,3)+") "+phoneNo.substring(3,phoneNo.length);
		//window.alert(formattedNo);
	}
	else if(phoneNo.length>=7 && phoneNo.length<=10)
	{
		formattedNo="("+phoneNo.substring(0,3)+") "+phoneNo.substring(3,6)+"-"+phoneNo.substring(6,10);
	}
	else 
	{
		formattedNo="Phone No must have maximum 10 digits";
	}
	document.getElementById('phoneNo').value=formattedNo;
}

function initAutocomplete() {
  // Create the addrAuto object, restricting the search to geographical
  // location types.
  addrAuto = new google.maps.places.Autocomplete(
      /** @type {!HTMLInputElement} */(document.getElementById('addrAuto')),
      {types: ['geocode']});

  // When the user selects an address from the dropdown, populate the address
  // fields in the form.
  addrAuto.addListener('place_changed', fillInAddress);
}

function fillInAddress() {
  // Get the place details from the addrAuto object.
  var place = addrAuto.getPlace();

  for (var component in componentForm) {
    document.getElementById(component).value = '';
    document.getElementById(component).disabled = false;
  }

  // Get each component of the address from the place details
  // and fill the corresponding field on the form.
  for (var i = 0; i < place.address_components.length; i++) {
    var addressType = place.address_components[i].types[0];
    if (componentForm[addressType]) {
      var val = place.address_components[i][componentForm[addressType]];
      document.getElementById(addressType).value = val;
    }
  }
}

// Bias the addrAuto object to the user's geographical location,
// as supplied by the browser's 'navigator.geolocation' object.
function geolocate() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var geolocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      var circle = new google.maps.Circle({
        center: geolocation,
        radius: position.coords.accuracy
      });
      addrAuto.setBounds(circle.getBounds());
    });
  }
}