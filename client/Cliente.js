//export {
//  Images
//};

//var currentUpload;

Template.Cliente.onCreated(function () {
    //  currentUpload = new ReactiveVar(false);
});

Template.Cliente.rendered = function () {
    $("#modal-ingreso-cliente").hide();

    // $(".label-drophelp").hide();
    var RegionesYcomunas = {

        "regiones": [{
            "NombreRegion": "Arica y Parinacota",
            "comunas": ["Arica", "Camarones", "Putre", "General Lagos"]
        },
            {
                "NombreRegion": "Tarapacá",
                "comunas": ["Iquique", "Alto Hospicio", "Pozo Almonte", "Camiña", "Colchane", "Huara", "Pica"]
            },
            {
                "NombreRegion": "Antofagasta",
                "comunas": ["Antofagasta", "Mejillones", "Sierra Gorda", "Taltal", "Calama", "Ollagüe", "San Pedro de Atacama", "Tocopilla", "María Elena"]
            },
            {
                "NombreRegion": "Atacama",
                "comunas": ["Copiapó", "Caldera", "Tierra Amarilla", "Chañaral", "Diego de Almagro", "Vallenar", "Alto del Carmen", "Freirina", "Huasco"]
            },
            {
                "NombreRegion": "Coquimbo",
                "comunas": ["La Serena", "Coquimbo", "Andacollo", "La Higuera", "Paiguano", "Vicuña", "Illapel", "Canela", "Los Vilos", "Salamanca", "Ovalle", "Combarbalá", "Monte Patria", "Punitaqui", "Río Hurtado"]
            },
            {
                "NombreRegion": "Valparaíso",
                "comunas": ["Valparaíso", "Casablanca", "Concón", "Juan Fernández", "Puchuncaví", "Quintero", "Viña del Mar", "Isla de Pascua", "Los Andes", "Calle Larga", "Rinconada", "San Esteban", "La Ligua", "Cabildo", "Papudo", "Petorca", "Zapallar", "Quillota", "Calera", "Hijuelas", "La Cruz", "Nogales", "San Antonio", "Algarrobo", "Cartagena", "El Quisco", "El Tabo", "Santo Domingo", "San Felipe", "Catemu", "Llaillay", "Panquehue", "Putaendo", "Santa María", "Quilpué", "Limache", "Olmué", "Villa Alemana"]
            },
            {
                "NombreRegion": "Región del Libertador Gral. Bernardo O’Higgins",
                "comunas": ["Rancagua", "Codegua", "Coinco", "Coltauco", "Doñihue", "Graneros", "Las Cabras", "Machalí", "Malloa", "Mostazal", "Olivar", "Peumo", "Pichidegua", "Quinta de Tilcoco", "Rengo", "Requínoa", "San Vicente", "Pichilemu", "La Estrella", "Litueche", "Marchihue", "Navidad", "Paredones", "San Fernando", "Chépica", "Chimbarongo", "Lolol", "Nancagua", "Palmilla", "Peralillo", "Placilla", "Pumanque", "Santa Cruz"]
            },
            {
                "NombreRegion": "Región del Maule",
                "comunas": ["Talca", "ConsVtución", "Curepto", "Empedrado", "Maule", "Pelarco", "Pencahue", "Río Claro", "San Clemente", "San Rafael", "Cauquenes", "Chanco", "Pelluhue", "Curicó", "Hualañé", "Licantén", "Molina", "Rauco", "Romeral", "Sagrada Familia", "Teno", "Vichuquén", "Linares", "Colbún", "Longaví", "Parral", "ReVro", "San Javier", "Villa Alegre", "Yerbas Buenas"]
            },
            {
                "NombreRegion": "Región del Biobío",
                "comunas": ["Concepción", "Coronel", "Chiguayante", "Florida", "Hualqui", "Lota", "Penco", "San Pedro de la Paz", "Santa Juana", "Talcahuano", "Tomé", "Hualpén", "Lebu", "Arauco", "Cañete", "Contulmo", "Curanilahue", "Los Álamos", "Tirúa", "Los Ángeles", "Antuco", "Cabrero", "Laja", "Mulchén", "Nacimiento", "Negrete", "Quilaco", "Quilleco", "San Rosendo", "Santa Bárbara", "Tucapel", "Yumbel", "Alto Biobío", "Chillán", "Bulnes", "Cobquecura", "Coelemu", "Coihueco", "Chillán Viejo", "El Carmen", "Ninhue", "Ñiquén", "Pemuco", "Pinto", "Portezuelo", "Quillón", "Quirihue", "Ránquil", "San Carlos", "San Fabián", "San Ignacio", "San Nicolás", "Treguaco", "Yungay"]
            },
            {
                "NombreRegion": "Región de la Araucanía",
                "comunas": ["Temuco", "Carahue", "Cunco", "Curarrehue", "Freire", "Galvarino", "Gorbea", "Lautaro", "Loncoche", "Melipeuco", "Nueva Imperial", "Padre las Casas", "Perquenco", "Pitrufquén", "Pucón", "Saavedra", "Teodoro Schmidt", "Toltén", "Vilcún", "Villarrica", "Cholchol", "Angol", "Collipulli", "Curacautín", "Ercilla", "Lonquimay", "Los Sauces", "Lumaco", "Purén", "Renaico", "Traiguén", "Victoria",]
            },
            {
                "NombreRegion": "Región de Los Ríos",
                "comunas": ["Valdivia", "Corral", "Lanco", "Los Lagos", "Máfil", "Mariquina", "Paillaco", "Panguipulli", "La Unión", "Futrono", "Lago Ranco", "Río Bueno"]
            },
            {
                "NombreRegion": "Región de Los Lagos",
                "comunas": ["Puerto Montt", "Calbuco", "Cochamó", "Fresia", "FruVllar", "Los Muermos", "Llanquihue", "Maullín", "Puerto Varas", "Castro", "Ancud", "Chonchi", "Curaco de Vélez", "Dalcahue", "Puqueldón", "Queilén", "Quellón", "Quemchi", "Quinchao", "Osorno", "Puerto Octay", "Purranque", "Puyehue", "Río Negro", "San Juan de la Costa", "San Pablo", "Chaitén", "Futaleufú", "Hualaihué", "Palena"]
            },
            {
                "NombreRegion": "Región Aisén del Gral. Carlos Ibáñez del Campo",
                "comunas": ["Coihaique", "Lago Verde", "Aisén", "Cisnes", "Guaitecas", "Cochrane", "O’Higgins", "Tortel", "Chile Chico", "Río Ibáñez"]
            },
            {
                "NombreRegion": "Región de Magallanes y de la AntárVca Chilena",
                "comunas": ["Punta Arenas", "Laguna Blanca", "Río Verde", "San Gregorio", "Cabo de Hornos (Ex Navarino)", "AntárVca", "Porvenir", "Primavera", "Timaukel", "Natales", "Torres del Paine"]
            },
            {
                "NombreRegion": "Región Metropolitana de Santiago",
                "comunas": ["Cerrillos", "Cerro Navia", "Conchalí", "El Bosque", "Estación Central", "Huechuraba", "Independencia", "La Cisterna", "La Florida", "La Granja", "La Pintana", "La Reina", "Las Condes", "Lo Barnechea", "Lo Espejo", "Lo Prado", "Macul", "Maipú", "Ñuñoa", "Pedro Aguirre Cerda", "Peñalolén", "Providencia", "Pudahuel", "Quilicura", "Quinta Normal", "Recoleta", "Renca", "San Joaquín", "San Miguel", "San Ramón", "Vitacura", "Puente Alto", "Pirque", "San José de Maipo", "Colina", "Lampa", "TilVl", "San Bernardo", "Buin", "Calera de Tango", "Paine", "Melipilla", "Alhué", "Curacaví", "María Pinto", "San Pedro", "Talagante", "El Monte", "Isla de Maipo", "Padre Hurtado", "Peñaflor"]
            }]
    }
    var iRegion = 0;
    var htmlRegion = '<option value="sin-region">Seleccione región</option><option value="sin-region">--</option>';
    var htmlComunas = '<option value="sin-region">Seleccione comuna</option><option value="sin-region">--</option>';

    jQuery.each(RegionesYcomunas.regiones, function () {
        htmlRegion = htmlRegion + '<option value="' + RegionesYcomunas.regiones[iRegion].NombreRegion + '">' + RegionesYcomunas.regiones[iRegion].NombreRegion + '</option>';
        iRegion++;
    });

    jQuery('#regionesP').html(htmlRegion);
    jQuery('#comunasP').html(htmlComunas);
    jQuery('#regionesE').html(htmlRegion);
    jQuery('#comunasE').html(htmlComunas);

    jQuery('#regionesP').change(function () {
        var iRegiones = 0;
        var valorRegion = jQuery(this).val();
        var htmlComuna = '<option value="sin-comuna">Seleccione comuna</option><option value="sin-comuna">--</option>';
        jQuery.each(RegionesYcomunas.regiones, function () {
            if (RegionesYcomunas.regiones[iRegiones].NombreRegion == valorRegion) {
                var iComunas = 0;
                jQuery.each(RegionesYcomunas.regiones[iRegiones].comunas, function () {
                    htmlComuna = htmlComuna + '<option value="' + RegionesYcomunas.regiones[iRegiones].comunas[iComunas] + '">' + RegionesYcomunas.regiones[iRegiones].comunas[iComunas] + '</option>';
                    iComunas++;
                });
            }
            iRegiones++;
        });
        jQuery('#comunasP').html(htmlComuna);
    });
    jQuery('#comunasP').change(function () {
        if (jQuery(this).val() == 'sin-region') {
            swal("error", "seleccione region particular", "error");
        } else if (jQuery(this).val() == 'sin-comuna') {
            swal("error", "seleccione comunaparticular", "error");
        }
    });
    jQuery('#regionesP').change(function () {
        if (jQuery(this).val() == 'sin-region') {
            swal("error", "seleccione region particular", "error");
        }
    });

    jQuery('#regionesE').change(function () {
        var iRegiones = 0;
        var valorRegion = jQuery(this).val();
        var htmlComuna = '<option value="sin-comuna">Seleccione comuna</option><option value="sin-comuna">--</option>';
        jQuery.each(RegionesYcomunas.regiones, function () {
            if (RegionesYcomunas.regiones[iRegiones].NombreRegion == valorRegion) {
                var iComunas = 0;
                jQuery.each(RegionesYcomunas.regiones[iRegiones].comunas, function () {
                    htmlComuna = htmlComuna + '<option value="' + RegionesYcomunas.regiones[iRegiones].comunas[iComunas] + '">' + RegionesYcomunas.regiones[iRegiones].comunas[iComunas] + '</option>';
                    iComunas++;
                });
            }
            iRegiones++;
        });
        jQuery('#comunasE').html(htmlComuna);
    });
    jQuery('#comunasE').change(function () {
        if (jQuery(this).val() == 'sin-region') {
            swal("error", "seleccione region de envio", "error");
        } else if (jQuery(this).val() == 'sin-comuna') {
            swal("error", "seleccione comuna de envio", "error");
        }
    });
    jQuery('#regionesE').change(function () {
        if (jQuery(this).val() == 'sin-region') {
            swal("error", "seleccione region de envio", "error");
        }
    });


};

