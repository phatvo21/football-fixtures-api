export const defaultColumns = [
  {
    name: "id",
    type: "varchar",
    generationStrategy: "uuid" as  "uuid" | "increment" | "rowid" | "identity",
    isGenerated: true,
    isPrimary: true,
  },
  {
    name: "createdAt",
    type: "timestamp",
    default: "now()",
  },
  {
    name: "updatedAt",
    type: "timestamp",
    default: "now()",
  },
];