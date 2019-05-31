Template.catalogue.onCreated = function()
{
    console.log(Flowers.find().count());
};

Template.catalogue.helpers({
    flores()
    {
        return Flowers.find();
    }
});

