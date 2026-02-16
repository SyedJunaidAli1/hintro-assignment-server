import mongoose from "mongoose";

const activitySchema = new mongoose.Schema(
  {
    boardId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Board",
      required: true,
      index: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    action: {
      type: String,
      required: true,
    },

    entityId: {
      type: mongoose.Schema.Types.ObjectId,
    },
  },
  { timestamps: true },
);

activitySchema.index({ boardId: 1, createdAt: -1 });

export default mongoose.model("Activity", activitySchema);
