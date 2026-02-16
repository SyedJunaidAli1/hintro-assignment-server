import mongoose from "mongoose";

const listSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    boardId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Board",
      required: true,
      index: true,
    },

    position: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

// 🔥 compound index (VERY impressive)
listSchema.index({ boardId: 1, position: 1 });

export default mongoose.model("List", listSchema);
