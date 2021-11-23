import mongoose from 'mongoose';

const schema = mongoose.Schema({
    name: String,
    host: String,
    port: Number,
    email: String,
    password: String
}, { collection: 'secondary_node', versionKey: false })

export default mongoose.model('Secondary', schema)