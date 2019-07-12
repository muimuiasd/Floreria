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
    },
    AddCategoria(id, doc) {
        if (!id) {
            return MyCategories.insert(doc);
        }
        MyCategories.update({
            _id: id
        }, {
            $set: doc
        });
        return id;
    },

    RemoveCategoria(id) {
        MyCategories.remove({
            _id: id
        });
    },
    AddPedido(id, doc) {
        if (!id) {
            return Pedidos.insert(doc);
        }
        Pedidos.update({
            _id: id
        }, {
            $set: doc
        });
        return id;
    },

    RemovePedido(id) {
        Pedidos.remove({
            _id: id
        });
    }
});
