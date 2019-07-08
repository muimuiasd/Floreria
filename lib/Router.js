
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
            Meteor.subscribe("Images"),
            Meteor.subscribe("ListCategories")
        ];
    }
});
Router.route('/Pedido', {
    template: 'Pedido',
    waitOn: function()
    {

        return [
             Meteor.subscribe("clients"),
             Meteor.subscribe("flowers"),
             Meteor.subscribe("Images")
         ];
     }
});

Router.route('/admin',{
    template:'/admin',
    waitOn: function()
    {

        return [
            Meteor.subscribe("ListCategories"),
            Meteor.subscribe("clients"),
            Meteor.subscribe("flowers")

        ];
    }
});
Router.route('/categoria', {
    template: 'categoria',
    waitOn: function()
    {

        return [
             Meteor.subscribe("ListCategories"),
         ];
     }
});
