import { useContext } from "react";
import AdminAuthContext from "../context/adminAuthStore";

export default function useAdminAuth() {
  return useContext(AdminAuthContext);
}
