import type { Route } from "./+types/home";
import { Welcome } from "../components/welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Intranet JCA Security" },
  ];
}

export default function Home() {
  return <Welcome />;
}
