
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
        return [Meteor.subscribe("flowers")];
    }
});
Router.route('/ingresoCliente', {
    template: 'ingresoCliente'
});
Router.route('/administrator',{
    template:'/administrator'
});