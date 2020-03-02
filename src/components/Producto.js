import React from "react";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";

//Redux
import { useDispatch } from "react-redux";
import {
  borrarProductoAction,
  obtenerProductosEditar
} from "../actions/productoActions";

const Producto = ({ producto }) => {
  const { nombre, precio, id } = producto;

  const dispatch = useDispatch();
  const history = useHistory(); // Habilitar history para redirección

  //Confirmar eliminar

  const confirmareliminarProducto = id => {
    // preguntar al usuario

    Swal.fire({
      title: "¿Estás seguro?",
      text: "Un producto eliminado no podrá recuperarse",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Borrar!",
      cancelButtonText: "Cancelar"
    }).then(result => {
      if (result.value) {
        // pasarlo al action

        dispatch(borrarProductoAction(id));
      }
    });
  };

  // Redirigir con useHistory
  const redireccionarEdicion = producto => {
    dispatch(obtenerProductosEditar(producto));
    history.push(`/productos/editar/${producto.id}`);
  };

  return (
    <tr>
      <td>{nombre}</td>
      <td>
        <span className="font-weight-bold">$ {precio}</span>
      </td>
      <td className="acciones">
        <button
          type="button"
          className="btn btn-primary mr-2"
          onClick={() => redireccionarEdicion(producto)}
        >
          Editar
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => confirmareliminarProducto(id)}
        >
          Eliminar
        </button>
      </td>
    </tr>
  );
};

export default Producto;
