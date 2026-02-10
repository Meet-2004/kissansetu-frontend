export const handleApi = async (apiCall) => {
  try {
    const response = await apiCall();

    // 2xx responses
    return {
      success: true,
      data: response.data,
      message: response.data.message || "Success",
    };

  } catch (error) {
    // 4xx / 5xx responses
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "Something went wrong",
      status: error.response?.status,
    };
  }
};
