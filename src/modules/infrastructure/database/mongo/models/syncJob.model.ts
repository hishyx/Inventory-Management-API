import { Schema, model as createModel, type InferSchemaType } from "mongoose";

const syncJobSchema = new Schema(
  {
    operation: {
      type: String,
      required: true,
    },
    payload: {
      type: Schema.Types.Mixed,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "PENDING",
    },
  },
  { timestamps: true },
);

// export type UserType = InferSchemaType<typeof userSchema>;

const SyncJob = createModel("syncJob", syncJobSchema);

export default SyncJob;
