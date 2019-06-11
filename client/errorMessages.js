Template.errorMessages.helpers({
    messages: function () {
        var messages = Session.get('MensajesError');
        return messages;
    }
});