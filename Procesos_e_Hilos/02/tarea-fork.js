// Escuchamos el walkie-talkie (los mensajes del server.js)
process.on('message', (mensaje) => {
    
    // Verificamos qué orden nos ha dado el Jefe
    if (mensaje.comando === 'empezar_inventario') {
        console.log('[Hijo] Recibida orden de inventario. Empezando trabajo pesado...');
        
        // Simulamos un trabajo de CPU muy pesado (contar millones de cosas)
        let total = 0;
        for (let i = 0; i < 5_000_000_000; i++) {
            total++;
        }
        
        console.log('[Hijo] Trabajo pesado completado.');
        // El trabajo terminó, avisamos al Jefe por el walkie-talkie
        process.send({ 
            estado: 'Inventario completado con éxito', 
            total: total 
        });

        // Cerramos este proceso para no dejar cocineros "zombis" consumiendo RAM
        process.exit();
    }
});
