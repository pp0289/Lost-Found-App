const { z } = require("zod");


// creating an object schema

const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid email address" })
    .min(3, { message: "Email must of atleast 3 characters" })
    .max(255, { message: "Email must not be of more than 255 characters" }),

  password: z
    .string({ required_error: "Password is required" })
    .trim()
    .min(6, { message: "Password must of atleast 6 characters" })
    .max(1024, { message: "Password must not be of more than 1024 characters" }),

});

const signUpSchema = loginSchema.extend({
    username: z
      .string({ required_error: "Name is required" })
      .trim()
      .min(3, { message: "Name must of atleast 3 characters" })
      .max(6, { message: "Username must not be of more than 6 characters" }),

    confirmPassword: z
      .string({ required_error: "Confirm Password is required" })
      .trim()
      .min(6, { message: "Password must of atleast 6 characters" })
      .max(1024, { message: "Password must not be of more than 1024 characters" }),

  }
);

module.exports = {signUpSchema, loginSchema};