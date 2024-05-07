import mongoose from 'mongoose';
let Schema = mongoose.Schema;

let pipeline = new Schema({
    owner: {
        type: String,
        require: true
    },
    state: Object,
    created_at: {
        type: Date,
        required: true,
        default: Date.now
    }
});
let Pipeline = mongoose.model('Pipeline', pipeline);
mongoose.models = {};
export default Pipeline;