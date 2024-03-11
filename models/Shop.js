import { Model, Schema, model,  } from "mongoose";

const StoreData = new Schema({
    name: { type: String, unique: true, required: true },
    niche:String,
}, {
    timestamps:true
}

)

