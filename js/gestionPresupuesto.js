let presupuesto = 0;
let gastos = [];
let idGasto = 0;

function actualizarPresupuesto(cantidad) {
    if (typeof cantidad === 'number' && cantidad >= 0) {
        presupuesto = cantidad;
        return presupuesto;
    } else {
        console.log("La cantidad introducida no puede ser negativa.")
        return -1;    
    }
}

function mostrarPresupuesto() {
    return "Tu presupuesto actual es de " + presupuesto + " €";
}

function CrearGasto(descripcion, cantidad, fecha, ...etiquetas) {

    this.valor = (typeof cantidad === 'number' && cantidad >= 0) ? cantidad : 0;
    this.descripcion = descripcion;
    this.fecha = (!isNaN(Date.parse(fecha))) ? Date.parse(fecha) : Date.now();
    this.etiquetas = etiquetas;

    this.mostrarGasto = function() {
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    }

    this.mostrarGastoCompleto = function() {
        let gastoCadena = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\n`;
        gastoCadena += `Fecha: ${new Date(this.fecha).toLocaleString()}\n`;
        gastoCadena += 'Etiquetas:\n';

        for(let etiqueta of this.etiquetas) {
            gastoCadena += `- ${etiqueta}\n`;
        }

        return gastoCadena;
    }

    this.actualizarValor = function(nuevoValor) {
        if (typeof nuevoValor === 'number' && nuevoValor >= 0) {
            this.valor = nuevoValor;
        }
    }

    this.actualizarDescripcion = function(nuevaDescripcion) {
        this.descripcion = nuevaDescripcion;
    }

    this.actualizarFecha = function(fecha) {
        if (!isNaN(Date.parse(fecha))) {
            this.fecha = Date.parse(fecha);
        }
    }

    this.anyadirEtiquetas = function(...etiquetas) {
        let nuevasEtiquetas = etiquetas.filter(etiqueta => !this.etiquetas.includes(etiqueta));
        this.etiquetas = this.etiquetas.concat(nuevasEtiquetas);
    }

    this.borrarEtiquetas = function(...etiquetas) {
        this.etiquetas = this.etiquetas.filter(etiqueta => !etiquetas.includes(etiqueta));
    }

    this.obtenerPeriodoAgrupacion = function(periodo) {
        const fecha = new Date(this.fecha);
        const mes = fecha.getUTCMonth() < 9 ? `0${fecha.getUTCMonth() + 1}` : fecha.getUTCMonth() + 1;
        const dia = fecha.getUTCDate() < 10 ? `0${fecha.getUTCDate()}` : fecha.getUTCDate();
        const anyo = fecha.getUTCFullYear();

        let agrupacion = "";

        switch (periodo) {
            case "dia":
                agrupacion = `${anyo}-${mes}-${dia}`;
                break;
            case "mes":
                agrupacion = `${anyo}-${mes}`;
                break;
            case "anyo":
                agrupacion = anyo;
                break;
        }

        return agrupacion;
    }
}

function listarGastos() {
    return gastos;
}

function cargarGastos(gastosAlmacenamiento) {
    gastos = [];
    for (let g of gastosAlmacenamiento) {
        let gastoRehidratado = new CrearGasto();
        Object.assign(gastoRehidratado, g);
        gastos.push(gastoRehidratado)
    }
}

function anyadirGasto(gasto) {
    gasto.id = idGasto;
    idGasto++;
    gastos.push(gasto);
}

function borrarGasto(id) {
    gastos = gastos.filter(gasto => gasto.id != id);
}

function calcularTotalGastos() {
    let totalGastos = 0;
    for(let gasto of gastos) {
        totalGastos += gasto.valor;
    }
    return totalGastos;
}

function calcularBalance() {
    return presupuesto - calcularTotalGastos();
}

function filtrarGastos(filtros) {
    return gastos.filter(gasto => {
        let resultado = true;

        if (filtros.fechaDesde && new Date(gasto.fecha) < new Date(filtros.fechaDesde)) resultado = false;
        if (filtros.fechaHasta && new Date(gasto.fecha) > new Date(filtros.fechaHasta)) resultado = false;
        if (filtros.valorMinimo && gasto.valor < filtros.valorMinimo) resultado = false;
        if (filtros.valorMaximo && gasto.valor > filtros.valorMaximo) resultado = false;
        if (filtros.descripcionContiene && !gasto.descripcion.toLowerCase().includes(filtros.descripcionContiene.toLowerCase())) resultado = false;
        if (filtros.etiquetasTiene && !gasto.etiquetas.some(etiqueta => filtros.etiquetasTiene.includes(etiqueta))) resultado = false;

        return resultado;
    });
}

function agruparGastos(periodo, etiquetas, fechaDesde, fechaHasta) {
    let filtros = {};
    if (etiquetas !== undefined) filtros["etiquetasTiene"] = etiquetas;
    if (fechaDesde !== undefined) filtros["fechaDesde"] = fechaDesde;
    if (fechaHasta !== undefined) filtros["fechaHasta"] = fechaHasta;

    const gastosFiltrados = filtrarGastos(filtros);

    const agrupacion = gastosFiltrados.reduce((acumulador, gasto, index, array) => {
        const periodoGasto = gasto.obtenerPeriodoAgrupacion(periodo);
        acumulador[periodoGasto] = (acumulador[periodoGasto] === undefined) ? gasto.valor : acumulador[periodoGasto] + gasto.valor;
        return acumulador;
    }, {});

    return agrupacion;
}

function transformarListadoEtiquetas(etiquetas) {
    return etiquetas.match(/[A-zÀ-ÿ0-9]+/g) || null;
}

export {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto,
    listarGastos,
    cargarGastos,
    anyadirGasto,
    borrarGasto,
    calcularTotalGastos,
    calcularBalance,
    filtrarGastos,
    agruparGastos,
    transformarListadoEtiquetas
}
