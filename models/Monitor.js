import mongoose from 'mongoose';

const logSchema = mongoose.Schema({
    database: String,
    filename: String,
    type: String,
    created_at: Date,
    is_move: Number,
    is_restore: Number
});

const schema = mongoose.Schema({
    name: String,
    host: String,
    port: Number,
    logs: [logSchema]

}, { collection: 'node_monitor', versionKey: false })

export default mongoose.model('Monitor', schema)