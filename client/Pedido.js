
Template.Pedido.onCreated(function () {

});

Template.Pedido.rendered = function () {
};


Template.Pedido.helpers({
  idUser() {
    return Meteor.user() ? Meteor.user()._id : false;
  },
  clients() {
    return ClientList.find();
  },
  currentClient() {
    return Session.get("ClienteSeleccionado");
  },
  flowers() {
    return Flowers.find().map(function (o, i) {
      let img = Images.findOne({
        "meta.flowerId": o._id
      });

      o.img = img ? img.link() : "img/flower.png";
      return o;
    });
  },
  pedidos()
  {
    return Pedidos.find();
  }
});

Template.Pedido.events({
  "change #seleccionarCliente": function (e) {
    if ($("#seleccionarCliente").val() != "seleccione") {
      let id = $("#seleccionarCliente").val();
      let docSelect = ClientList.findOne({ "_id": id });

      $("#InfoClienteString").val(docSelect.nombre + " " + docSelect.apellido);
    } else {
      swal("error", "favor seleccione cliente", "error");

    }
  },
  "change #seleccionarProducto": function (e) {
    if ($("#seleccionarProducto").val() != "seleccione") {
      let id = $("#seleccionarProducto").val();
      let docSelect = Flowers.findOne({ "_id": id });
      $("#InfoProductoString").val(docSelect.name + " " + docSelect.precio);
    } else {
      swal("error", "favor seleccione producto", "error");

    }
  },
  "click #addp": function (e) {
    Session.set("PedidoSeleccionado", {});
    $("#modal-ingreso-pedido").show();
},
  "click #btngap": function (e) {
    let fecha=$("#datepicker").val();
   
    if(validarFormatoFecha(fecha)){
      if(existeFecha(fecha)){
           if(!validarFechaMenorActual(fecha)){
            if ($("#seleccionarProducto").val() != "seleccione" && $("#seleccionarCliente").val() != "seleccione") {
              let cliente = ClientList.findOne({ "_id": $("#seleccionarCliente").val() });
              let producto = Flowers.findOne({ "_id": $("#seleccionarProducto").val() });
              let cantidad = $("#cantidadProductos").val();
              
              if (cantidad >= 1) {
                $("#seleccionarCliente").attr("disabled", "disabled");
                $("#inputNombreDetalles").html(cliente.nombre);
                $("#inputdireccionDetalles").html(cliente.calleE + cliente.numeroE + "comuna: " + cliente.comunasE + "region: " + cliente.regionesE);
                let html = '<tr><th scope="row">' + producto.name + '</th><td >' + producto.precio + '</td><td>' + cantidad + '</td><td>' + (cantidad * producto.precio) + '</td><td hidden class="idproducto">' + (producto._id) + '</td></tr>';
                $("#agregardetalles").append(html);
              } else {
                swal ( "error" ,  "debe ingresar almenos 1 producto" ,  "error" );
        
              }
            }else{

              swal ( "error" ,  "debe seleccionar cliente y producto" ,  "error" );
            }
    
           }else{
            swal ( "error" ,  "La fecha introducida es menor a la actual" ,  "error" );
           }
    
      }else{
            swal ( "error" ,  "La fecha introducida no existe." ,  "error" );
      }
    }else{
      swal ( "error" ,  "El formato de la fecha es incorrecto." ,  "error" );
    }
   
  },
  "click #btnGp": function () {

     let fecha=$("#datepicker").val();
   
    if(validarFormatoFecha(fecha)){
      if(existeFecha(fecha)){
           if(!validarFechaMenorActual(fecha)){
            if ($("#seleccionarProducto").val() != "seleccione" && $("#seleccionarCliente").val() != "seleccione") {
             
              let cantidad = $("#cantidadProductos").val();
              console.log(cantidad);
              if (cantidad >= 1) {
                var nFilas = $('#tablaCuantica >tbody >tr').length;
                var array=new Array(nFilas);
                console.log()
              if(nFilas>=1){
                let pedidodoc = {};  
                var arrayc= new Array(nFilas);
                 var cont=0;
                 var contc=0;
                 let suma=0;
                $(".idproducto").parent("tr").find("td").each(function( index) {
                    if((index+1)%4==0){
                      array[cont]=Flowers.findOne({ "_id": $(this).text() }).name + " "+Flowers.findOne({ "_id": $(this).text() }).precio;
                      cont++;
                    }
                    if((index+2)%4==0){
                     suma+=parseInt($(this).text());
                    }
                    if((index+3)%4==0){
                      arrayc[contc]=parseInt($(this).text());
                      contc++;
                     }
          
                  });
                pedidodoc.cliente = ClientList.findOne({ "_id": $("#seleccionarCliente").val() });
                pedidodoc.productos=array;
                pedidodoc.total=suma;
                pedidodoc.cantidades=arrayc;
                pedidodoc.fecha=fecha;
                let pedido = Session.get("pedidoSeleccionado");
                Meteor.call("AddPedido", pedido ? pedido._id : false, pedidodoc, function (err, resp) {
                  if (!err) {
                    if (!pedido._id) {
                      pedido._id = resp;
                    }
                    console.log(resp);
                  } else console.warn(err);
                
                });
                swal("guardado", "operacion exitosa", "success");
                $("#modal-ingreso-pedido").hide();
              }else{

                swal ( "error" ,  "favor presionar agregar" ,  "error" );
        
              }

              } else {
                swal ( "error" ,  "debe ingresar almenos 1 producto" ,  "error" );
        
              }
            }else{

              swal ( "error" ,  "debe seleccionar cliente y producto" ,  "error" );
            }
    
           }else{
            swal ( "error" ,  "La fecha introducida es menor a la actual" ,  "error" );
           }
    
      }else{
            swal ( "error" ,  "La fecha introducida no existe." ,  "error" );
      }
    }else{
      swal ( "error" ,  "El formato de la fecha es incorrecto." ,  "error" );
    }
    
    
  },
  "click #btnGac": function () {
    setear();
    $("#modal-ingreso-pedido").hide();
  }




});
function setear(){

  $("#InfoProductoString").val("");
  $("#cantidadProductos").val("");
  $("#seleccionarProducto").val("seleccione");
  $("#InfoClienteString").val("");
  $("#seleccionarCliente").val("seleccione");
  $("#seleccionarCliente").removeAttr("disabled");
  $("#datepicker").val("");
  
  
  
  let html='<thead class="thead-dark"><tr><th scope="col">producto</th><th scope="col">precio</th><th scope="col">cantidad</th><th scope="col">sub total</th></tr></thead><tbody id="agregardetalles"></tbody>';
  $("#inputNombreDetalles").empty("");
  $("#inputdireccionDetalles").empty("");
  $("#tablaCuantica").empty();
  $("#tablaCuantica").append(html);
  

}
function validarFormatoFecha(campo) {
  var RegExPattern = /^\d{1,2}\/\d{1,2}\/\d{2,4}$/;
  if ((campo.match(RegExPattern)) && (campo != '')) {
    return true;
  } else {
    return false;
  }
}
function existeFecha(fecha) {
  console.log(fecha);
  var fechaf = fecha.split("/");
  var day = fechaf[0];
  var month = fechaf[1];
  var year = fechaf[2];
  var date = new Date(year, month, '0');
  if ((day - 0) > (date.getDate() - 0)) {
    return false;
    
  }else{
  return true;}
}

function existeFecha2(fecha) {
  var fechaf = fecha.split("/");
  var d = fechaf[0];
  var m = fechaf[1];
  var y = fechaf[2];
  return m > 0 && m < 13 && y > 0 && y < 32768 && d > 0 && d <= (new Date(y, m, 0)).getDate();
}
function validarFechaMenorActual(date) {
  var x = new Date();
  var fecha = date.split("/");
  x.setFullYear(fecha[2], fecha[1] - 1, fecha[0]);
  var today = new Date();

  if (x >= today)
    return false;
  else
    return true;
}
