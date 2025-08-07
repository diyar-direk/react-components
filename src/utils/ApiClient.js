import axiosInstance from "./axios";

class APIClient {
  constructor(endPoint) {
    this.endPoint = endPoint;
  }
  getAll = async ({ page = 1, sort, limit = 10, ...params }) => {
    const sortStatus = Object.values(sort)
      .map((v) => v)
      .join(",");

    const { data } = await axiosInstance.get(this.endPoint, {
      params: {
        ...params,
        limit,
        page,
        sort: sortStatus,
      },
    });
    return { data: data.data, totalCount: data.totalCount };
  };
  deleteAll = async ({ ids }) => {
    await axiosInstance.delete(this.endPoint, {
      data: { ids },
    });
  };
}
export default APIClient;
