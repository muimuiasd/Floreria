import {Mongo} from 'meteor/mongo';
MyCategories=new Meteor.Collection('ListCategories');
Flowers = new Meteor.Collection("flowers");

Meteor.users.allow({
    insert() {
        return false;
    },
    update() {
        return false;
    },
    remove() {
        return true;
    }
});

Meteor.flowers.allow({
    insert() {
        return false;
    },
    update() {
        return false;
    },
    remove() {
        return true;
    }
});
