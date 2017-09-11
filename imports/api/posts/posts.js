import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Post = new Mongo.Collection('post');

Post.schema = new SimpleSchema({
    title: {
        type: String,
    },
    body: {
        type: String,
    },
    private: {
        type: Boolean,
    },
});

Post.attachSchema(Post.schema);
export default Post;
