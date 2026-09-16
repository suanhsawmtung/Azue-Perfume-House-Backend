export const authPaths = {
  "/api/v1/auth/login": {
    post: {
      summary: "User Login",
      description:
        "Authenticates a user with email and password, returning tokens and user data. Sets httpOnly cookies for access and refresh tokens.",
      tags: ["Auth"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["email", "password", "provider"],
              properties: {
                email: {
                  type: "string",
                  format: "email",
                  example: "admin@example.com",
                },
                password: {
                  type: "string",
                  format: "password",
                  example: "password123",
                },
                provider: {
                  type: "string",
                  enum: ["EMAIL"],
                  example: "EMAIL",
                  description:
                    "Auth provider for login. Only EMAIL is supported for this route.",
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Successfully logged in.",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: {
                    type: "boolean",
                  },
                  message: {
                    type: "string",
                  },
                  data: {
                    $ref: "#/components/schemas/User",
                  },
                },
              },
            },
          },
        },
        400: {
          description: "Validation error or invalid credentials/provider.",
          content: {
            "application/json": {
              schema: {
                oneOf: [
                  { $ref: "#/components/schemas/ErrorResponse" },
                  { $ref: "#/components/schemas/ValidationErrorResponse" },
                ],
              },
            },
          },
        },
        401: {
          description: "Authentication failed.",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
              },
            },
          },
        },
      },
    },
  },
  "/api/v1/auth/google": {
    get: {
      summary: "Google OAuth Login",
      description:
        "Redirects the user to Google's OAuth2.0 consent screen to initiate the login flow.",
      tags: ["Auth"],
      responses: {
        302: {
          description: "Redirect to Google.",
        },
      },
    },
  },
};

export const authSchemas = {
  ErrorResponse: {
    type: "object",
    properties: {
      message: {
        type: "string",
        example: "Invalid password!",
      },
      error: {
        type: "string",
        example: "Error_InvalidPassword",
      },
    },
  },
  ValidationErrorResponse: {
    type: "object",
    properties: {
      message: {
        type: "string",
        example: "Invalid email address!",
      },
      error: {
        type: "string",
        example: "Error_Invalid",
      },
    },
    description:
      "Special case of ErrorResponse where the error code is typically 'Error_Invalid' for validation failures.",
  },
};
