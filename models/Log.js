import mongoose from 'mongoose';

const schema = mongoose.Schema({
    database: String,
    directory: String,
    fileName: String,
    type: String,
    uploaded: [String]
}, { collection: 'backup_logs', versionKey: false })

export default mongoose.model('Log', schema)