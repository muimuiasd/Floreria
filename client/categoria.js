

Template.categoria.onCreated(function()
{

});

Template.categoria.rendered = function()
{
  

};

Template.categoria.helpers({
    idUser()
    {
        return Meteor.user() ? Meteor.user()._id : false;
    },
    categorias()
    {
        return MyCategories.find();
   
    },
    currentCategoria()
    {
        return Session.get("categoriaSeleccionada");
    }
});

Template.categoria.events({
    "click #btnGc":function(e){
     
            let doc={};
            doc.Nombre=$("#Nombre").val();
           doc.Descripcion=$("#Descripcion").val();  
           
           let Categoria = Session.get("categoriaSeleccionada");

          if(doc.Nombre=="" || doc.Descripcion=="")
            swal ( "error" ,  "favor completar todos los campos" ,  "error" );
        else Meteor.call("AddCategoria", Categoria ? Categoria._id : false, doc, function (err, resp)
        {
            if (!err)
            {
                if (!Categoria._id)
                {
                    Categoria._id = resp;
                }
                console.log(resp);
            } else console.warn(err);
        });
    },
    "click #btnCac":function(e){
        $("#Nombre").val("");
        $("#Descripcion").val("");  
        Session.set("categoriaSeleccionada", {});


    },

    "click .btn-client-delete": function(e)
    {
        console.log("id: " + e.currentTarget.id);
        Meteor.call("RemoveCategoria", e.currentTarget.id, function (err, resp) {
            if (!err) {
                console.log("categoria borrrada " + resp);
            }
        });
    },
    "click .btn-client-update": function(e)
    {// solo rellenar form
        console.log("seteado el botn")
let id=e.currentTarget.id;
let doc = MyCategories.findOne({"_id": id});
console.log(doc.Nombre);
Session.set("categoriaSeleccionada", doc);
window.scrollTo(0,0);
    }

});

