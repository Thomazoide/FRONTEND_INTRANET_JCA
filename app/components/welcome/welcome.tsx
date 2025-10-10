import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { Link } from "react-router";
import { format } from "rut.js"
import { ENDPOINTS } from "~/constants/endpoints";
import { LOGO_ESCUDO } from "~/constants/imgReferences";
import { GetRequestConfig, METHODS } from "~/constants/requestsConfig";
import type { loginSuccessPayload } from "~/types/payloads";

export function Welcome() {
  const rut = useRef<HTMLInputElement>(null)
  const password = useRef<HTMLInputElement>(null)
  const [errorMessage, setErrorMessage] = useState<string>();

  const onRutChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      e.target.value = ""
      return
    }
    e.target.value = format(e.target.value, {dots: true})
  }

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const loginPayload = {
      rut: rut.current?.value,
      password: password.current?.value
    };
    try{
      const rawResponse = await fetch(ENDPOINTS.loginEndpoint, GetRequestConfig(METHODS.POST, "JSON", JSON.stringify(loginPayload)));
      const decodedResponse: loginSuccessPayload = await rawResponse.json();
      //CREAR CONTEXTO PARA GUARDAR DATOS DEL USUARIO LOGEADO Y TOKEN DE ACCESO...
    } catch(err) {
      setErrorMessage((err as Error).message);
      return
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-900 via-blue-800 to-blue-700 text-white">
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-8 px-6 pb-12 pt-20">
        <section className="flex flex-col items-center gap-4 text-center">
          <img
            src={LOGO_ESCUDO}
            alt="JCA Security"
            className="h-24 w-24"
          />
          <h1 className="text-3xl font-semibold tracking-wide">Intranet JCA Security</h1>
          <p className="max-w-2xl text-balance text-sm text-blue-100 md:text-base">
            Accede a tu plataforma interna para ver tu contrato, solicitar tus liquidaciones y
            coordinar al equipo de seguridad de forma centralizada.
          </p>
        </section>

        <form className="w-full max-w-xl rounded-2xl bg-white/10 p-8 shadow-xl backdrop-blur" onSubmit={submitHandler} >
          <div className="flex flex-col gap-6">
            <label className="flex flex-col gap-2 text-left">
              <span className="text-sm font-medium uppercase tracking-wide text-yellow-300">
                Rut
              </span>
              <input
                type="text"
                name="rut"
                autoComplete="rut"
                ref={rut}
                onChange={onRutChange}
                placeholder="12.345.678-9"
                className="h-12 rounded-lg border border-blue-400/60 bg-blue-900/40 px-4 text-white placeholder:text-blue-200 focus:border-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-300/70"
              />
            </label>

            <label className="flex flex-col gap-2 text-left">
              <span className="text-sm font-medium uppercase tracking-wide text-yellow-300">
                Contraseña
              </span>
              <input
                type="password"
                name="password"
                autoComplete="current-password"
                ref={password}
                placeholder="Ingresa tu contraseña"
                className="h-12 rounded-lg border border-blue-400/60 bg-blue-900/40 px-4 text-white placeholder:text-blue-200 focus:border-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-300/70"
              />
            </label>

            <div className="flex flex-col gap-3 pt-2 md:flex-row md:justify-between">
              <button
                type="submit"
                className="flex-1 rounded-lg bg-yellow-400 px-6 py-3 text-center text-sm font-semibold uppercase tracking-wide text-blue-900 transition hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-200 focus:ring-offset-2 focus:ring-offset-blue-900"
              >
                Iniciar sesión
              </button>
              <Link
                to="/solicitar-cuenta"
                className="flex-1 rounded-lg border border-yellow-400 px-6 py-3 text-center text-sm font-semibold uppercase tracking-wide text-yellow-300 transition hover:bg-yellow-400/10 focus:outline-none focus:ring-2 focus:ring-yellow-200 focus:ring-offset-2 focus:ring-offset-blue-900"
              >
                Solicitar cuenta
              </Link>
            </div>
          </div>
        </form>

        <footer className="text-center text-xs text-blue-100/80">
          ¿Problemas para iniciar sesión? Contacta a soporte en soporte@jcasecurity.cl
        </footer>
      </div>
    </main>
  );
}