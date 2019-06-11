Meteor.methods({
    AddFlower(id, doc) {
        if (!id) {
            return Flowers.insert(doc);
        }
        Flowers.update({
            _id: id
        }, {
            $set: doc
        });
        return id;
    },

    RemoveFlower(id) {
        Flowers.remove({
            _id: id
        });
    },
    AddClients(id, doc) {
        if (!id) {
            return Clients.insert(doc);
        }
        Clients.update({
            _id: id
        }, {
            $set: doc
        });
        return id;
    },

    RemoveClients(id) {
        Clients.remove({
            _id: id
        });
    }
});
