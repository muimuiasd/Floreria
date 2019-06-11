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
            return ClientList.insert(doc);
        }
        ClientList.update({
            _id: id
        }, {
            $set: doc
        });
        return id;
    },

    RemoveClients(id) {
        ClientList.remove({
            _id: id
        });
    }
});
