import SolicitarCuentaForm from "../components/solicitarCuentaForm/solicitarCuentaForm";

export function meta() {
    return [
        { title: "Solicita tu cuenta" },
        {
            name: "description",
            content: "Completa el formulario para solicitar acceso a la intranet de JCA Security.",
        },
    ];
}

export default function SolicitarCuenta() {
    return (
        <main className="min-h-screen bg-gradient-to-b from-blue-900 via-blue-800 to-blue-700 text-white">
            <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-8 px-6 pb-12 pt-20">
                <section className="flex flex-col items-center gap-4 text-center">
                    <img
                        src="https://jcasecurity.cl/assets/images/escudo.webp"
                        alt="JCA Security"
                        className="h-24 w-24 border-yellow-400"
                    />
                    <h1 className="text-3xl font-semibold tracking-wide">Solicita acceso a la intranet</h1>
                    <p className="max-w-2xl text-balance text-sm text-blue-100 md:text-base">
                        Valida tus datos para que el equipo de operaciones autorice tu ingreso y puedas
                        ver tu contrato, solicitar liquidaciones y ver tu equipo de guardias.
                    </p>
                </section>

                <SolicitarCuentaForm />

                <footer className="text-center text-xs text-blue-100/80">
                    ¿Necesitas ayuda adicional? Escribe a reclutamiento@jcasecurity.cl
                </footer>
            </div>
        </main>
    );
}