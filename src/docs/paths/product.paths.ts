import { Concentration, Gender } from "@prisma/client";

const genderEnum = Object.values(Gender);
const concentrationEnum = Object.values(Concentration);

export const productPaths = {
  "/v1/products": {
    get: {
      tags: ["Products"],

      summary: "Get products",

      description:
        "Get a paginated list of products with optional search and filters.",

      parameters: [
        {
          name: "limit",
          in: "query",
          required: false,

          description:
            "Number of products to return. Defaults to 10 and has a maximum of 50.",

          schema: {
            type: "integer",
            minimum: 1,
            maximum: 50,
            default: 10,
          },

          example: 8,
        },

        {
          name: "offset",
          in: "query",
          required: false,

          description: "Number of products to skip before returning results.",

          schema: {
            type: "integer",
            minimum: 0,
            default: 0,
          },

          example: 0,
        },

        {
          name: "search",
          in: "query",
          required: false,

          description: "Search products by keyword.",

          schema: {
            type: "string",
          },

          example: "hello",
        },

        {
          name: "brandSlug",
          in: "query",
          required: false,

          description: "Filter products by brand slug.",

          schema: {
            type: "string",
          },

          example: "versace",
        },

        {
          name: "gender",
          in: "query",
          required: false,

          description: "Filter products by gender.",

          schema: {
            type: "string",
            enum: genderEnum,
          },

          example: "MALE",
        },

        {
          name: "concentration",
          in: "query",
          required: false,

          description: "Filter products by fragrance concentration.",

          schema: {
            type: "string",
            enum: concentrationEnum,
          },

          example: "EDC",
        },

        {
          name: "isLimited",
          in: "query",
          required: false,

          description: "Filter products by limited-edition status.",

          schema: {
            type: "boolean",
          },

          example: true,
        },

      ],

      responses: {
        200: {
          description: "Products retrieved successfully.",

          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ProductListResponse",
              },
            },
          },
        },

        400: { description: "Invalid query parameters." },
        500: { description: "Internal server error." },
      },
    },
  },

  "/v1/products/{slug}": {
    get: {
      tags: ["Products"],
      summary: "Get product details",

      description:
        "Get detailed information about an active product. Authentication is optional. If a variant is not specified, the primary active variant is selected.",

      parameters: [
        {
          name: "slug",
          in: "path",
          required: true,
          description: "Product slug.",
          schema: {
            type: "string",
          },
          example: "le-male",
        },

        {
          name: "variant",
          in: "query",
          required: false,
          description:
            "Variant slug. If omitted, the primary active variant is selected.",
          schema: {
            type: "string",
          },
          example: "le-male-75",
        },
      ],

      responses: {
        200: {
          description: "Product retrieved successfully.",

          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ProductDetailResponse",
              },
            },
          },
        },

        404: {
          description: "Product or product variant not found or unavailable.",
        },
        500: { description: "Internal server error." },
      },
    },
  },
};
