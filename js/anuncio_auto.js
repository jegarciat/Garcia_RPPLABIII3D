import Anuncio from "./anuncio.js";

export default class Anuncio_Auto extends Anuncio{
    constructor(id, titulo, transaccion, descripcion, precio, num_puertas, num_kms, potencia, asientos_cuero, aire_acondicionado, polarizado) {
        super(id, titulo, transaccion, descripcion, precio);
        this.num_puertas = num_puertas;
        this.num_kms = num_kms;
        this.potencia = potencia;
        this.asientos_cuero = asientos_cuero;
        this.aire_acondicionado = aire_acondicionado;
        this.polarizado = polarizado;
    }
}