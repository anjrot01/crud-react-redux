import { MOSTRAR_ALERTA, OCULTAR_ALERTA } from "../types";

// Muestra Alerta

export const mostrarAlerta = alerta => {
  return dispatch => {
    dispatch(crearAlerta(alerta));
  };
};

const crearAlerta = alerta => ({
  type: MOSTRAR_ALERTA,
  payload: alerta
});

// Ocultar alerta

export const oculatarAlertaAction = () => {
  return dispatch => {
    dispatch(ocultarAlerta());
  };
};

const ocultarAlerta = () => ({
  type: OCULTAR_ALERTA
});
