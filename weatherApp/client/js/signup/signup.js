Template.Signup.events({
    'submit form': function(e){
        e.preventDefault();
        var email = document.getElementById("email").value;
        var password = document.getElementById("password").value;
        Accounts.createUser({
            email: email,
            password: password
        });
        
        Router.go('/');
    }
});

Template.navigation.events({
    'click .logout': function(event){
        event.preventDefault();
        Meteor.logout();
        Router.go('/signin');
    }
});