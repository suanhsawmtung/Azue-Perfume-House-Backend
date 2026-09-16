export const authPaths = {
  "/v1/auth/sign-in": {
    post: {
      summary: "Log in with email and password",
      description:
        "Authenticates a verified user with email and password. On success, the API sets httpOnly accessToken and refreshToken cookies. Tokens are not returned in the JSON response.",
      tags: ["Auth"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/LoginRequest" },
          },
        },
      },
      responses: {
        200: {
          description: "Login successful.",
          headers: {
            "Set-Cookie": {
              description:
                "Sets the httpOnly accessToken and refreshToken cookies.",
              schema: { type: "string" },
            },
          },
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/LoginResponse" },
            },
          },
        },
        400: {
          description: "Invalid email/password input or password.",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/AuthError" },
              examples: {
                validationError: {
                  value: {
                    message: "Invalid email address!",
                    error: "Error_Invalid",
                  },
                },
                invalidPassword: {
                  value: {
                    message: "Invalid password!",
                    error: "Error_InvalidPassword",
                  },
                },
              },
            },
          },
        },
        403: {
          description:
            "User is already logged in or email verification is required.",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/AuthError" },
              examples: {
                alreadyLoggedIn: {
                  value: {
                    message: "You are already logged in.",
                    error: "Error_AlreadyExists",
                  },
                },
                notVerified: {
                  value: {
                    message:
                      "This user is not verified. Please verify your email first.",
                    error: "Error_UserNotVerified",
                  },
                },
              },
            },
          },
        },
        404: {
          description: "No user exists with the supplied email address.",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/AuthError" },
              example: {
                message: "This user does not exist.",
                error: "Error_UserNotFound",
              },
            },
          },
        },
      },
    },
  },
};
