# PRACTICA 2: API TeeLab (Catalogo + Comandas)

## Como Arrancar
* Arrancar en modo desarrollo
```sh
npm run dev
```

* Arrancar en modo producción
```sh
npm run start
```


## Endpoints

### Catalogos

#### Listar Camisetas **GET /api/camisetas**
* Devuelve un array de camisetas

#### Detalle de Camiseta **GET /api/camisetas/:id**
* Devuelve una camiseta

### Comandas

#### Crear Comanda **POST /api/comandas**
* Body esperado
```json
{
  "cliente": { "nombre": "Ana", "email": "ana@mail.com" },
  "direccion": { "calle": "Carrer Major 1", "cp": "08400", "ciudad": "Granollers" },
  "items": [
    { "camisetaId": "TSH01", "talla": "M", "color": "negro", "cantidad": 2 },
    { "camisetaId": "TSH02", "talla": "L", "color": "gris", "cantidad": 1 }
  ]
}
```

* Devuelve un ticket
```json
{
  "id": "ORD-0001",
  "fecha": "2026-02-26T18:10:00.000Z",
  "estado": "recibida",
  "items": [
    {
      "camisetaId": "TSH01",
      "nombre": "MACACARENA",
      "talla": "M",
      "color": "negro",
      "cantidad": 2,
      "precioUnitario": 19.95,
      "subtotal": 39.9
    }
  ],
  "total": 39.9
}
```

#### Listar Comandas **GET /api/comandas**
* Devuelve un array de comandas

#### Detalle de Comanda **GET /api/comandas/:id**
* Devuelve una comanda
