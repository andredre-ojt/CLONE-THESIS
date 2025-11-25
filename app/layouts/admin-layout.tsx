import { Outlet } from "react-router";

export default function AdminLayout() {
	return (
		<main className="bg-secondary">
			<p>This is AdminLayout</p>
			<Outlet />
		</main>
	);
}
