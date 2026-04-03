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
        error.response?.data.error || "something went wrong",
        // "Something went wrong",
      status: error.response?.status,

      //  success: false,
      // message:
      //   error.response?.data?.message ||
      //   error.response?.data?.error ||
      //   "Something went wrong",
      // status: error.response?.status || 500,

    };
  }
};
