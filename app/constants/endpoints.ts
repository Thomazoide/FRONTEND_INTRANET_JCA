export const BACKENDURL = import.meta.env.VITE_BACKENDURL;

export const ENDPOINTS = {
    loginEndpoint: `${BACKENDURL}/login`, // SOLO POST Y PUT
    accountRequestsEndpoint: `${BACKENDURL}/solicitudes`, // SOLO GET, PUT, POST Y DELETE
    liquidationRequestsEndpoint: `${BACKENDURL}/solicitudes/liquidaciones`, // SOLO GET Y POST
    liquidationRequestsWithParamsEndpoint: (id: number) => `${BACKENDURL}/solicitudes/liquidaciones/${id}`, // SOLO GET Y PUT
    contractsEndpoint: (id: number) => `${BACKENDURL}/documentos/${id}/contrato`, // SOLO POST
    liquidationsEndpoint: (id: number) => `${BACKENDURL}/documentos/${id}/liquidaciones`, // SOLO GET Y POST
    usersEndpoint: `${BACKENDURL}/usuarios`, // SOLO GET, PUT Y POST
    usersWithParamsEndpoint: (id: number) => `${BACKENDURL}/usuarios/${id}` // SOLO GET Y DELETE
}