Template.modaladdflower.helpers({
    currentFlower()
    {
        return Session.get("FlorSeleccionada");
    },
    categoriasFlor()
    {
        return Session.get("CategoriasFlor").map(function(c){
            let cat = {
                nombre: c
            };
            return cat;
        });
    },
    flower()
    {

        let doc = {};
        let img;
        doc.img = img ? img.link() : "img/flower.png";
        return doc;
    }
});

Template.modaladdflower.events({
    "click #btnG": function(e)
    {
        let doc = {};
        let flower = Session.get("ActualFlower") ? Session.get("ActualFlower") : {};
        let name = $("#input-flower-name").val();
        let description = $("#input-flower-description").val();
        let precio= $("#input-flower-Price").val();
        let categorias = Session.get("CategoriasFlor") ? Session.get("CategoriasFlor") : [];
        doc.name = name;
        doc.description = description;
        doc.precio=precio;
        doc.categorias = categorias;

        if(doc.name!="" ){
            if (doc.description!="" ) {
                if (doc.precio>0){
                    if (categorias.length>0) {
                        Meteor.call("AddFlower", flower ? flower._id : false, doc, function (err, resp)
                        {
                            if (!err)
                            {
                                if (!flower._id)
                                {
                                    flower._id = resp;
                                }
                            } else console.warn(err);
                        });
                        $("#modal-ingreso-flor").hide();

                    }else{

                        swal("error", "por favor ingrese al menos una categoria", "error");

                    }



                }else{
                    // LANZAR error precio
                    swal("error", "por favor ingrese el precio", "error");

                }

            }else{
                //lanzar error de descricion
                swal("error", "por favor ingrese una descrpición", "error");

            }


        }else{
            // lanzar del nombre
            swal("error", "por favor complete el nombre", "error");

        }
    }
});
