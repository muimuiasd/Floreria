Meteor.startup(function()
{
    if (Meteor.users.find().count() == 0)
    {
        Accounts.createUser({
            username: 'admin',
            email: 'admin@test.com',
            password: 'test',
            profile: {
                name: 'Test Admin'
            }
        });
    }
    if (Flowers.find().count() == 0)
    {
        flowerArray.forEach(function(flower) {
            Flowers.insert(flower);
        })
    }
});

var flowerArray = [
    {
        flower: "Margarita001",
        category: "Margaritas"
    },
    {
        flower: "Margarita002",
        category: "Margaritas"
    },
    {
        flower: "Margarita003",
        category: "Margaritas"
    }];