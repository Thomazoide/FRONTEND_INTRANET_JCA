import { useEffect, useMemo, useState, type ReactElement } from "react";
import { ENDPOINTS } from "~/constants/endpoints";
import type { ListaFeriados } from "~/types/payloads";
import type { Feriado } from "~/types/models";

export default function TablaFeriados(): ReactElement {
    const [feriados, setFeriados] = useState<Feriado[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let ignore = false;

        const fetchFeriados = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await fetch(ENDPOINTS.holidays);
                if (!response.ok) {
                    throw new Error("No fue posible obtener los feriados");
                }

                const body: ListaFeriados = await response.json();
                if (body.status !== "success" || !body.data) {
                    throw new Error("La API de feriados no entregó resultados");
                }

                const today = new Date();
                const yearEnd = new Date(today.getFullYear(), 11, 31);

                const upcoming = body.data
                    .filter((feriado) => {
                        const dateValue = new Date(feriado.date);
                        return dateValue >= today && dateValue <= yearEnd;
                    })
                    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

                if (!ignore) {
                    setFeriados(upcoming);
                }
            } catch (err) {
                if (!ignore) {
                    setError(err instanceof Error ? err.message : "Error desconocido");
                    setFeriados([]);
                }
            } finally {
                if (!ignore) {
                    setLoading(false);
                }
            }
        };

        fetchFeriados();

        return () => {
            ignore = true;
        };
    }, []);

    const dateFormatter = useMemo(
        () =>
            new Intl.DateTimeFormat("es-CL", {
                weekday: "long",
                day: "2-digit",
                month: "long",
            }),
        [],
    );

    if (loading) {
        return (
            <section className="rounded-xl bg-white/10 p-6 text-blue-100 shadow">
                <p className="text-center text-sm">Cargando feriados próximos…</p>
            </section>
        );
    }

    if (error) {
        return (
            <section className="rounded-xl bg-red-500/10 p-6 text-red-200 shadow">
                <p className="text-center text-sm">{error}</p>
            </section>
        );
    }

    if (feriados.length === 0) {
        return (
            <section className="rounded-xl bg-white/10 p-6 text-blue-100 shadow">
                <p className="text-center text-sm">No quedan feriados pendientes este año.</p>
            </section>
        );
    }

    return (
        <section className="overflow-hidden rounded-2xl bg-white text-blue-950 shadow-xl">
            <header className="bg-blue-900 px-6 py-4 text-white">
                <h2 className="text-lg font-semibold uppercase tracking-wide">Próximos feriados</h2>
            </header>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-blue-100 text-sm">
                    <thead className="bg-blue-50 text-blue-900">
                        <tr>
                            <th className="px-6 py-3 text-left font-semibold uppercase tracking-wide">Fecha</th>
                            <th className="px-6 py-3 text-left font-semibold uppercase tracking-wide">Título</th>
                            <th className="px-6 py-3 text-left font-semibold uppercase tracking-wide">Irrenunciable</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-blue-100">
                        {feriados.map((feriado) => {
                            const formattedDate = dateFormatter.format(new Date(feriado.date));
                            return (
                                <tr key={feriado.date} className="hover:bg-blue-50/60">
                                    <td className="px-6 py-4 capitalize">{formattedDate}</td>
                                    <td className="px-6 py-4">{feriado.title}</td>
                                    <td className="px-6 py-4 font-semibold">
                                        {feriado.inaleniable ? "Sí" : "No"}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </section>
    );
}