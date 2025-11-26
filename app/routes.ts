import { type RouteConfig, index, layout, prefix, route } from "@react-router/dev/routes";

export default [
	index("routes/login-page.tsx"),
	route("/pos", "routes/page.tsx"),
	route("/parent-dashboard", "routes/edutap-user.tsx"),


] satisfies RouteConfig;
