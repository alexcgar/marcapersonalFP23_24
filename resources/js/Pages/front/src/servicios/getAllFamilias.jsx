import { apiUrl } from "../settings";

export function getAllFamilias () {

    // Usamos fetch para recuperar los post de la REST API. Puesto que hacemos
    // una petición al servidor y esta puede tardar un tiempo en resolverse usaremos
    // una promesa, la respuesta de la REST API es los que devolvemos
    return fetch(apiUrl + "/familias_profesionales")
    .then(response => response.json())
    .then(response => {
        const data = response;
        return (data)})
    .catch(err => {
        console.log("sin datos");
    });
}
