Template.favCity.onRendered(function () {
   
    Meteor.call('checkCurrent', pageId(), function(err, res) {
        if (err) {
            console.log(err);
            return false;
        }

        Session.set('city', res);
        console.log(res);
    });
    
});

Template.favCity.helpers({
   city: function() {
       if (Session.get('city')) {
           return Session.get('city');
       }
   } 
})

function pageId() {
    var parts = location.href.split('/');
    return parts.pop()
}