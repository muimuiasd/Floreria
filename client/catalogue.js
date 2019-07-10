export {
    Images
};

var currentUpload;

Template.catalogue.onCreated(function()
{
    currentUpload = new ReactiveVar(false);
});

Template.catalogue.rendered = function()
{
    $(".label-drophelp").hide();
    $("#modal-ingreso-flor").hide();
};

Template.catalogue.helpers({
    idUser()
    {
        return Meteor.user() ? Meteor.user()._id : false;
    },
    flowers()
    {
        let filter=Session.get("FiltroCategoria");
        let flores = filter ? Flowers.find({"categorias" : filter}) : Flowers.find();
        return flores.map(function (o, i) {
            let img = Images.findOne({
                "meta.flowerId": o._id
            });
            o.img = img ? img.link() : "img/flower.png";
            return o;
        });
    },
    allCategories()
    {
        let catArray = [];
        Flowers.find().map(function(f, i)
        {
            let arr = f.categorias;
            arr.forEach(function(item)
            {
                if (!catArray.includes(item))
                {
                    catArray.push(item);
                }
            });
        });
        return catArray.map(function(c)
        {
            let cat = {
                name: c
            };
            return cat;
        });
    },
    filtro()
    {
        return Session.get("FiltroCategoria");
    }
});

Template.catalogue.events({
    "dragover .item-flower": function(e, t) {
        e.stopPropagation();
        e.preventDefault();
        if (Meteor.user()) t.$(".label-drophelp").show();
    },
    "dragleave .item-flower": function(e, t) {
        e.stopPropagation();
        e.preventDefault();
        t.$(".label-drophelp").hide();
    },
    'dragenter .item-flower': function(e, t) {
        e.preventDefault();
        e.stopPropagation();
    },
    'drop .item-flower': function(e, t) {
        if (Meteor.user())
        {
            e.stopPropagation();
            e.preventDefault();
            let flower = Flowers.findOne({
                "_id": e.currentTarget.id
            });
            if (e.originalEvent.dataTransfer.files && e.originalEvent.dataTransfer.files[0]) {
                Images.remove({
                    flowerId: e.currentTarget.id,
                    meta: {
                        flowerId: flower._id
                    }
                });
                const upload = Images.insert({
                    file: e.originalEvent.dataTransfer.files[0],
                    streams: 'dynamic',
                    chunkSize: 'dynamic',
                    meta: {
                        flowerId: flower._id
                    }
                }, false);
                upload.on('start', function () {
                    currentUpload.set(this);
                });

                upload.on('end', function (error, fileObj) {
                    if (error) {
                        alert('Error during upload: ' + error);
                    } else {
                        console.log("FileImage", fileObj);
                    }
                    currentUpload.set(false);
                });
                upload.start();
            }
        }
    },
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









    },
    "click .button-add-flower": function(e)
    {
        $("#modal-ingreso-flor").show();
        $("#input-flower-name").val("");
        $("#input-flower-description").val("");
        $("#input-category").val("");
        Session.set("CategoriasFlor", []);
        Session.set("FlorSeleccionada", {});
    },
    "click .btn-flower-remove"(e) {
        Meteor.call("RemoveFlower", e.currentTarget.id, function (err, resp) {
            if (!err) {
                console.log("Flor eliminada");
            }
        });
    },
    "click #btnC": function (e) {
        $("#modal-ingreso-flor").hide();
    },
    "click #btn-add-category": function (e) {
        let categorias = Session.get("CategoriasFlor");
        if (!categorias) categorias = [];
        let name = $("#input-category").val();
        if (name != "" && !categorias.includes(name)) categorias.push(name);
        Session.set("CategoriasFlor", categorias);
    },
    "click .btn-filter-category": function(e)
    {
        Session.set("FiltroCategoria", e.currentTarget.id);
    },
    "click .btn-remove-filter": function(e)
    {
        Session.set("FiltroCategoria", null);
    }
});
