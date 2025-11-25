import { Outlet } from "react-router";

const AuthLayout = () => {
	return (
		<main className="max-w-md mx-auto min-h-screen bg-secondary">
			<p>This is AuthLayout</p>
			<Outlet />
		</main>
	);
};

export default AuthLayout;
