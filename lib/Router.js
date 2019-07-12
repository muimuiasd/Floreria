
Router.configure({
    layoutTemplate: 'layout',
    notFoundTemplate: 'notFound',
    loadingTemplate: 'loading',
});

Router.route('/', {
    template: 'home'
});

Router.route('/register', {
    template: 'register'
});
Router.route('/catalogue', {
    template: 'catalogue',
    waitOn: function()
    {

        return [
            Meteor.subscribe("flowers"),
            Meteor.subscribe("Images"),
            Meteor.subscribe("ListCategories")
        ];
    }
});
Router.route('/Pedido', {
    template: 'Pedido',
    waitOn: function()
    {

        return [
            Meteor.subscribe("pedidos"),
             Meteor.subscribe("clients"),
             Meteor.subscribe("flowers"),
             Meteor.subscribe("Images")
         ];
     }
});

Router.route('/admin',{
    template:'/admin',
    waitOn: function()
    {

        return [
            Meteor.subscribe("ListCategories"),
            Meteor.subscribe("clients"),
            Meteor.subscribe("flowers"),
            Meteor.subscribe("pedidos"),
            Meteor.subscribe("Images")

        ];
    }
});
Router.route('/categoria', {
    template: 'categoria',
    waitOn: function()
    {

        return [
             Meteor.subscribe("ListCategories"),
         ];
     }
});
Router.route('/clientecsv', {
    where: 'server',
    action: function () {
      var filename = 'listaClientes.csv';
      var fileData = "";
  
      var headers = {
        'Content-type': 'text/csv',
        'Content-Disposition': "attachment; filename=" + filename
      };
      var records = ClientList.find();
      // build a CSV string. Oversimplified. You'd have to escape quotes and commas.
      records.forEach(function(rec) {
        fileData += rec.nombre +";"+ rec.apellido+ ";"+ rec.apellido+ ";"+ rec.email+ ";"+ rec.calleP+ ";"+ rec.numeroP+ ";"+ rec.regionesP+ ";"+ rec.comunasP+ ";"+"envio"+";"+ rec.calleE+ ";"+rec.numeroE+ ";"+ rec.regionesE+ rec.comunasE+";"+"\r\n";
      });
      this.response.writeHead(200, headers);
      return this.response.end(fileData);
    }
  });
  Router.route('/productocsv', {
    where: 'server',
    action: function () {
      var filename = 'listaProductos.csv';
      var fileData = "";
  
      var headers = {
        'Content-type': 'text/csv',
        'Content-Disposition': "attachment; filename=" + filename
      };
      var records = Flowers.find();
      // build a CSV string. Oversimplified. You'd have to escape quotes and commas.
      records.forEach(function(rec) {
        fileData += rec.name +";"+ rec.description+ ";"+ rec.precio+ ";"+ "ancho: "+rec.ancho+ ";"+"alto: "+ rec.alto+";"+rec.categorias+"\r\n";
      });
      this.response.writeHead(200, headers);
      return this.response.end(fileData);
    }
  });
  Router.route('/pedidoscsv', {
    where: 'server',
    action: function () {
      var filename = 'listaPedidos.csv';
      var fileData = "";
  
      var headers = {
        'Content-type': 'text/csv',
        'Content-Disposition': "attachment; filename=" + filename
      };
      var records = Pedidos.find();
      // build a CSV string. Oversimplified. You'd have to escape quotes and commas.
      records.forEach(function(rec) {
        fileData += rec.cliente.nombre +";"+ rec.fecha+ ";"+ rec.total+ ";"+"\r\n"+"\r\n";
        for (let i = 0; i < rec.productos.length; i++) {
             fileData+= rec.productos[i].producto.name+";"+rec.productos[i].producto.precio+";"+rec.productos[i].cantidad+";"+(rec.productos[i].cantidad*rec.productos[i].producto.precio)+"\r\n";
            
        }
      });
      this.response.writeHead(200, headers);
      return this.response.end(fileData);
    }
  });
  Router.route('/categoriascsv', {
    where: 'server',
    action: function () {
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
      var filename = 'listaPedidos.csv';
      var fileData = "";
  
      var headers = {
        'Content-type': 'text/csv',
        'Content-Disposition': "attachment; filename=" + filename
      };
      var records =  catArray.map(function(c)
      {
          let cat = {
              name: c
          };
          return cat;
      });

      // build a CSV string. Oversimplified. You'd have to escape quotes and commas.
        fileData +=
      records.forEach(function(rec) {
        fileData += rec.name+"\r\n";
      });
      this.response.writeHead(200, headers);
      return this.response.end(fileData);
    }
  });
