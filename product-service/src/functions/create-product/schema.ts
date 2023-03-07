export default {
  type: "object",
  properties: {
    price: { type: "number" },
    title: { type: "string" },
    description: { type: "string" },
    count: { type: "number" },
  },
  required: ["description", "price", "title", "count"],
} as const;
