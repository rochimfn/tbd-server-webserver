import mongoose from "mongoose";

const schema = mongoose.Schema({
    username: String,
    password: String,
    host: String,
    port: Number,
    database: [String]
}, { collection: 'primary_node', versionKey: false })

export default mongoose.model("Primary", schema)