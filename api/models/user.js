import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6, // Password length validation
    },
    role: {
      type: String,
      enum: ["driver", "student"],
      required: true,
    },
    busCode: {
      type: String,
    },
    routeDetails: {
      type: String,
    },
    timing: {
      type: String,
    },
    coordinatorName: {
      type: String,
    },
    coordinatorEmail: {
      type: String,
    },
    driverMobile: {
      type: String,
    },
    enrollmentNumber: {
      type: String,
      required: function () {
        return this.role === "student";
      },
      unique: function () {
        return this.role === "student";
      },
    },
    contactInfo: {
      mobile: {
        type: String,
      },
      coordinator: {
        name: String,
        email: String,
        mobile: String,
      },
    },
    assignedBus: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bus",
      required: function () {
        return this.role === "driver";
      },
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Password hashing middleware
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Model creation
export default mongoose.model("User", UserSchema);
