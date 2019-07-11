Meteor.startup(function()
{
    if (Meteor.users.find().count() == 1)
    {
        Accounts.createUser({
            username: 'Benjamin',
            email: 'benjamin@laslilas.com',
            password: 'laslilas2019',
            profile: {
                name: 'Benjamin'
            }
        });
    }
});