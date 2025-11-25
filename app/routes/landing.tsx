import type { Route } from "./+types/landing";

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "React App Template" },
		{
			name: "description",
			content:
				"A modern React application template built with React Router, TypeScript, and Tailwind CSS.",
		},
	];
}

export default function LandingPage() {
	return (
		<div className="flex flex-col min-h-screen">
			<main className="flex-1">asdasd</main>
		</div>
	);
}
