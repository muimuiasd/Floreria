Meteor.publish('Images', function () {
    return Images.find().cursor;
});

Meteor.publish("flowers", function() {
    return Flowers.find();
});
Meteor.publish("clients", function() {
    return ClientList.find();
});
Meteor.publish("ListCategories", function() {
    return MyCategories.find();
});
Meteor.publish("pedidos", function() {
    return Pedidos.find();
});
