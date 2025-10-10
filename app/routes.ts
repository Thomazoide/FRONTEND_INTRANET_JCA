import { type RouteConfig, index } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    {
        path: "/solicitar-cuenta",
        file: "routes/solicitar-cuenta.tsx"
    },
    {
        path: "/solicitar-cuenta/error/:mensaje",
        file: "routes/solicitar-cuenta.error.tsx"
    }
] satisfies RouteConfig;
