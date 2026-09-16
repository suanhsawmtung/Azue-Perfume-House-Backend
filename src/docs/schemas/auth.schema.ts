export const authSchemas = {
  LoginRequest: {
    type: "object",
    required: ["email", "password"],
    properties: {
      email: {
        type: "string",
        format: "email",
        example: "user@example.com",
      },
      password: {
        type: "string",
        format: "password",
        minLength: 8,
        maxLength: 12,
        example: "password123",
      },
    },
  },
  LoginUser: {
    type: "object",
    properties: {
      id: { type: "integer", example: 1 },
      firstName: { type: "string", nullable: true, example: "Jane" },
      lastName: { type: "string", nullable: true, example: "Doe" },
      username: { type: "string", example: "jane-doe" },
      email: {
        type: "string",
        format: "email",
        example: "user@example.com",
      },
      phone: { type: "string", nullable: true },
      image: { type: "string", nullable: true },
      emailVerifiedAt: {
        type: "string",
        format: "date-time",
        nullable: true,
      },
      points: { type: "integer", example: 0 },
      role: { type: "string", enum: ["USER", "ADMIN", "AUTHOR"] },
      status: { type: "string", enum: ["ACTIVE", "INACTIVE", "FREEZE"] },
      provider: { type: "string", enum: ["EMAIL", "GOOGLE"] },
      createdAt: { type: "string", format: "date-time" },
      updatedAt: { type: "string", format: "date-time" },
    },
  },
  LoginResponse: {
    type: "object",
    required: ["success", "message", "data"],
    properties: {
      success: { type: "boolean", example: true },
      message: { type: "string", example: "Successfully login" },
      data: { $ref: "#/components/schemas/LoginUser" },
    },
  },
  AuthError: {
    type: "object",
    required: ["message", "error"],
    properties: {
      message: { type: "string", example: "Invalid password!" },
      error: { type: "string", example: "Error_InvalidPassword" },
    },
  },
};
