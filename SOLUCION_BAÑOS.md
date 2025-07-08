# SOLUCIÓN - Problema de Baños en Propiedades ✅

## Problema Identificado

Las propiedades existentes no muestran el número de baños porque el campo `baños` no se guardaba en la base de datos cuando el valor era `0`.

## Causa del Problema

En el middleware `propertyTransform.ts`, la condición:

```javascript
baños: req.body["caracteristicas.baños"]
  ? parseInt(req.body["caracteristicas.baños"])
  : undefined;
```

Asignaba `undefined` cuando el valor era `0`, y MongoDB no guarda campos `undefined`.

## Solución Aplicada

### 1. Corrección en el Middleware

**Archivo**: `inmobiliaria-BFF/src/middleware/propertyTransform.ts`

```javascript
// ANTES (incorrecto)
baños: req.body["caracteristicas.baños"]
  ? parseInt(req.body["caracteristicas.baños"])
  : undefined;

// DESPUÉS (correcto)
baños: req.body["caracteristicas.baños"] !== undefined
  ? parseInt(req.body["caracteristicas.baños"]) || 0
  : undefined;
```

### 2. Migración de Propiedades Existentes

Se creó un script de migración para actualizar las propiedades existentes:

**Archivo**: `inmobiliaria-BFF/migrate-bathrooms-simple.js`

Para ejecutar la migración:

```bash
cd inmobiliaria-BFF
node migrate-bathrooms-simple.js
```

## Resultado

✅ **Nuevas propiedades**: El campo `baños` se guarda correctamente (incluso cuando es 0)
✅ **Propiedades existentes**: Se actualizan con `baños: 0` por defecto
✅ **Dashboard**: Muestra el número correcto de baños en las cards

## Verificación

1. Crear nueva propiedad con 0 baños → se guarda correctamente
2. Crear nueva propiedad con 2 baños → se guarda correctamente
3. Editar propiedad existente → el campo baños persiste
4. Las cards muestran el número correcto de baños

## Pasos Manuales (Alternativa)

Si prefieres no usar la migración automática:

1. Editar cada propiedad en el admin panel
2. Completar el campo de baños
3. Guardar la propiedad
4. El campo baños aparecerá en las cards

---

**Estado**: ✅ RESUELTO
**Fecha**: 2025-07-08
**Archivos modificados**: `propertyTransform.ts`, script de migración creado
