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
};

Template.catalogue.helpers({
    idUser()
    {
        return Meteor.user() ? Meteor.user()._id : false;
    },
    flowers()
    {
        return Flowers.find().map(function (o, i) {
            let img = Images.findOne({
                "meta.flowerId": o._id
            });

            o.img = img ? img.link() : "img/flower.png";
            return o;
        });
    },
    categorias()
    {
        return MyCategories.find();
   
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
        let doc = {};
        let flower = Session.get("ActualFlower") ? Session.get("ActualFlower") : {};
        let name = $("#input-flower-name").val();
        let description = $("#input-flower-description").val();
        let categorias=$("#superSelect").val();
        console.log(categorias)
        doc.name = name;
        doc.description = description;
        doc.categorias=categorias;
        
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
    },
    "click .btn-flower-remove"(e) {
        Meteor.call("RemoveFlower", e.currentTarget.id, function (err, resp) {
            if (!err) {
                console.log("Flor eliminada");
            }
        });
    }
});

