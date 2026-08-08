const API_BASE = "http://localhost:8080/api/caracteristica";

export const getCaracteristicas = async () => {

    const response = await fetch(API_BASE);

    if (!response.ok) {
        throw new Error("No se pudieron obtener las características.");
    }

    return await response.json();

};

export const obtenerCaracteristicaPorId = async (id) => {

    const response = await fetch(
        `${API_BASE}/${id}`
    );

    if (!response.ok) {
        throw new Error("No se pudo obtener la característica.");
    }

    return await response.json();

};

export const postCaracteristica = async (caracteristica) => {

    const response = await fetch(API_BASE, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(caracteristica)
    });

    if (!response.ok) {
        throw new Error("No se pudo crear la característica.");
    }

    return await response.json();

};

export const putCaracteristica = async (id, caracteristica) => {

    const response = await fetch(`${API_BASE}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(caracteristica)
    });

    if (!response.ok) {
        throw new Error("No se pudo actualizar la característica.");
    }

    return await response.json();

};

export const deleteCaracteristica = async (id) => {

    const response = await fetch(`${API_BASE}/${id}`, {
        method: "DELETE"
    });

    if (!response.ok) {
        throw new Error("No se pudo eliminar la característica.");
    }

    return await response.text();

};