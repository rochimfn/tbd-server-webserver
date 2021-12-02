import mongoose from "mongoose";

const schema = mongoose.Schema({
    full_name: String,
    email: String,
    password: String,
}, { collection: 'user', versionKey: false })

export default mongoose.model("User", schema)