Template.Cliente.helpers({
    idUser() {
        return Meteor.user() ? Meteor.user()._id : false;
    },
    clients() {
        return ClientList.find();
        //  return Clients.find().map(function (o, i) {
        /* let img = Images.findOne({
             "meta.flowerId": o._id
         });*/

        //  o.img = img ? img.link() : "img/flower.png";
        //return o;
        // });
    },
    currentClient() {
        return Session.get("ClienteSeleccionado");
    }
});

Template.Cliente.events({
    /* "dragover .item-flower": function(e, t) {
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

         doc.name = name;
         doc.description = description;

         console.log(doc);
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
     }*/
    "click #btnG": function (e) {

        let doc = {};
        doc.nombre = $("#nombre").val();
        doc.apellido = $("#apellido").val();
        doc.email = $("#email").val();
        doc.calleP = $("#calleP").val();
        doc.numeroP = $("#numeroP").val();
        doc.regionesP = $("#regionesP").val();
        doc.comunasP = $("#comunasP").val();
        doc.calleE = $("#calleE").val();
        doc.numeroE = $("#numeroE").val();
        doc.regionesE = $("#regionesE").val();
        doc.comunasE = $("#comunasE").val();
        let client = Session.get("ClienteSeleccionado");
        //  console.log("clic guardar"+nombre+apellido+email+calleP+numeroP+regionesP+comunasP+calleE+numeroE+regionesE+comunasE);

        if (doc.nombre == "" || doc.apellido == "" || doc.email == "" || doc.calleE == "" || doc.calleP == "" || doc.numeroP == "" || doc.regionesP == "" || doc.comunasP == "" || doc.numeroE == "" || doc.regionesE == "" || doc.comunasE == "" || doc.regionesE == 'sin-region' || doc.regionesP == 'sin-region' || doc.comunasE == 'sin-comuna' || doc.comunasP == 'sin-comuna')
            swal("error", "favor completar todos los campos", "error");
        else Meteor.call("AddClients", client ? client._id : false, doc, function (err, resp) {
            if (!err) {
                if (!client._id) {
                    client._id = resp;
                }
                console.log(resp);
            } else console.warn(err);
        });
        $("#modal-ingreso-cliente").hide();
    },
    "click #addC": function (e) {
        Session.set("ClienteSeleccionado", {});
        $("#modal-ingreso-cliente").show();
    },
    "click #btnC": function (e) {
        $("#modal-ingreso-cliente").hide();
    },
    "click #btnCa": function (e) {
        Session.set("ClienteSeleccionado", {});
        /*
        $("#nombre").val("");
  
        $("#apellido").val(""); 
        $("#email").val("");
           
        $("#calleP").val("");
          
        $("#numeroP").val("");
         
        $("#regionesP").val("sin-region");
        $("#comunasP").val("sin-comuna"); 
        $("#calleE").val("");
          
        $("#numeroE").val("");
         
        $("#regionesE").val("sin-region");
        $("#comunasE").val("sin-comuna");
        */

    },

    "click .btn-client-delete": function (e) {
        console.log("id: " + e.currentTarget.id);
        Meteor.call("RemoveClients", e.currentTarget.id, function (err, resp) {
            if (!err) {
                console.log("Cliente aniquilado " + resp);
            }
        });
    },
    "click .btn-client-update": function (e) {// solo rellenar form
        $("#modal-ingreso-cliente").show();
        let id = e.currentTarget.id;
        let doc = ClientList.findOne({"_id": id});
        console.log(doc.nombre);
        Session.set("ClienteSeleccionado", doc);

        /*doc._id=id;
        doc.nombre=$("#"+id+"nombre").html();
        doc.apellido=$("#"+id+"apellido").html();
           doc.email=$("#"+id+"email").html();
          doc.calleP=$("#"+id+"calleP").html();
         doc.numeroP=$("#"+id+"numeroP").html();
        doc.regionesP=$("#"+id+"regionesP").html();
        doc.comunasP=$("#"+id+"comunasP").html();
          doc.calleE=$("#"+id+"calleE").html();
         doc.numeroE=$("#"+id+"numeroE").html();
        doc.regionesE=$("#"+id+"regionesE").html();
        doc.comunasE=$("#"+id+"comunasE").html();*/
        /*
        $("#nombre").val($("#"+id+"nombre").html());

        $("#apellido").val($("#"+id+"apellido").html());
        $("#email").val($("#"+id+"email").html());

        $("#calleP").val($("#"+id+"calleP").html());

        $("#numeroP").val($("#"+id+"numeroP").html());

        $("#regionesP").val($("#"+id+"regionesP").html());
        $("#comunasP").val($("#"+id+"comunasP").html());
        $("#calleE").val($("#"+id+"calleE").html());

        $("#numeroE").val($("#"+id+"numeroE").html());

        $("#regionesE").val($("#"+id+"regionesE").html());
        $("#comunasE").val($("#"+id+"comunasE").html());
        */
        window.scrollTo(0, 0);
    }

});

