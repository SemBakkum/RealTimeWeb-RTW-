Template.home.events({
    'submit form': function(e){
        e.preventDefault();
        var city = document.getElementById("search").value;
        console.log(city);
        Meteor.call('checkCurrent', city, callBack);
        Meteor.setInterval(function(){
            Meteor.call('checkCurrent', city, callBack);
            console.log("I've been called")
        }, 900000)
        Router.go("/current");
    }
});

Template.Current.events({
    'click .add': function(e, template) {
        e.preventDefault();
        Meteor.call('add_city', Session.get('city'));
        template.$('.add').text("Added to favorites");
    }
})

Template.gps.events({
    'click .add': function(e, template) {
        e.preventDefault();
        Meteor.call('add_city', Session.get('gpsCity'));
        template.$('.add').text("Added to favorites");
    }
})

Template.favCity.events({
    'click .remove': function(e, template) {
        console.log("I'm in favorites event")
        e.preventDefault();
        Meteor.call('delete_city', Session.get('city'), Session.get('gpsCity'));
        template.$('.remove').text("Deleted from favorites"); 
    }
})


function callBack (err, res) {
    if (err) {
        console.log(err);
        return false;
    }

    Session.set('city', res);
    console.log(res);
}