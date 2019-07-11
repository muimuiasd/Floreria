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
    $("#input-category").empty();
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
    "click .button-add-flower": function(e)
    {
        $("#modal-ingreso-flor").show();
        $("#input-flower-name").val("");
        $("#input-flower-description").val("");
        $("#input-category").val("");
        Session.set("CategoriasFlor", []);
        Session.set("FlorSeleccionada", {});
        $("#input-category").empty();
    },
    "click .btn-flower-remove":function(e) {
        Meteor.call("RemoveFlower", e.currentTarget.id, function (err, resp) {
            if (!err) {
                console.log("Flor eliminada");
            }
        });
        swal("exito", "borrado correctamente", "success");
    },
    "click .btn-flower-update":function(e){
       
            let doc =Flowers.find({"_id" : e.currentTarget.id});
           let flor=doc.map(function (o, i) {
            let img = Images.findOne({
                "meta.flowerId": o._id
            });
            o.img = img ? img.link() : "img/flower.png";
            return o;
        });
        console.log(flor)
        Session.set("FlorSeleccionada", flor[0]);
         Session.set("CategoriasFlor", flor[0].categorias);
            $("#modal-ingreso-flor").show();
            $("#input-category").empty();
    },
    "click #btnC": function (e) {
        $("#modal-ingreso-flor").hide();
        $("#input-category").empty();
    },
    "click #btn-add-category": function (e) {
        let categorias = Session.get("CategoriasFlor");
        if (!categorias) categorias = [];
        let name = $("#input-category").val();
        if (name != "" && !categorias.includes(name)) categorias.push(name);
        Session.set("CategoriasFlor", categorias);
        $("#input-category").val("");
        swal("exito", "categoria añadida a producto", "success");
        
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
