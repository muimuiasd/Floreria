import {Mongo} from 'meteor/mongo';
MyCategories=new Meteor.Collection('ListCategories');
Flowers = new Meteor.Collection("flowers");
Clients = new Meteor.Collection("clients");
var HomePath = process.env.PWD ? process.env.PWD : process.cwd();

Images = new FilesCollection({
    collectionName: 'Images',
    allowClientCode: true,
    transport: Meteor.absoluteUrl().indexOf('localhost:3000') != -1 ? 'http' : 'https',
    storagePath: () => {
        return HomePath + "/uploads";
    },
    onBeforeUpload(file) {
        if (file.size <= 10485760 && /png|jpg|jpeg/i.test(file.extension)) {
            return true;
        }
        return 'Please upload image, with size equal or less than 10MB';
    }
});

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
