import axiosInstance from "./axios";

class APIClient {
  constructor(endPoint) {
    this.endPoint = endPoint;
  }
  getAll = async ({ page = 1, sort, limit = 10, filters, ...params }) => {
    const sortStatus = Object.values(sort)
      .map((v) => v)
      .join(" , ");

    const paramFilters = new URLSearchParams();

    Object.entries({ ...filters, ...params, sortStatus, page, limit }).map(
      ([key, value]) => {
        if (key !== "from" && key !== "to")
          value && paramFilters.append(key, value);
        else {
          if (key === "from" && value)
            paramFilters.append("createdAt[gte]", value);
          if (key === "to" && value)
            paramFilters.append("createdAt[lte]", value);
        }
      }
    );

    const { data } = await axiosInstance.get(this.endPoint, {
      params: paramFilters,
    });
    return { data: data.data, totalCount: data.totalCount };
  };
  deleteAll = async ({ ids }) => {
    await axiosInstance.delete(this.endPoint, {
      data: { ids },
    });
  };
  addData = async ({ data }) => {
    const res = await axiosInstance.post(this.endPoint, data);
    return res.data;
  };
}
export default APIClient;
