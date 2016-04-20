import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {

});

Accounts.onCreateUser(function(options, user) {

      user.profile = {'cities': []};
    return user;
});

Meteor.publish("users", function() {
  return Meteor.users.find();  
})

Meteor.methods({
    checkCurrent: function (city) {
        console.log("the current city =" +city)
        var url = "http://api.openweathermap.org/data/2.5/weather?q=" +city+ "&units=metric&lang=en&appid=992bfff1b942695c9266d29b8f3a0ab7";
        var result = Meteor.http.call("GET", url);
        if(result.statusCode==200) {
            var data = JSON.parse(result.content);
            
            if(data.weather[0].icon === ('01d' || '01n')) {
                data.weather[0].icon = '/images/weather/sun-1.svg'
            } else if(data.weather[0].icon === ('02d' || '02n')) {
                data.weather[0].icon = '/images/weather/cloudy-5.svg'
            } else if(data.weather[0].icon === ('03d' || '03n')) {
                data.weather[0].icon = '/images/weather/cloud-1.svg'
            } else if(data.weather[0].icon === ('04d' || '04n')) {
                data.weather[0].icon = '/images/weather/clouds.svg'
            } else if(data.weather[0].icon === ('09d' || '09n')) {
                data.weather[0].icon = '/images/weather/rain-1.svg'
            } else if(data.weather[0].icon === ('10d' || '10n')) {
                data.weather[0].icon = '/images/weather/rain-2.svg'
            } else if(data.weather[0].icon === ('11d' || '11n')) {
                data.weather[0].icon = '/images/weather/storm-4.svg'
            } else if(data.weather[0].icon === ('13d' || '13n')) {
                data.weather[0].icon = '/images/weather/snowflake-1.svg'
            } else if(data.weather[0].icon === ('50d' || '50n')) {
                data.weather[0].icon = '/images/weather/mist.svg'
            };
            
            var timeStamp = data.dt;
            var newTime = parseInt(timeStamp*1000);
            var date = new Date(newTime);
            var day = date.getDate();
            var day2 = date.getDay();
            var weekday = new Array(7);
            weekday[0] = "SUN";
            weekday[1] = "MON";
            weekday[2] = "TUE";
            weekday[3] = "WED";
            weekday[4] = "THU";
            weekday[5] = "FRI";
            weekday[6] = "SAT";
            var n = weekday[day2];
            console.log(day);
            console.log(n);
            
            data.dt = day + " " + n;
            
            data.main.temp = Math.round(data.main.temp);
            
            var filteredData = _.pick(data, 'name', 'main', 'weather', 'sys', 'dt', 'wind');
            
            console.log("Response received")
            console.log(data);
            return filteredData;
        } else {
            console.log("Response issue: ", result.statusCode);
            var errorData = JSON.parse(result.content);
            throw new Meteor.Error(result.satusCode, errorData.error);
        }
    },
    
    gpsCurrent: function (lat, lng) {
        var url = "http://api.openweathermap.org/data/2.5/weather?lat=" +lat+ "&lon=" +lng+ "&units=metric&lang=en&appid=992bfff1b942695c9266d29b8f3a0ab7";
        var result = Meteor.http.call("GET", url);
        if(result.statusCode==200) {
            var data = JSON.parse(result.content);
            console.log(data);
            
            if(data.weather[0].icon === ('01d' || '01n')) {
                data.weather[0].icon = '/images/weather/sun-1.svg'
            } else if(data.weather[0].icon === ('02d' || '02n')) {
                data.weather[0].icon = '/images/weather/cloudy-5.svg'
            } else if(data.weather[0].icon === ('03d' || '03n')) {
                data.weather[0].icon = '/images/weather/cloud-1.svg'
            } else if(data.weather[0].icon === ('04d' || '04n')) {
                data.weather[0].icon = '/images/weather/clouds.svg'
            } else if(data.weather[0].icon === ('09d' || '09n')) {
                data.weather[0].icon = '/images/weather/rain-1.svg'
            } else if(data.weather[0].icon === ('10d' || '10n')) {
                data.weather[0].icon = '/images/weather/rain-2.svg'
            } else if(data.weather[0].icon === ('11d' || '11n')) {
                data.weather[0].icon = '/images/weather/storm-4.svg'
            } else if(data.weather[0].icon === ('13d' || '13n')) {
                data.weather[0].icon = '/images/weather/snowflake-1.svg'
            } else if(data.weather[0].icon === ('50d' || '50n')) {
                data.weather[0].icon = '/images/weather/mist.svg'
            };
            
            var timeStamp = data.dt;
            var newTime = parseInt(timeStamp*1000);
            var date = new Date(newTime);
            var day = date.getDate();
            var day2 = date.getDay();
            var weekday = new Array(7);
            weekday[0] = "SUN";
            weekday[1] = "MON";
            weekday[2] = "TUE";
            weekday[3] = "WED";
            weekday[4] = "THU";
            weekday[5] = "FRI";
            weekday[6] = "SAT";
            var n = weekday[day2];
            console.log(day);
            console.log(n);
            
            data.dt = day + " " + n;
            
            data.main.temp = Math.round(data.main.temp);
            
            var filteredData = _.pick(data, 'name', 'main', 'weather', 'sys', 'dt', 'wind');
            
            console.log("Response received")
            console.log(data);
            return filteredData;
        } else {
            console.log("Response issue: ", result.statusCode);
            var errorData = JSON.parse(result.content);
            throw new Meteor.Error(result.satusCode, errorData.error);
        }
    },
    
    add_city: function(city) {
        Meteor.users.update(Meteor.userId(), {$push: {"profile.cities": city.name}})
    },
    
    delete_city: function(city) {
        console.log("blabla", city.name);
        Meteor.users.update(Meteor.userId(), {$pull: {'profile.cities': city.name}})
    }
});

