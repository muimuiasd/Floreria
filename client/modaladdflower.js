Template.modaladdflower.helpers({
    currentFlower()
    {
        return Session.get("FlorSeleccionada");
    },
    categoriasFlor()
    {
        return Session.get("CategoriasFlor").map(function(c){
            let cat = {
                nombre: c
            };
            return cat;
        });
    }
});
