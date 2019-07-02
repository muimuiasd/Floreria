Template.header.helpers({
    idUser()
    {
        return Meteor.user() ? Meteor.user()._id : false;
    },
    name()
    {
        return Meteor.user().profile.name;
    }
});
Template.header.events(
    {
        "click .logo": function(){
            Router.go("/");
        },
        "click #btn-catalogue": function () {
            console.log("click en catálogo");
            Router.go("/catalogue");
        },
        "click #btn-admin":function(){
            console.log("click en administrador");
            Router.go("/admin");
        },
        "click #btn-gestionarCliente": function () {
            Router.go("/Cliente");
        },
        "click #pedido": function () {
            Router.go("/Pedido");
            console.log("click en administrador");
        },
        "click #logout": function() {
          Meteor.logout();
        }

    }
);
Template.home.events(
    {
        "click #btn-catalogue": function () {
            console.log("click en catálogo");
            Router.go("/catalogue");
        }
    }
);
