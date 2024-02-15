const { Schema, model} = require('mongoose');

const blogSchema = new Schema({

    title: {
        type: String,
        required: true,
    
        // validate: {
        //     validator: function (v) {
        //         return /\[A-Z][a-z]/.test(v)
        //     },

        //     message: 'Do not add numbers'  
        // }
    },

    description: {
        type: String,
        required: true
    },

    body: {
        type: String,
        required:true
    }
}, {timestamps: true})

const Blog = model('blog', blogSchema);


module.exports = Blog;