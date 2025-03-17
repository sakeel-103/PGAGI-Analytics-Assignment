export const handleApiError = (error: any): string => {
  return error.message || "An error occurred while fetching data.";
};
