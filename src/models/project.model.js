import mongoose from 'mongoose';
import User from './user.model.js'

const ProjectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    projectManager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      validate: {
        validator: async function (v) {
          const user = await mongoose.model("User").findById(v);
          if (!user) return false;
          return ["Admin", "Project Manager", "Project manager"].includes(
            user.role,
          );
        },
        message: (props) => `User role must be 'Admin' or 'Project Manager'`,
      },
    },
    teamMembers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true },
);

const Project = mongoose.model("Project", ProjectSchema)

export default Project;