const { Schema, model } = require('mongoose');

const goalSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        },

        targetAmount: {
            type: Number,
            required: true,
        },

        currentProgress: {
            type: Number,
            required: true,
            default: 0,
        },

        targetDate: {
            type: Date,
            required: true,
        },
        status: {
            type: String,
            enum: ['pending', 'fulfilled', 'failed'],
            default: 'pending',
        },
        userId: {
            type: Schema.Types.ObjectId,
            required: [true, 'User is required'],
            ref: 'User',
        },
    },
    { timestamps: true, versionKey: false }
);

const Goal = model('Goal', goalSchema);

module.exports = Goal;
