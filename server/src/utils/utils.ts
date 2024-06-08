export const isPath = (value: string) => {
  return typeof value === "string" && value.startsWith("uploads/");
};
