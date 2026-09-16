import { PostStatus } from "@prisma/client";

const postStatusEnum = Object.values(PostStatus);

const postAuthorSchema = {
  type: "object",
  required: ["id", "firstName", "lastName", "username"],
  properties: {
    id: { type: "integer", example: 1 },
    firstName: { type: "string", nullable: true, example: "Jane" },
    lastName: { type: "string", nullable: true, example: "Doe" },
    username: { type: "string", example: "jane-doe" },
  },
};

const postCategorySchema = {
  type: "object",
  required: ["id", "name", "slug"],
  properties: {
    id: { type: "integer", example: 1 },
    name: { type: "string", example: "Guides" },
    slug: { type: "string", example: "guide" },
  },
};

export const postSchemas = {
  PostAuthor: postAuthorSchema,
  PostCategory: postCategorySchema,

  PostCard: {
    type: "object",
    required: [
      "id",
      "title",
      "slug",
      "image",
      "excerpt",
      "publishedAt",
      "author",
      "category",
    ],
    properties: {
      id: { type: "integer", example: 1 },
      title: {
        type: "string",
        example: "The Art of Layering Fragrances",
      },
      slug: {
        type: "string",
        example: "the-art-of-layering-fragrances-a-complete-guide",
      },
      image: {
        type: "string",
        example: "/uploads/images/post/layering-fragrances.jpg",
      },
      excerpt: {
        type: "string",
        nullable: true,
        example: "Learn how to combine fragrances for a unique signature scent.",
      },
      publishedAt: { type: "string", format: "date-time", nullable: true },
      author: { $ref: "#/components/schemas/PostAuthor" },
      category: { $ref: "#/components/schemas/PostCategory" },
    },
  },

  PostListResponse: {
    type: "object",
    required: ["success", "data", "message"],
    properties: {
      success: { type: "boolean", example: true },
      data: {
        type: "object",
        required: ["items", "currentPage", "totalPages", "pageSize", "total"],
        properties: {
          items: {
            type: "array",
            items: { $ref: "#/components/schemas/PostCard" },
          },
          currentPage: { type: "integer", example: 1 },
          totalPages: { type: "integer", example: 3 },
          pageSize: { type: "integer", example: 4 },
          total: { type: "integer", example: 12 },
        },
      },
      message: { type: "string", nullable: true, example: null },
    },
  },

  PostDetail: {
    type: "object",
    required: [
      "id",
      "title",
      "slug",
      "excerpt",
      "content",
      "image",
      "authorId",
      "categoryId",
      "status",
      "publishedAt",
      "createdAt",
      "updatedAt",
      "deletedAt",
      "author",
      "category",
    ],
    properties: {
      id: { type: "integer", example: 1 },
      title: { type: "string", example: "The Art of Layering Fragrances" },
      slug: {
        type: "string",
        example: "the-art-of-layering-fragrances-a-complete-guide",
      },
      excerpt: { type: "string", nullable: true },
      content: { type: "string", example: "Layering fragrances starts with..." },
      image: {
        type: "string",
        example: "/uploads/images/post/layering-fragrances.jpg",
      },
      authorId: { type: "integer", example: 1 },
      categoryId: { type: "integer", example: 1 },
      status: { type: "string", enum: postStatusEnum, example: "PUBLISHED" },
      publishedAt: { type: "string", format: "date-time", nullable: true },
      createdAt: { type: "string", format: "date-time" },
      updatedAt: { type: "string", format: "date-time" },
      deletedAt: { type: "string", format: "date-time", nullable: true },
      author: {
        type: "object",
        required: ["id", "firstName", "lastName", "username", "email", "phone"],
        properties: {
          ...postAuthorSchema.properties,
          email: { type: "string", format: "email", example: "jane@example.com" },
          phone: { type: "string", nullable: true },
        },
      },
      category: {
        type: "object",
        required: [
          "id",
          "name",
          "slug",
          "createdAt",
          "updatedAt",
          "deletedAt",
        ],
        properties: {
          ...postCategorySchema.properties,
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
          deletedAt: { type: "string", format: "date-time", nullable: true },
        },
      },
    },
  },

  PostDetailResponse: {
    type: "object",
    required: ["success", "data", "message"],
    properties: {
      success: { type: "boolean", example: true },
      data: { $ref: "#/components/schemas/PostDetail" },
      message: { type: "string", nullable: true, example: null },
    },
  },
};
