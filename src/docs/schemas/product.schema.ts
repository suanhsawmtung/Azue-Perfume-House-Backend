import { Concentration, Gender } from "@prisma/client";

const genderEnum = Object.values(Gender);
const concentrationEnum = Object.values(Concentration);

export const productSchemas = {
  ProductCard: {
    type: "object",
    required: [
      "id",
      "name",
      "slug",
      "rating",
      "ratingCount",
      "gender",
      "concentration",
      "isLimited",
      "brand",
      "image",
      "primaryVariant",
    ],
    properties: {
      id: { type: "integer", example: 1 },
      name: { type: "string", example: "Lost Cherry" },
      slug: { type: "string", example: "lost-cherry" },
      rating: { type: "number", nullable: true, example: 4.8 },
      ratingCount: { type: "integer", example: 125 },
      gender: { type: "string", enum: genderEnum, example: "UNISEX" },
      concentration: {
        type: "string",
        enum: concentrationEnum,
        example: "EDP",
      },
      isLimited: { type: "boolean", example: false },
      brand: {
        type: "object",
        required: ["name", "slug"],
        properties: {
          name: { type: "string", example: "Versace" },
          slug: { type: "string", example: "versace" },
        },
      },
      image: {
        type: "string",
        nullable: true,
        example: "/uploads/products/lost-cherry.jpg",
      },
      primaryVariant: {
        type: "object",
        required: ["price", "discount", "stock", "reserved"],
        properties: {
          price: { type: "number", example: 250000 },
          discount: { type: "number", example: 10 },
          stock: { type: "integer", example: 15 },
          reserved: { type: "integer", example: 2 },
        },
      },
    },
  },

  ProductListResponse: {
    type: "object",
    required: ["success", "data", "message"],
    properties: {
      success: { type: "boolean", example: true },
      data: {
        type: "object",
        required: ["items", "currentPage", "totalPages", "pageSize"],
        properties: {
          items: {
            type: "array",
            items: {
              $ref: "#/components/schemas/ProductCard",
            },
          },

          currentPage: {
            type: "integer",
            example: 1,
          },

          totalPages: {
            type: "integer",
            example: 5,
          },

          pageSize: {
            type: "integer",
            example: 8,
          },
        },
      },

      message: { type: "string", nullable: true, example: null },
    },
  },

  ProductDetail: {
    type: "object",
    required: [
      "id",
      "name",
      "slug",
      "description",
      "gender",
      "concentration",
      "isLimited",
      "rating",
      "ratingCount",
      "releasedYear",
      "brand",
      "hasReviewed",
      "isWishlist",
      "canReview",
      "variants",
      "selectedVariant",
    ],
    properties: {
      id: {
        type: "integer",
        example: 1,
      },

      name: {
        type: "string",
        example: "Le Male",
      },

      slug: {
        type: "string",
        example: "le-male",
      },

      description: {
        type: "string",
        example: "An iconic men's fragrance by Jean Paul Gaultier.",
      },

      gender: { type: "string", enum: genderEnum, example: "MALE" },
      concentration: {
        type: "string",
        enum: concentrationEnum,
        example: "EDT",
      },

      isLimited: {
        type: "boolean",
        example: false,
      },

      rating: {
        type: "number",
        nullable: true,
        example: 4.7,
      },

      ratingCount: {
        type: "integer",
        example: 85,
      },

      releasedYear: {
        type: "integer",
        nullable: true,
        example: 1995,
      },

      brand: {
        type: "string",
        example: "Jean Paul Gaultier",
      },

      hasReviewed: {
        type: "boolean",
        example: false,
      },

      isWishlist: {
        type: "boolean",
        example: false,
      },

      canReview: {
        type: "boolean",
        example: false,
      },

      variants: {
        type: "array",

        items: {
          $ref: "#/components/schemas/ProductVariant",
        },
      },

      selectedVariant: {
        $ref: "#/components/schemas/ProductVariantDetail",
      },
    },
  },

  ProductVariant: {
    type: "object",
    required: ["id", "size", "slug", "stock", "reserved"],
    properties: {
      id: {
        type: "integer",
        example: 10,
      },

      size: {
        type: "number",
        example: 75,
      },

      slug: {
        type: "string",
        example: "le-male-75",
      },

      stock: {
        type: "integer",
        example: 12,
      },

      reserved: {
        type: "integer",
        example: 2,
      },
    },
  },

  ProductVariantDetail: {
    type: "object",
    required: [
      "id",
      "slug",
      "size",
      "price",
      "discount",
      "stock",
      "reserved",
      "isPrimary",
      "sku",
      "images",
    ],
    properties: {
      id: {
        type: "integer",
        example: 10,
      },

      slug: {
        type: "string",
        example: "le-male-75",
      },

      size: {
        type: "number",
        example: 75,
      },

      price: {
        type: "number",
        example: 180000,
      },

      discount: {
        type: "number",
        example: 10,
      },

      stock: {
        type: "integer",
        example: 12,
      },

      reserved: {
        type: "integer",
        example: 2,
      },

      isPrimary: {
        type: "boolean",
        example: true,
      },

      sku: {
        type: "string",
        example: "JPG-LEMALE-75",
      },

      images: {
        type: "array",
        items: {
          type: "object",
          required: ["path", "isPrimary", "order"],

          properties: {
            path: {
              type: "string",
              example: "/uploads/products/le-male-75.jpg",
            },

            isPrimary: {
              type: "boolean",
              example: true,
            },

            order: {
              type: "integer",
              example: 0,
            },
          },
        },
      },
    },
  },

  ProductDetailResponse: {
    type: "object",
    required: ["success", "data", "message"],
    properties: {
      success: { type: "boolean", example: true },
      data: {
        $ref: "#/components/schemas/ProductDetail",
      },
      message: { type: "string", nullable: true, example: null },
    },
  },
};
