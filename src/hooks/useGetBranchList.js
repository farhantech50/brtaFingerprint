import { useAuthContext } from "../contexts/authContext";
import useApi from "./useApi";

const useGetBranchList = () => {
  const api = useApi();
  const { authUser } = useAuthContext(); // Access authenticated user data

  const fetchBranches = async (branchId = null) => {
    try {
      const url = branchId
        ? `http://192.168.78.70:5001/brtafp/super-admin/brta-branch/${branchId}`
        : `http://192.168.78.70:5001/brtafp/super-admin/brta-branch`;

      const response = await api.get(url);
      return response.data;
    } catch (err) {
      console.error("Error fetching branches:", err);
      return null;
    }
  };

  return { fetchBranches };
};
export default useGetBranchList;
