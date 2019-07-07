
Template.Pedido.onCreated(function()
{
  
});

Template.Pedido.rendered = function()
{
 // $('.datetimepicker').each(function(){
   // $(this).datetimepicker(); 

    
//});

};


Template.Pedido.helpers({
  idUser()
    {
        return Meteor.user() ? Meteor.user()._id : false;
    },
    clients()
    {
        return ClientList.find();
    },
    currentClient()
    {
        return Session.get("ClienteSeleccionado");
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
    }
});

Template.Pedido.events({
"changue #seleccionarCliente": function(e){

  // el cliente debe mostrarse en el cuadro de abajo
  //InfoClienteString
  console.log("entro a evento changue")
  let id=$("#seleccionarCliente").val();
  let docSelect=ClientList.findOne(id);
  console.log(docSelect);
}

  ,
  "changue #seleccionarProducto": function(e){
 // el producto debe mostrarse en el cuadro de abajo
 // InfoProductoString

  }
  
    ,
  "click #btnGp":function(e){
     

  

if(validarFormatoFecha(fecha)){
  if(existeFecha(fecha)){
       if(validarFechaMenorActual(fecha)){
          // trabajar aqui guardando

       }else{
        swal ( "error" ,  "La fecha introducida es menor a la actual" ,  "error" );
       }

  }else{
        swal ( "error" ,  "La fecha introducida no existe." ,  "error" );
  }
}else{
  swal ( "error" ,  "El formato de la fecha es incorrecto." ,  "error" );
}

    let doc={};
     doc.nombre=$("#nombre").val();
   doc.apellido=$("#apellido").val();  
      doc.email=$("#email").val();
     doc.calleP=$("#calleP").val();
    doc.numeroP=$("#numeroP").val();
  doc.regionesP=$("#regionesP").val(); 
   doc.comunasP=$("#comunasP").val(); 
     doc.calleE=$("#calleE").val();
    doc.numeroE=$("#numeroE").val();
  doc.regionesE=$("#regionesE").val();   
   doc.comunasE=$("#comunasE").val();
   let client = Session.get("ClienteSeleccionado");
    

  if(doc.nombre=="" || doc.apellido==""|| doc.email=="" || doc.calleE=="" || doc.calleP=="" || doc.numeroP=="" || doc.regionesP=="" || doc.comunasP=="" || doc.numeroE=="" || doc.regionesE=="" || doc.comunasE=="" || doc.regionesE== 'sin-region' || doc.regionesP== 'sin-region' || doc.comunasE == 'sin-comuna' || doc.comunasP == 'sin-comuna')
    swal ( "error" ,  "favor completar todos los campos" ,  "error" );
else Meteor.call("AddClients", client ? client._id : false, doc, function (err, resp)
{
    if (!err)
    {
        if (!client._id)
        {
            client._id = resp;
        }
        console.log(resp);
    } else console.warn(err);
});
},
"click #btnCap":function(e){
Session.set("ClienteSeleccionado", {});
}
});
function validarFormatoFecha(campo) {
  var RegExPattern = /^\d{1,2}\/\d{1,2}\/\d{2,4}$/;
  if ((campo.match(RegExPattern)) && (campo!='')) {
        return true;
  } else {
        return false;
  }
}
function existeFecha(fecha){
var fechaf = fecha.split("/");
var day = fechaf[0];
var month = fechaf[1];
var year = fechaf[2];
var date = new Date(year,month,'0');
if((day-0)>(date.getDate()-0)){
    return false;
}
return true;
}

function existeFecha2 (fecha) {
var fechaf = fecha.split("/");
var d = fechaf[0];
var m = fechaf[1];
var y = fechaf[2];
return m > 0 && m < 13 && y > 0 && y < 32768 && d > 0 && d <= (new Date(y, m, 0)).getDate();
}
function validarFechaMenorActual(date){
var x=new Date();
var fecha = date.split("/");
x.setFullYear(fecha[2],fecha[1]-1,fecha[0]);
var today = new Date();

if (x >= today)
return false;
else
return true;
}
