import * as gestionPresupuesto from './gestionPresupuesto.js';
import * as gestionPresupuestoWeb from './gestionPresupuestoWeb.js';

gestionPresupuesto.actualizarPresupuesto(1500);

// Datos de prueba.
gestionPresupuesto.anyadirGasto(new gestionPresupuesto.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida"));
gestionPresupuesto.anyadirGasto(new gestionPresupuesto.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida"));
gestionPresupuesto.anyadirGasto(new gestionPresupuesto.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte"));
gestionPresupuesto.anyadirGasto(new gestionPresupuesto.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina"));
gestionPresupuesto.anyadirGasto(new gestionPresupuesto.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros"));
gestionPresupuesto.anyadirGasto(new gestionPresupuesto.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros"));

// Datos en ID.
gestionPresupuestoWeb.mostrarDatoEnId('presupuesto', gestionPresupuesto.mostrarPresupuesto());
gestionPresupuestoWeb.mostrarDatoEnId('gastos-totales', gestionPresupuesto.calcularTotalGastos());
gestionPresupuestoWeb.mostrarDatoEnId('balance-total', gestionPresupuesto.calcularBalance());

// Listado completo de gastos.
const listadoGastos = gestionPresupuesto.listarGastos();
listadoGastos.forEach(gasto => {
    gestionPresupuestoWeb.mostrarGastoWeb('listado-gastos-completo', gasto);
});

// Gastos filtrados 1.
const filtrado1 = gestionPresupuesto.filtrarGastos({
    fechaDesde: '9/1/2021',
    fechaHasta: '9/30/2021'
});

filtrado1.forEach(gasto => {
    gestionPresupuestoWeb.mostrarGastoWeb('listado-gastos-filtrado-1', gasto);
});

// Gastos filtrados 2.
const filtrado2 = gestionPresupuesto.filtrarGastos({
    valorMinimo: 50
});

filtrado2.forEach(gasto => {
    gestionPresupuestoWeb.mostrarGastoWeb('listado-gastos-filtrado-2', gasto);
});

// Gastos filtrados 3.
const filtrado3 = gestionPresupuesto.filtrarGastos({
    valorMinimo: 200,
    etiquetasTiene: ['seguros']
});

filtrado3.forEach(gasto => {
    gestionPresupuestoWeb.mostrarGastoWeb('listado-gastos-filtrado-3', gasto);
});

// Gastos filtrados 4.
const filtrado4 = gestionPresupuesto.filtrarGastos({
    valorMaximo: 50,
    etiquetasTiene: ['comida', 'transporte']
});

filtrado4.forEach(gasto => {
    gestionPresupuestoWeb.mostrarGastoWeb('listado-gastos-filtrado-4', gasto);
});

// Gastos agrupados
gestionPresupuestoWeb.mostrarGastosAgrupadosWeb('agrupacion-dia', gestionPresupuesto.agruparGastos('dia'), 'día');
gestionPresupuestoWeb.mostrarGastosAgrupadosWeb('agrupacion-mes', gestionPresupuesto.agruparGastos('mes'), 'mes');
gestionPresupuestoWeb.mostrarGastosAgrupadosWeb('agrupacion-anyo', gestionPresupuesto.agruparGastos('anyo'), 'año');
