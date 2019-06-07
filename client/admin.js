Template.admin.events({
    "click .btn-login"() {
        var login = $("#input-email").val();
        var pass = $("#input-password").val();
        var error = false;

        if (_.isEmpty(login) || _.isEmpty(pass)) {
            Session.set("MensajesError", {
                advertencia: [{
                    item: "Login y Password son requeridos"
                }]
            });
            error = true;
            DesvanecerErrores();
        }

        if (!ValidarEmail(login)) {
            Session.set("MensajesError", {
                advertencia: [{
                    item: "Debe ingresar un email válido"
                }]
            });
            error = true;
            DesvanecerErrores();
        }

        if (!error) {
            Meteor.loginWithPassword(login, pass, function (err, resp) {
                if (!err) {
                    toggle_visibility("foo");
                    if(Meteor.user().profile && Meteor.user().profile.role < 3) {
                        Router.go("/verificacionvehiculos");
                    } else if(Meteor.user().profile && Meteor.user().profile.role==3) {
                        Router.go("/listadoaseguradora");
                    }
                } else {
                    Session.set("MensajesError", {
                        grave: [{
                            item: "Login o Password incorrectos"
                        }]
                    });
                    error = true;
                    DesvanecerErrores();
                }
            });
        }
    }
});