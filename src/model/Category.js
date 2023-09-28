const { Schema, model } = require('mongoose');

const categorySchema = new Schema(
    {
        title: {
            type: String,
            required: [true, 'Title is required'],
            trim: true,
        },
        description: {
            type: String,
            required: [true, 'Description is required'],
            trim: true,
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'User is required'],
        },
    },
    { timestamps: true, versionKey: false }
);

const Category = model('Category', categorySchema);

module.exports = Category;
