Router.route('/', function () {
  this.render('home');
})

Router.route('/signin', function () {
  this.render('Login');
})

Router.route('/signup', function () {
  this.render('Signup');
})

Router.route('/current', function () {
    this.render('Current');
})

Router.route('/favorites', function () {
    this.render('Favorites');
})

Router.route('/favorites/:id', function() {
    this.render('favCity');   
})

Router.route('/weather', function() {
    this.render('gps');
})