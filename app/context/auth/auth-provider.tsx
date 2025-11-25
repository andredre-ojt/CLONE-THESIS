import { useState, useEffect, type ReactNode } from "react";
import AuthContext, { type User, type AuthContextType } from "./auth-context";
import authService from "~/services/auth-service";
import userService from "~/services/user-service";
import { queryClient } from "~/lib/query-client";

interface AuthProviderProps {
	children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
	const [user, setUser] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const isAuthenticated = !!user;

	// Clear error function
	const clearError = () => setError(null);

	// Get current user from API
	const getCurrentUser = async () => {
		try {
			setIsLoading(true);
			setError(null);
			const response = await userService.getCurrentUser();

			// API client now automatically extracts .data, so response.data is the user object
			setUser(response as any as User);
		} catch (error: any) {
			console.error("Error fetching current user:", error);
			setUser(null);
			// Don't set error here as it might be due to no auth token
		} finally {
			setIsLoading(false);
		}
	};

	// Login function
	const login = async (email: string, password: string) => {
		try {
			setIsLoading(true);
			setError(null);

			const response = await authService.login({ email, password });

			// API client now automatically extracts .data, so response.data is the user object
			const userData = response as any as User;
			setUser(userData);

			// Return user data so components can handle navigation
			return userData;
		} catch (error: any) {
			console.error("Login error:", error);
			setError(error.message || "Login failed. Please try again.");
			throw error; // Re-throw so the login form can handle it
		} finally {
			setIsLoading(false);
		}
	};

	// Logout function
	const logout = async () => {
		try {
			setIsLoading(true);
			setError(null);

			// Call the logout API
			await authService.logout();

			// Clear user state
			setUser(null);

			// Invalidate all queries to clear cached data
			await queryClient.invalidateQueries();

			// Clear all cached data
			queryClient.clear();

			// Components can handle navigation after logout
		} catch (error: any) {
			console.error("Logout error:", error);
			setError(error.message || "Logout failed");
			// Still clear user state even if API call fails
			setUser(null);
			// Still clear queries even if API call fails
			await queryClient.invalidateQueries();
			queryClient.clear();
		} finally {
			setIsLoading(false);
		}
	};

	// Check for existing authentication on mount
	useEffect(() => {
		getCurrentUser();
	}, []);

	// Effect to apply branding colors
	useEffect(() => {
		const applyBranding = (colors: any) => {
			const root = document.documentElement;
			if (root && colors) {
				for (const [key, value] of Object.entries(colors)) {
					if (value && typeof value === "string") {
						root.style.setProperty(`--${key}`, value);
					}
				}
			}
		};

		const clearBranding = () => {
			const root = document.documentElement;
			if (root) {
				// Reset to default values
				root.style.removeProperty("--primary");
				root.style.removeProperty("--secondary");
				root.style.removeProperty("--accent");
				root.style.removeProperty("--success");
				root.style.removeProperty("--warning");
				root.style.removeProperty("--danger");
				root.style.removeProperty("--info");
				root.style.removeProperty("--light");
				root.style.removeProperty("--dark");
				root.style.removeProperty("--neutral");
			}
		};

		if (
			user &&
			user.organization &&
			user.organization.branding &&
			user.organization.branding.colors
		) {
			applyBranding(user.organization.branding.colors);
		} else {
			// Clear branding when user is logged out or has no organization
			clearBranding();
		}
	}, [user]);

	const contextValue: AuthContextType = {
		user,
		isLoading,
		isAuthenticated,
		error,
		login,
		logout,
		getCurrentUser,
		clearError,
	};

	return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
