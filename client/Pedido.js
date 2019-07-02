
Template.Pedido.onCreated(function()
{
  //  currentUpload = new ReactiveVar(false);
});

Template.Pedido.rendered = function()
{
  $(function () {
                  $('#datetimepicker1').datetimepicker();
              });
};


Template.Pedido.helpers({

});

Template.Pedido.events({

});
