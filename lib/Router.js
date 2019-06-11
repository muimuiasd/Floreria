
Router.configure({
    layoutTemplate: 'layout',
    notFoundTemplate: 'notFound',
    loadingTemplate: 'loading',
});

Router.route('/', {
    template: 'home'
});

Router.route('/register', {
    template: 'register'
});
Router.route('/catalogue', {
    template: 'catalogue',
    waitOn: function()
    {

        return [
            Meteor.subscribe("flowers"),
            Meteor.subscribe("Images")
        ];
    }
});
Router.route('/Cliente', {
    template: 'Cliente',
    waitOn: function()
    {
 
        return [
             Meteor.subscribe("clients"),
         ];
     }
});

Router.route('/admin',{
    template:'/admin'
});