import useApi from "./useApi";

const useGetEmployeeList = () => {
  const api = useApi();

  const fetchEmployeeList = async (branchId) => {
    try {
      const response = await api.get(
        `http://192.168.78.70:5001/brtafp/user-admin/employee-list`,
        {
          params: {
            branchId: branchId,
          },
        }
      );
      return response.data;
    } catch (err) {
      console.error("Error fetching employees:", err);
      return null;
    }
  };

  return { fetchEmployeeList };
};
export default useGetEmployeeList;
