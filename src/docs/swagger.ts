import swaggerJSDoc from "swagger-jsdoc";
import { env } from "../config/env";
import { authPaths } from "./paths/auth.paths";
import { postPaths } from "./paths/post.paths";
import { productPaths } from "./paths/product.paths";
import { authSchemas } from "./schemas/auth.schema";
import { postSchemas } from "./schemas/post.schema";
import { productSchemas } from "./schemas/product.schema";

const swaggerOptions: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.3",

    info: {
      title: "Azue Perfume House API",
      version: "1.0.0",
      description: "API documentation for Azue Perfume House",
    },

    servers: [
      {
        url: `${env.serverUrl}/api`,
        description: "Development server",
      },
    ],

    paths: {
      ...authPaths,
      ...productPaths,
      ...postPaths,
      // ...userPaths,
    },

    components: {
      schemas: {
        ...authSchemas,
        ...productSchemas,
        ...postSchemas,
      },
      securitySchemes: {
        cookieAuth: {
          type: "apiKey",
          in: "cookie",
          name: "accessToken",
        },
      },
    },
  },
  apis: [],
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);
