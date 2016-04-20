Template.Login.events({
    'submit form': function(event){
        event.preventDefault();
        var email = document.getElementById("emailLogin").value;
        var password = document.getElementById("passwordLogin").value;
        console.log(email)
        Meteor.loginWithPassword(email, password, function(error){
            if(error){
                console.log(error.reason);
            } else {
                Router.go("/");
            }
        });
    }
});