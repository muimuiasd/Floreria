Template.Body.events(
    {
        "click .logo": function(){
            Router.go("/");
        },
        "click #btn-catalogue": function () {
            console.log("click en catálogo");
            Router.go("/catalogue");
        },
        "click #btn-ingresoCliente": function () {
            console.log("click en ingresoCliente");
            Router.go("/ingresoCliente");
        }
    }

);