import Fastify from "fastify";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const mongoURI = process.env.MONGODB_URI;
const port = process.env.PORT;

// Import my routes
import userRoutes from "./routes/user.routes.js";
import projectRoutes from "./routes/project.routes.js";

// Connect to DB
async function connectDB() {
  try {
    await mongoose.connect(mongoURI);
    console.log("✅ Successfully connected");
  } catch (err) {
    console.error("❌ Connect error:", err);
  }
}

connectDB()

// Start server
const fastify = Fastify({ logger: true });
fastify.register(userRoutes, { prefix: "/api/v1/users" });
fastify.register(projectRoutes, { prefix: "/api/v1/projects" });

const start = async () => {
  try {
    await fastify.listen({ port: port, host: "0.0.0.0" });
    fastify.log.info(
      `Server is running on port ${fastify.server.address().port}`,
    );
  } catch (error) {
    console.error("ERROR WHILE RUNNING:");
    console.error(error);
    process.exit(1);
  }
};

start();
