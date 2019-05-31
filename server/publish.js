Meteor.publish("flowers", function() {
    return Flowers.find();
});