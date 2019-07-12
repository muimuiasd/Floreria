Template.admin.rendered = function()
{
    $(".gestion-clientes").hide();
    $(".gestion-pedidos").hide();
};

Template.admin.helpers({
    idUser()
    {
        return Meteor.user() ? Meteor.user()._id : false;
    },
    name()
    {
        return Meteor.user().profile.name;
    }
});

Template.admin.events({
    "click .btn-login"() {
        var login = $("#input-email").val();
        var pass = $("#input-password").val();
        var error = false;

        if (_.isEmpty(login) || _.isEmpty(pass)) {
            Session.set("MensajesError", {
                warning: [{
                    item: "Se requiere correo y contraseña."
                }]
            });
            error = true;
            DesvanecerErrores();
        }

        if (!ValidateEmail(login)) {
            Session.set("MensajesError", {
                warning: [{
                    item: "Debe ingresar un correo electrónico válido."
                }]
            });
            error = true;
            DesvanecerErrores();
        }

        if (!error) {
            Meteor.loginWithPassword(login, pass, function (err, resp) {
                if (!err) {
                    console.log("Bienvenido!");
                } else {
                    Session.set("MensajesError", {
                        warning: [{
                            item: "Datos de inicio de sesión incorrectos."
                        }]
                    });
                    error = true;
                    DesvanecerErrores();
                }
            });
        }
    },
    "click .item-module"(e)
    {
        let id = e.currentTarget.id;
        if (id == "modulo-clientes")
        {
            $(".dashboard-admin").hide();
            $(".gestion-clientes").show();
        }
        else if (id=="modulo-pedidos")
        {
            $(".dashboard-admin").hide();
            $(".gestion-pedidos").show();
        }
        window.scrollTo(0,0);
    },
    "click .btn-back"(e)
    {
        $(".gestion-clientes").hide();
        $(".gestion-pedidos").hide();
        $(".dashboard-admin").show();
    }
});
