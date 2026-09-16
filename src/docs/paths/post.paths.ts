export const postPaths = {
  "/v1/posts": {
    get: {
      tags: ["Posts"],
      summary: "Get published blog posts",
      description:
        "Returns a paginated list of published blog posts with optional search and category filters.",
      parameters: [
        {
          name: "limit",
          in: "query",
          description: "Number of posts to return. Defaults to 10 and has a maximum of 50.",
          schema: { type: "integer", minimum: 1, maximum: 50, default: 10 },
          example: 4,
        },
        {
          name: "offset",
          in: "query",
          description: "Number of posts to skip before returning results.",
          schema: { type: "integer", minimum: 0, default: 0 },
          example: 0,
        },
        {
          name: "search",
          in: "query",
          description: "Search in the post title, excerpt, or content.",
          schema: { type: "string" },
          example: "art",
        },
        {
          name: "category",
          in: "query",
          description: "Filter posts by category slug.",
          schema: { type: "string" },
          example: "guide",
        },
      ],
      responses: {
        200: {
          description: "Published posts retrieved successfully.",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/PostListResponse" },
            },
          },
        },
        500: { description: "Internal server error." },
      },
    },
  },

  "/v1/posts/{slug}": {
    get: {
      tags: ["Posts"],
      summary: "Get a blog post by slug",
      description: "Returns the details of a published blog post identified by its slug.",
      parameters: [
        {
          name: "slug",
          in: "path",
          required: true,
          description: "Unique blog post slug.",
          schema: { type: "string" },
          example: "the-art-of-layering-fragrances-a-complete-guide",
        },
      ],
      responses: {
        200: {
          description: "Blog post retrieved successfully.",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/PostDetailResponse" },
            },
          },
        },
        404: { description: "Post not found or unavailable." },
        500: { description: "Internal server error." },
      },
    },
  },
};
