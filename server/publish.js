Meteor.publish('Images', function () {
    return Images.find().cursor;
});

Meteor.publish("flowers", function() {
    return Flowers.find();
});
Meteor.publish("clients", function() {
    return Clients.find();
});