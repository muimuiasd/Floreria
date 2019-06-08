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
        }
    }
);
