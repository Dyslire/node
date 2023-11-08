import mongoose from 'mongoose';

const { Schema, model } = mongoose;
const ProductSchema = new Schema({

    name: {
        type: String,
        required:true
    },
    description: {
        type: String,
        required:true
    },
    prix: {
        type: Number,
        required:true
    },
    availability:{
        type: Boolean,
        required:true
    },
    image: {
        type:String,
        required:true
    },
},
    {
        timestamp: true
    }
);

export default mongoose.model('product', ProductSchema);