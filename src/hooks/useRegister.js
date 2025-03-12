import useApi from "./useApi";

const useRegister = () => {
  const api = useApi();

  const register = async (employeeId, isActive, branchId, role) => {
    try {
      const res = await api.post(`/user-admin/user-register`, {
        employeeId: employeeId,
        activeStatus: Number(isActive),
        branchId: branchId,
      });
      const data = res.data;

      if (data.error) {
        throw new Error(data.error);
      }

      return {
        success: true,
        message: data,
      };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: "Error registering Employee",
      };
    }
  };

  return { register };
};
export default useRegister;
