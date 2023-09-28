const { Schema, model } = require('mongoose');

const budgetSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        type: {
            type: String,
            enum: ['weekly', 'monthly', 'yearly'],
            required: true,
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        },
        date: {
            type: Date,
            required: true,
            trim: true,
        },
        amount: {
            type: Number,
            required: true,
            trim: true,
        },
        categoryId: {
            type: Schema.Types.ObjectId,
            ref: 'Category',
            required: true,
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
        virtuals: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

// userId, categoryId, type should be unique
budgetSchema.index({ userId: 1, categoryId: 1, type: 1 }, { unique: true });

budgetSchema.virtual('category', {
    ref: 'Category',
    localField: 'categoryId',
    foreignField: '_id',
    justOne: true,
});

const Budget = model('Budget', budgetSchema);

module.exports = Budget;
