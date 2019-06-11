
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
Router.route('/ingresoCliente', {
    template: 'ingresoCliente'
});
Router.route('/listaCliente', {
    template: 'listaCliente'
    //waitOn: function()
  //  {
//no llegan los clientes
      /*  return [
            Meteor.subscribe("clients"),
        ];*/
  //  }
});
Router.route('/admin',{
    template:'/admin'
});