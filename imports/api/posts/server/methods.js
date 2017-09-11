import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { CallPromiseMixin } from 'meteor/didericis:callpromise-mixin';
import SimpleSchema from 'simpl-schema';

// Lib
import rateLimit from '../../libs/rate-limit';

import Posts from '../posts';

// Find
export const findPosts = new ValidatedMethod({
    name: 'findPosts',
    mixins: [CallPromiseMixin],
    validate: null,
    run({ selector, options }) {
        Meteor._sleepForMs(1000);
        return Posts.find(selector, options).fetch();
    }
});

// Find one
export const findOnePost = new ValidatedMethod({
    name: 'findOnePost',
    mixins: [CallPromiseMixin],
    validate: null,
    run({ _id }) {
        Meteor._sleepForMs(1000);
        return Posts.findOne(_id);
    }
});

// Insert
export const insertPost = new ValidatedMethod({
    name: 'insertPost',
    mixins: [CallPromiseMixin],
    validate: new SimpleSchema({
        title: { type: String },
        body: { type: String },
        private: { type: Boolean },
    }).validator(),
    run(doc) {
        Meteor._sleepForMs(1000);
        return Posts.insert(doc);
    }
});

// Update
export const updatePost = new ValidatedMethod({
    name: 'updatePost',
    mixins: [CallPromiseMixin],
    validate: null,
    run(doc) {
        Meteor._sleepForMs(1000);
        return Posts.update({ _id: doc._id }, { $set: doc });
    }
});

export const removePost = new ValidatedMethod({
    name: 'removePost',
    mixins: [CallPromiseMixin],
    validate: new SimpleSchema({
        _id: { type: String },
    }).validator(),
    run({ _id }) {
        Meteor._sleepForMs(1000);
        return Posts.remove(_id);
    }
});

rateLimit({
    methods: [
        findPosts,
        findOnePost,
        insertPost,
        updatePost,
        removePost,
    ],
});
