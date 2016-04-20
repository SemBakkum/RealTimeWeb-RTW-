Template.Favorites.onCreated( function favOnCreated() {
    Meteor.subscribe("users");
})

Template.gps.onCreated( function gpsOnCreated() {
    Meteor.subscribe("users");
})
    
Template.gps.onRendered( function() {
    navigator.geolocation.getCurrentPosition(function (data) { 
        var lat = data.coords.latitude;
        var lng = data.coords.longitude;
        console.log(lat);
        console.log(lng);
        
        Meteor.call('gpsCurrent', lat, lng, callBack);
        Meteor.setInterval( function () {
            Meteor.call('gpsCurrent', latLng, callBack);
            console.log("I've been called")
        }, 900000)
    });
})

function callBack (err, res) {
    if (err) {
        console.log(err);
        return false;
    }

    Session.set('gpsCity', res);
    console.log(res);
}