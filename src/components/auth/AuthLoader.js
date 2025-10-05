import { redirect } from "react-router-dom";
import { isLoggedIn } from "../../api/service";

export default async function CheckAuthStatus(queryClient) {
  try {
    let isAuthenticated = await isLoggedIn();

    queryClient.setQueryData("[isAuthenticated]", isAuthenticated.status);
  } catch (error) {
    queryClient.setQueryData(
      "[isAuthenticated]",
      error?.response?.data?.status
    );
    throw redirect("/login");
  }

  return null;
}
