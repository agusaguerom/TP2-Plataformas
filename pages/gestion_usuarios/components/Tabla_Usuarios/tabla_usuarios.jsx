import React from "react";
import { users } from '../../../../src/data/data';  
import FilasUsuarios from "../Filas_Usuarios/Filas_Usuarios";
import './Tabla_Usuarios.css';

const TablaUsuarios = () => {
    return(
        <div className="tabla-padding-usuarios">
            <table className="tabla-de-usuarios">
                <thead>
                    <tr>
                        <th className="centrar-th-usuarios">Id</th>
                        <th className="centrar-th-usuarios">Nombre</th>
                        <th className="centrar-th-usuarios">Email</th>
                        <th className="centrar-th-usuarios">Rol</th>
                        <th className="centrar-th-usuarios">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <FilasUsuarios key={user.id} id={user.id} nombre={user.name} email={user.email} rol={user.role} />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TablaUsuarios;
