import { apiClient } from "~/lib/api-client";
import { API_ENDPOINTS } from "~/configs/endpoint";

const { AUTH } = API_ENDPOINTS;

class AuthService {
	login = async (body: any) => {
		try {
			const response = await apiClient.post(AUTH.LOGIN, body);
			return response.data;
		} catch (error: any) {
			console.error("Error logging in:", error);
			throw new Error(
				error.data?.errors?.[0]?.message || error.message || "Error logging in",
			);
		}
	};

	logout = async () => {
		try {
			const response = await apiClient.post(AUTH.LOGOUT);
			return response.data;
		} catch (error: any) {
			console.error("Error logging out:", error);
			throw new Error(
				error.data?.errors?.[0]?.message || error.message || "Error logging out",
			);
		}
	};
}

const authService = new AuthService();

export default authService;
