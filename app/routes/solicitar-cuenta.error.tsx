import { Link, useParams } from "react-router";

export default function SolicitarCuentaError() {
    const { mensaje } = useParams();
    return (
        <main className="min-h-screen bg-gradient-to-b from-blue-900 via-blue-800 to-blue-700 text-white flex flex-col items-center justify-center gap-4">
            <div className="flex flex-col items-center w-fit rounded-2xl bg-white/10 p-8 shadow-xl backdrop-blur" >
                <h1 className="text-2xl font-semibold">Hubo un problema</h1>
                <p className="text-center max-w-md text-red-700">{decodeURIComponent(mensaje!)}</p>
                <Link to="/solicitar-cuenta" className="underline text-yellow-300">
                    Volver al formulario
                </Link>
            </div>
        </main>
    )
}