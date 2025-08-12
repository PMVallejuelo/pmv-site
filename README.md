# Sitio PMV — GitHub Pages (Starter)

Este es un arranque listo para publicar el sitio de la **Policía Municipal de Vallejuelo** en GitHub Pages.

## Publicar en 5 minutos

1. Crea una cuenta en GitHub (si no la tienes).
2. Crea un repositorio nuevo llamado, por ejemplo, `pmv-site`.
3. Sube todos los archivos de esta carpeta (o carga el ZIP).
4. En **Settings → Pages**:
   - *Build and deployment* → Source: **Deploy from a branch**
   - Branch: **main** / folder: **/** (root)
   - Guarda. Espera 1–2 minutos hasta que salga la URL pública (algo como `https://usuario.github.io/pmv-site/`).

## Configurar “Agentes Activos” con Google Sheets (CSV)

1. En tu Google Sheet:
   - Hoja “Registro” con columnas: `# | NOMBRE | RANGO | MATRÍCULA/PLACA | UNIDAD/SECTOR | ESTADO | OBSERVACIÓN`
   - Hoja “Activos” con fórmula: `=FILTER(Registro!A:G, Registro!F:F="Activo")`
2. Publicar CSV: **Archivo → Compartir → Publicar en la web → Hoja: Activos → Formato: CSV → Publicar**.
3. Copia el enlace que te da Google (termina en `output=csv`).
4. En `assets/js/activos.js`, reemplaza `REEMPLAZA_GOOGLE_SHEETS_CSV_URL` por tu enlace CSV.
5. Sube el cambio a GitHub. En 1–2 minutos la página `activos.html` mostrará la tabla.

## QR para los carnets

- Usa la URL pública de `activos.html` (por ejemplo `https://usuario.github.io/pmv-site/activos.html`) para generar el código QR.
- Nivel de corrección: **M** o **Q**. Prueba con varios teléfonos.

## Personalización

- Logo: coloca `logo.png` en `assets/img/`.
- Colores: ajusta `assets/css/styles.css`.
- Contactos y WhatsApp: edita los enlaces en `index.html` y `activos.html`.

> Lema institucional: **Por amor a mi pueblo, siempre al servicio**.
