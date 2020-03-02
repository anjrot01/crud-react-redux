import {
  AGREGAR_PRODUCTO,
  AGREGAR_PRODUCTO_EXITO,
  AGREGAR_PRODUCTO_ERROR,
  COMENZAR_DESCARGA_PRODUCTOS,
  DESCRAGA_PRODUCTOS_EXITO,
  DESCRAGA_PRODUCTOS_ERROR,
  OBTENER_PRODUCTO_ELIMINAR,
  PRODUCTO_ELIMINADO_EXITO,
  PRODUCTO_ELIMINADO_ERROR,
  OBTENER_PRODUCTO_EDITAR,
  COMENZAR_EDICION_PRODUCTO,
  PRODUCTO_EDITADO_EXITO,
  PRODUCTO_EDITADO_ERROR
} from "../types";
import clienteAxios from "../config/axios";
import Swal from "sweetalert2";

// Crear nuevos productos

export function crearNuevoProductoAction(producto) {
  return async dispatch => {
    dispatch(agreagarProducto(true));

    try {
      // insertar en la api el producto

      await clienteAxios.post("/productos", producto);
      dispatch(agregarProductoExito(producto));

      //Alerta
      Swal.fire("correcto", "El producto se agregó correctamente", "success");
    } catch (error) {
      console.log(error);

      dispatch(agreagarProductoError(true));

      //Alerta de error
      Swal.fire({
        icon: "error",
        title: "Hubo un error",
        text: "Hubo un error intenta de Nuevo"
      });
    }
  };
}

const agreagarProducto = state => ({
  type: AGREGAR_PRODUCTO,
  payload: state
});

// Si el producto se guarda con exito en la bd

const agregarProductoExito = producto => ({
  type: AGREGAR_PRODUCTO_EXITO,
  payload: producto
});

// Si hubo un error
const agreagarProductoError = estado => ({
  type: AGREGAR_PRODUCTO_ERROR,
  payload: estado
});

// Funcion para la descarga de productos desde la bd
export function obtenerProductosAction() {
  return async dispatch => {
    dispatch(descargaProductos());

    try {
      const respuesta = await clienteAxios.get("/productos");

      dispatch(descargaProductosExitosa(respuesta.data));
    } catch (error) {
      console.log(error);

      dispatch(descargaProductosError());
    }
  };
}

const descargaProductos = () => ({
  type: COMENZAR_DESCARGA_PRODUCTOS,
  payload: true
});

const descargaProductosExitosa = productos => ({
  type: DESCRAGA_PRODUCTOS_EXITO,
  payload: productos
});

const descargaProductosError = () => ({
  type: DESCRAGA_PRODUCTOS_ERROR,
  payload: true
});

// Selecciona y elimina el producto
export function borrarProductoAction(id) {
  return async dispatch => {
    dispatch(obtenerProductosEliminar(id));

    try {
      await clienteAxios.delete(`/productos/${id}`);

      dispatch(eliminarProductoExito());

      Swal.fire("Borrado!", "El producto ha sido borrado.", "success");
    } catch (error) {
      console.log(error);
      dispatch(eliminarProductoError());
    }
  };
}

const obtenerProductosEliminar = id => ({
  type: OBTENER_PRODUCTO_ELIMINAR,
  payload: id
});

const eliminarProductoExito = () => ({
  type: PRODUCTO_ELIMINADO_EXITO
});

const eliminarProductoError = () => ({
  type: PRODUCTO_ELIMINADO_ERROR,
  payload: true
});

// Colocar producto en edición
export function obtenerProductosEditar(producto) {
  return dispatch => {
    dispatch(obtenerProductoAction(producto));
  };
}

const obtenerProductoAction = producto => ({
  type: OBTENER_PRODUCTO_EDITAR,
  payload: producto
});

// Edita un registro en la api y state
export function editarProductoAction(producto) {
  return async dispatch => {
    dispatch(editarProducto());
    try {
      await clienteAxios.put(`/productos/${producto.id}`, producto);
      dispatch(editarProductoExito(producto));
    } catch (error) {
      console.log(error);
      dispatch(editarProductoError());
    }
  };
}

const editarProducto = () => ({
  type: COMENZAR_EDICION_PRODUCTO
});

const editarProductoExito = producto => ({
  type: PRODUCTO_EDITADO_EXITO,
  payload: producto
});

const editarProductoError = () => ({
  type: PRODUCTO_EDITADO_ERROR,
  payload: true
});
