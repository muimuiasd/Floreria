Template.modaladdflower.helpers({
    currentFlower()
    {
        return Session.get("FlorSeleccionada");
    },
    categoriasFlor()
    {
        return Session.get("CategoriasFlor").map(function(c, i){
            let cat = {
                index: i,
                nombre: c
            };
            return cat;
        });
    }
});
