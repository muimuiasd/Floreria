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
});