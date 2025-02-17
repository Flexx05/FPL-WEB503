import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 3,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);
productSchema.plugin(mongoosePaginate);

export default mongoose.model("Product", productSchema);
