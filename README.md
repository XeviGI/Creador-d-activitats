# DidactiCat • Generador Pedagògic de Primària (Decret 175/2022 & DUA)

Aplicació web per a docents d'Educació Primària de Catalunya que genera fitxes d'aprenentatge curriculars, competencials i adaptades al DUA (Disseny Universal per a l'Aprenentatge) estrictament cenyides al text font proporcionat, amb rúbriques oficials i format A4 llest per imprimir.

---

## 📋 Requisits previs

Abans de començar, assegura't de tenir instal·lat al teu ordinador:
1. **Node.js** (versió 18 o superior recomanada): Descarrega'l gratuïtament a [nodejs.org](https://nodejs.org/).
2. **Clau de l'API de Gemini (gratuïta)**:
   - Ves a [Google AI Studio](https://aistudio.google.com/app/apikey).
   - Inicia sessió amb el teu compte de Google i fes clic a **"Create API key"** (és 100% gratuïta).
   - Copia la clau que et proporcioni.

---

## 🚀 Guia pas a pas per iniciar el projecte al teu ordinador

### 1. Clona o descarrega el repositori
Obre el teu terminal (o consola de comandes / PowerShell) i clona el projecte des de GitHub:
```bash
git clone https://github.com/EL_TEU_USUARI/EL_TEU_REPOSITORI.git
cd EL_TEU_REPOSITORI
```
*(També pots descarregar el fitxer ZIP des del botó verd "Code" de GitHub i descomprimir-lo a la teva carpeta preferida).*

---

### 2. Instal·la les dependències
Dins de la carpeta del projecte, executa:
```bash
npm install
```
Això descarregarà i instal·larà automàticament totes les llibreries necessàries (React, Express, Tailwind CSS, Gemini SDK, etc.).

---

### 3. Configura la teva clau d'API (`.env`)
A l'arrel de la carpeta del projecte, crea un arxiu anomenat `.env` (pots duplicar el fitxer existent `.env.example`).

Dins de l'arxiu `.env`, afegeix la teva clau de Gemini:
```env
GEMINI_API_KEY="AIzaSy..."
```
*(Substitueix `AIzaSy...` per la teva clau real obtinguda a Google AI Studio).*

---

### 4. Inicia el servidor de desenvolupament
Executa la següent comanda al terminal:
```bash
npm run dev
```

---

### 5. Obre l'aplicació al teu navegador
Un cop iniciat el servidor, veuràs un missatge com `Server running on port 3000`.

Obre el teu navegador habitual (Chrome, Firefox, Safari o Edge) i accedeix a:
👉 **[http://localhost:3000](http://localhost:3000)**

Ja pots provar i utilitzar DidactiCat amb totes les seves funcions!

---

## 🛠️ Comandes disponibles

* `npm run dev`: Inicia el servidor local de desenvolupament amb recàrrega automàtica a `http://localhost:3000`.
* `npm run build`: Compila el projecte per a producció (crea la carpeta `dist`).
* `npm start`: Executa l'aplicació en mode producció (ideal per a servidors al núvol com Render, Railway o Fly.io).
* `npm run lint`: Comprova que no hi hagi errors de tipus de TypeScript.

---

## 🌐 Com publicar-lo en línia gratuïtament

Si vols que l'aplicació estigui accessible per internet sense haver de tenir el teu ordinador engegat:

### Opció 1: Vercel (Recomanat)
1. Entra a [Vercel.com](https://vercel.com/) i inicia sessió amb el teu compte de GitHub.
2. Fes clic a **Add New...** > **Project** i selecciona el repositori del teu projecte.
3. Vercel detectarà automàticament la configuració (Vite).
4. Desplega la secció **Environment Variables** i afegeix:
   - **Key**: `GEMINI_API_KEY`
   - **Value**: *(la teva clau d'API de Google AI Studio)*
5. Fes clic a **Deploy**. En menys d'un minut tindràs la teva URL de Vercel pública i 100% operativa!

### Opció 2: Render.com (Gratuït)
1. Crea un compte a [Render.com](https://render.com/).
2. Fes clic a **New +** > **Web Service**.
3. Connecta el teu compte de GitHub i selecciona aquest repositori.
4. Configura els camps:
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
5. A l'apartat **Environment Variables**, afegeix:
   - `GEMINI_API_KEY`: el valor de la teva clau d'API.
6. Fes clic a **Deploy Web Service**.

### Opció 3: Railway.app o Fly.io
Pots enllaçar el mateix repositori i definir la variable `GEMINI_API_KEY`. S'executarà directament amb `npm start`.
