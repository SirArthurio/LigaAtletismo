export class Usuario {
    constructor(id= null, nombre, correoElectronico, contrasenia, role = 0) {
      this.id = id;
      this.nombre = nombre;
      this.correoElectronico = correoElectronico;
      this.contrasenia = contrasenia;
      this.role = role;
    }
}