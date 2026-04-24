export const camisetas = Array.from({ length: 120 }, (_, i) => ({
  id: `TSH${String(i + 1).padStart(3, '0')}`,
  nombre: `Camiseta artística ${i + 1}`,
  descripcion: `Diseño exclusivo ${i + 1}`,
  precio: Number((15 + Math.random() * 25).toFixed(2)),
  stock: Math.floor(Math.random() * 40) + 1,
  colores: ['negro', 'blanco', 'azul', 'verde'],
  tallas: ['S', 'M', 'L', 'XL']
}));

export const comandas = Array.from({ length: 400 }, (_, i) => ({
  id: `ORD${1000 + i}`,
  fecha: new Date().toISOString(),
  total: Number((20 + Math.random() * 100).toFixed(2)),
  items: [
    {
      camisetaId: camisetas[i % camisetas.length].id,
      cantidad: Math.floor(Math.random() * 3) + 1
    }
  ]
}));

