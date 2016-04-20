Template.Favorites.helpers({
    list: function() {
        return Meteor.users.findOne({_id: Meteor.userId()}).profile.cities;
    }
})

Template.Current.helpers({
   city: function() {
       if (Session.get('city')) {
           return Session.get('city');
       }
   }  
})

Template.gps.helpers({
    gpsCity: function() {
        if (Session.get('gpsCity')) {
            return Session.get('gpsCity');
        }
    }
})