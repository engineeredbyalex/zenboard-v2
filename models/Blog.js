import { model, models, Schema } from "mongoose";

const blogSchema = new Schema(
    {
        title: { type: String, required: true },
        headingOne: { type: String, required: true },
    },
    {
        timestamps: true,
    }
)


export const Blog = models.Blog || model('Blog', blogSchema);