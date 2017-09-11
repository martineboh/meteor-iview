import { Meteor } from 'meteor/meteor';
import Posts from '../posts';

Meteor.publish('posts', (selector = {}, options = {}) => {
    return Posts.find(selector, options);
});
