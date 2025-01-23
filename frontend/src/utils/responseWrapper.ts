export const successResponse = (data: unknown) => {
  return {
    success: true,
    message: null,
    data,
  };
};

export const errorResponse = (message: string) => {
  return {
    success: false,
    message,
    data: null,
  };
};
