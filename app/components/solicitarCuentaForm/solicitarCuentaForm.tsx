import { Form, Link, useNavigate } from "react-router";
import type { responsePayload } from "~/types/payloads";
import type { AccountRequest } from "~/types/models";
import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { format } from "rut.js";
import { GetRequestConfig, METHODS } from "~/constants/requestsConfig";
import MessageBox from "../messageBox/messageBox";
import { ENDPOINTS } from "~/constants/endpoints";

export default function SolicitarCuentaForm() {
    const rutRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const [newID, setNewID] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const sendRequest = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        if(!rutRef.current?.value || !emailRef.current?.value) {
            setLoading(false);
            navigate("/solicitar-cuenta/error/Datos no válidos");
            return;
        }
        const requestBody = {
            rut: rutRef.current!.value,
            email: emailRef.current!.value
        }
        const response = await fetch(ENDPOINTS.accountRequestsEndpoint, GetRequestConfig(METHODS.POST, "JSON", JSON.stringify(requestBody)));
        const decodedResponse: responsePayload<AccountRequest> = await response.json();
        if(decodedResponse.error || decodedResponse.statusCode >= 300) {
            setLoading(false);
            navigate(`/solicitar-cuenta/error/${decodedResponse.error || decodedResponse.message}`);
            return;
        }
        setNewID(decodedResponse.data!.ID);
        setLoading(false);
    }
    const onRutChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value === "") {
          e.target.value = "";
          return;
        }
        e.target.value = format(e.target.value, {dots: true});
      }
    return (
        <Form
            method="post"
            className="w-full max-w-xl rounded-2xl bg-white/10 p-8 shadow-xl backdrop-blur"
            onSubmit={sendRequest}
        >
            <div className="flex flex-col gap-6">
                <label className="flex flex-col gap-2 text-left">
                    <span className="text-sm font-medium uppercase tracking-wide text-yellow-300">
                        Rut
                    </span>
                    <input
                        ref={rutRef}
                        onChange={onRutChange}
                        type="text"
                        name="rut"
                        required
                        placeholder="12.345.678-9"
                        className="h-12 rounded-lg border border-blue-400/60 bg-blue-900/40 px-4 text-white placeholder:text-blue-200 focus:border-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-300/70"
                    />
                </label>

                <label className="flex flex-col gap-2 text-left">
                    <span className="text-sm font-medium uppercase tracking-wide text-yellow-300">
                        Correo electrónico
                    </span>
                    <input
                        ref={emailRef}
                        type="email"
                        name="email"
                        required
                        placeholder="tu.nombre@jcasecurity.cl"
                        className="h-12 rounded-lg border border-blue-400/60 bg-blue-900/40 px-4 text-white placeholder:text-blue-200 focus:border-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-300/70"
                    />
                </label>

                <div className="flex flex-col gap-3 pt-2 md:flex-row md:justify-between">
                    <button
                        type="submit"
                        className="flex-1 rounded-lg bg-yellow-400 px-6 py-3 text-center text-sm font-semibold uppercase tracking-wide text-blue-900 transition hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-200 focus:ring-offset-2 focus:ring-offset-blue-900"
                        
                    >
                        Enviar solicitud
                    </button>
                    <Link
                        to="/"
                        className="flex-1 rounded-lg border border-yellow-400 px-6 py-3 text-center text-sm font-semibold uppercase tracking-wide text-yellow-300 transition hover:bg-yellow-400/10 focus:outline-none focus:ring-2 focus:ring-yellow-200 focus:ring-offset-2 focus:ring-offset-blue-900"
                        hidden={loading}
                    >
                        Volver al inicio
                    </Link>
                </div>
                {
                    newID ? <div className="flex w-full justify-center"> <MessageBox message={`Solicitud creada\nID de solicitud: ${newID}`} error={false} /> </div> : null
                }
            </div>
        </Form>
    );
}