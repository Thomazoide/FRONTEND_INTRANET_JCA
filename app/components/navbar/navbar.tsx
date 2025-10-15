import { useMemo, useState } from "react";
import { NavLink } from "react-router";
import { File, Files, Bell, Users, UserCog2, DoorOpen, Home, type LucideProps } from "lucide-react";
import type { CARGO } from "~/types/models";


type NavItem = {
    tipo: number; // 1 = uso gral, todos los cargos tienen acceso | 2 = uso solo RRHH | 3 = uso solo Supervisores
    label: string;
    path: string;
    icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
}

const NAV_ITEMS: NavItem[] = [
  { tipo: 1, label: "Inicio", path: "/" , icon: Home},
  { tipo: 1, label: "Contrato", path: "/contrato", icon: File },
  { tipo: 1, label: "Liquidaciones", path: "/liquidaciones", icon: Files },
  { tipo: 2, label: "Solicitudes", path: "/solicitudes", icon: Bell },
  { tipo: 3, label: "Equipo", path: "/equipo", icon: Users },
  { tipo: 1, label: "Mi cuenta", path: "/mi-cuenta", icon: UserCog2 },
  { tipo: 1, label: "Cerrar sesión", path: "/logout", icon: DoorOpen },
];

export default function NavBar(props: {cargo: CARGO}) {
    const [collapsed, setCollapsed] = useState<boolean>(false);
    const toggleLabel = useMemo(
        () => (collapsed ? "Expandir menú" : "Contraer Menú"),
        [collapsed]
    );
    return (
        <aside
        className={`flex h-screen flex-col bg-yellow-400 text-blue-900 shadow-xl transition-[width] duration-300 ${collapsed ? "w-20" : "w-64"}`}
        >
            <button
            type="button"
            onClick={() => setCollapsed(!collapsed)}
            aria-label={toggleLabel}
            className="flex items-center justify-center gap-2 border-b border-yellow-500/60 px-4 py-5 text-sm font-semibold uppercase tracking-wide hover:bg-yellow-300/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-900/60"
            >
                <span className="inline-block rounded bg-blue-900 px-2 py-1 text-xs font-semibold uppercase text-yellow-200">JCA</span>
                {!collapsed && <span>{toggleLabel}</span>}
            </button>
            <nav className="flex flex-1 flex-col gap-2 overflow-hidden px-3 py-4">
                {NAV_ITEMS.map( (item) => (
                    <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.path === "/"}
                    className={({isActive}) => [
                        "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition",
                        isActive ?
                        "bg-blue-900 text-yellow-200 shadow-inner"
                        :
                        "hover:bg-blue-900/10 focus-visible:outline-2 focus-visible:outline-blue-900/60"
                    ].join(" ")}
                    >
                        <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-900/20 text-base font-semibold ${collapsed ? "" : "bg-blue-900/10"}`}>
                            <item.icon/>
                        </span>
                        {!collapsed && (
                        <span className="truncate uppercase tracking-wide">
                            {item.label}
                        </span>
                        )}
                    </NavLink>
                ) )}
            </nav>
            <footer className="border-t border-yellow-500/60 px-4 py-4 text-xs uppercase tracking-wide text-blue-900/70">
                {!collapsed ? "© JCA Security" : "©"}
            </footer>
        </aside>
    )
}