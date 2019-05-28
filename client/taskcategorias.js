import {Template} from 'meteor/templating';
import './taskcategorias.html';

MyCollection =new Mongo.Collection('categories');
var data={
  name:"Roses",
  name:"tulipanes"
}

Template.taskcategorias.helpers({
   categories:[
     {text:'roses'},
     {text:'tulipanes'}
   ],
});
