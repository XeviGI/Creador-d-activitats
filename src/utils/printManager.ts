import { GeneratedActivityData } from '../types/activity';
import { cleanStudentExerciseText, cleanStudentWorksheetTitle } from './studentTextCleaner';

/**
 * Generates clean, standalone A4 printable HTML for the student worksheet or dossier.
 */
export function generatePrintableHtml(
  activity: GeneratedActivityData,
  mode: 'alumne' | 'docent' | 'tot' = 'alumne',
  fontStyle: string = 'school'
): string {
  const { seccio1, seccio2, seccio3, titolActivitat } = activity;

  const fontDeclaration =
    fontStyle === 'school'
      ? "'Comic Neue', 'Comic Sans MS', cursive, sans-serif"
      : fontStyle === 'cursive'
      ? "'Schoolbell', cursive, sans-serif"
      : fontStyle === 'pal'
      ? "system-ui, -apple-system, sans-serif"
      : "system-ui, -apple-system, sans-serif";

  const palTransform = fontStyle === 'pal' ? 'text-transform: uppercase; letter-spacing: 0.06em;' : '';

  let bodyContent = '';

  if (mode === 'alumne' || mode === 'tot') {
    const exercicisHtml = (seccio2?.exercicis || [])
      .map((ex, idx) => {
        const num = ex.num || idx + 1;
        const linesCount = ex.liniesResposta || 2;
        const cleanedEnunciat = cleanStudentExerciseText(ex.enunciat || '');
        const cleanedContingut = cleanStudentExerciseText(ex.contingut || '');

        const linesHtml =
          !cleanedContingut || !cleanedContingut.includes('______')
            ? Array.from({ length: linesCount })
                .map(() => '<div class="answer-line"></div>')
                .join('')
            : '';

        return `
          <div class="exercise-item">
            <div class="exercise-header">
              <span class="exercise-num">${num}.</span>
              <span class="exercise-title">${escapeHtml(cleanedEnunciat)}</span>
            </div>
            ${cleanedContingut ? `<div class="exercise-content">${escapeHtml(cleanedContingut)}</div>` : ''}
            ${linesHtml ? `<div class="lines-container">${linesHtml}</div>` : ''}
          </div>
        `;
      })
      .join('');

    const autoavaluacioHtml = seccio2?.autoavaluacioVisual
      ? `
        <div class="autoavaluacio-box">
          <div class="autoavaluacio-header">
            <strong>${escapeHtml(seccio2.autoavaluacioVisual.titol || 'Autoavaluació (Com he treballat?)')}</strong>
            <span class="autoavaluacio-sub">Encercla l'opció que millor descriu la teva feina</span>
          </div>
          <div class="autoavaluacio-grid">
            ${(seccio2.autoavaluacioVisual.opcions || [])
              .map((opt, i) => {
                const icon = i === 0 ? '🟢' : i === 1 ? '🟡' : '🔴';
                return `
                  <div class="auto-opt">
                    <span class="auto-icon">${icon}</span>
                    <span class="auto-text">${escapeHtml(opt)}</span>
                  </div>
                `;
              })
              .join('')}
          </div>
        </div>
      `
      : '';

    bodyContent += `
      <div class="sheet-container ${fontStyle === 'pal' ? 'uppercase-mode' : ''}">
        <div class="header-box">
          <div class="header-row">
            <div><strong>Nom i Cognoms:</strong> __________________________________________________</div>
            <div><strong>Data:</strong> ______________</div>
            <div><strong>Curs:</strong> _________</div>
          </div>
          <div class="title-section">
            <h1 class="main-title">${escapeHtml(cleanStudentWorksheetTitle(titolActivitat || 'ACTIVITAT DE TREBALL'))}</h1>
          </div>
        </div>

        ${
          seccio2?.textAdaptat
            ? `
          <div class="text-box">
            <div class="text-tag">Llegeix amb atenció el text de la sessió:</div>
            <div class="text-body">${escapeHtml(seccio2.textAdaptat)}</div>
          </div>
        `
            : ''
        }

        <div class="exercises-container">
          ${exercicisHtml}
        </div>

        ${autoavaluacioHtml}

        <div class="sheet-footer">
          <span>DidactiCat • Generalitat de Catalunya (Decret 175/2022)</span>
          <span>Fitxa A4 d'aprenentatge</span>
        </div>
      </div>
    `;
  }

  if (mode === 'docent' || (mode === 'tot' && seccio1)) {
    if (mode === 'tot') {
      bodyContent = `
        <div class="page-break"></div>
        ${bodyContent}
      `;
    }

    const cesHtml = (seccio1?.competenciesEspecifiques || [])
      .map(
        (ce) => `
        <div class="docent-card">
          <div class="docent-badge">${escapeHtml(ce.codi)}</div>
          <div class="docent-card-title">«${escapeHtml(ce.titol)}»</div>
          ${ce.justificacio ? `<div class="docent-card-desc"><strong>Vinculació:</strong> ${escapeHtml(ce.justificacio)}</div>` : ''}
        </div>
      `
      )
      .join('');

    const casHtml = (seccio1?.criterisAvaluacio || [])
      .map(
        (ca) => `
        <div class="docent-card">
          <div class="docent-badge">${escapeHtml(ca.codi)}</div>
          <div class="docent-card-title">${escapeHtml(ca.descripcio)}</div>
          ${ca.aplicacio ? `<div class="docent-card-desc"><strong>Aplicació:</strong> ${escapeHtml(ca.aplicacio)}</div>` : ''}
        </div>
      `
      )
      .join('');

    const solucionsHtml = (seccio3?.solucions || [])
      .map(
        (s, i) => `
        <div class="solucio-item">
          <strong>Exercici ${s.num || i + 1} (${escapeHtml(s.enunciatResumit || '')}):</strong>
          <div class="solucio-text">👉 ${escapeHtml(s.respostaEsperada || '')}</div>
          ${s.observacions ? `<div class="solucio-obs"><em>Pauta:</em> ${escapeHtml(s.observacions)}</div>` : ''}
        </div>
      `
      )
      .join('');

    const rubricaHtml = (seccio3?.rubrica || [])
      .map(
        (r) => `
        <div class="rubrica-crit">
          <div class="rubrica-title">🔹 ${escapeHtml(r.criteri)}</div>
          <div class="rubrica-levels">
            <div><strong>AE (Excel·lent):</strong> ${escapeHtml(r.excel·lent)}</div>
            <div><strong>AN (Notable):</strong> ${escapeHtml(r.notable)}</div>
            <div><strong>AS (Satisfactori):</strong> ${escapeHtml(r.satisfactori)}</div>
            <div><strong>NA (No assolit):</strong> ${escapeHtml(r.noAssolit)}</div>
          </div>
        </div>
      `
      )
      .join('');

    const docentBlock = `
      <div class="dossier-container">
        <h2 class="dossier-heading">DOSSIER DOCENT & CRITERIS PEDAGÒGICS</h2>
        <div class="dossier-meta">
          <strong>Àrea:</strong> ${escapeHtml(seccio1?.area || '')} | 
          <strong>Curs:</strong> ${escapeHtml(seccio1?.curs || '')} (${escapeHtml(seccio1?.cicle || '')})
        </div>

        <div class="section-block">
          <h3>1. Competències Específiques (Decret 175/2022 - Redactat Literal)</h3>
          ${cesHtml}
        </div>

        <div class="section-block">
          <h3>2. Criteris d'Avaluació de Cicle (Literal)</h3>
          ${casHtml}
        </div>

        <div class="section-block">
          <h3>3. Solucionari de les Activitats</h3>
          ${solucionsHtml}
        </div>

        ${
          rubricaHtml
            ? `
          <div class="section-block">
            <h3>4. Rúbrica d'Avaluació de l'Àrea (${escapeHtml(seccio1?.area || '')})</h3>
            ${rubricaHtml}
          </div>
        `
            : ''
        }
      </div>
    `;

    if (mode === 'docent') {
      bodyContent = docentBlock;
    } else {
      bodyContent = docentBlock + `<div class="page-break"></div>` + bodyContent;
    }
  }

  return `<!DOCTYPE html>
<html lang="ca">
<head>
  <meta charset="UTF-8">
  <title>${escapeHtml(titolActivitat || 'Fitxa Didàctica')} - DidactiCat</title>
  <style>
    @page {
      size: A4 portrait;
      margin: 1.2cm 1.4cm 1.2cm 1.4cm;
    }
    * {
      box-sizing: border-box;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    body {
      margin: 0;
      padding: 0;
      background: #ffffff;
      color: #111827;
      font-family: ${fontDeclaration};
      font-size: 13.5px;
      line-height: 1.55;
      ${palTransform}
    }
    .sheet-container {
      width: 100%;
      max-width: 100%;
      margin: 0 auto;
    }
    .header-box {
      border-bottom: 2px solid #000;
      padding-bottom: 12px;
      margin-bottom: 16px;
    }
    .header-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 6px;
      font-size: 13px;
    }
    .header-row-sub {
      font-size: 12.5px;
      color: #374151;
    }
    .title-section {
      text-align: center;
      margin-top: 14px;
    }
    .main-title {
      font-size: 20px;
      font-weight: 800;
      margin: 0;
      text-transform: uppercase;
      letter-spacing: -0.01em;
      color: #000;
    }
    .sub-title {
      font-size: 12px;
      color: #4b5563;
      margin: 4px 0 0 0;
      font-style: italic;
    }
    .text-box {
      border-left: 4px solid #111827;
      background: #f9fafb;
      padding: 10px 14px;
      margin-bottom: 20px;
      border-radius: 0 6px 6px 0;
    }
    .text-tag {
      font-size: 10.5px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #4b5563;
      margin-bottom: 6px;
    }
    .text-body {
      font-size: 13.5px;
      white-space: pre-line;
      line-height: 1.6;
      color: #111827;
    }
    .exercise-item {
      page-break-inside: avoid;
      break-inside: avoid;
      margin-bottom: 18px;
    }
    .exercise-header {
      display: flex;
      align-items: baseline;
      gap: 6px;
      font-weight: 700;
      font-size: 14px;
      color: #000;
    }
    .exercise-content {
      margin-top: 6px;
      padding-left: 20px;
      white-space: pre-line;
      line-height: 1.8;
      font-size: 13px;
    }
    .lines-container {
      margin-top: 10px;
      padding-left: 20px;
    }
    .answer-line {
      border-bottom: 1px solid #111827;
      height: 24px;
      width: 100%;
    }
    .autoavaluacio-box {
      page-break-inside: avoid;
      break-inside: avoid;
      margin-top: 24px;
      padding-top: 14px;
      border-top: 2px solid #000;
    }
    .autoavaluacio-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      font-size: 12px;
    }
    .autoavaluacio-sub {
      font-style: italic;
      color: #4b5563;
      font-size: 11px;
    }
    .autoavaluacio-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 8px;
    }
    .auto-opt {
      border: 1px solid #000;
      border-radius: 6px;
      padding: 8px 10px;
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 11.5px;
      line-height: 1.35;
    }
    .auto-icon {
      font-size: 14px;
    }
    .sheet-footer {
      margin-top: 24px;
      padding-top: 8px;
      border-top: 1px solid #e5e7eb;
      font-size: 10px;
      color: #6b7280;
      display: flex;
      justify-content: space-between;
    }
    .page-break {
      page-break-before: always;
      break-before: page;
    }
    .dossier-container {
      font-family: system-ui, -apple-system, sans-serif !important;
      color: #111827;
    }
    .dossier-heading {
      font-size: 18px;
      font-weight: 800;
      border-bottom: 2px solid #2563eb;
      padding-bottom: 6px;
      margin-bottom: 10px;
      color: #1e3a8a;
    }
    .dossier-meta {
      font-size: 12px;
      color: #4b5563;
      margin-bottom: 16px;
    }
    .section-block {
      margin-bottom: 20px;
      page-break-inside: avoid;
    }
    .section-block h3 {
      font-size: 13.5px;
      font-weight: 700;
      color: #1f2937;
      margin: 0 0 8px 0;
      border-left: 3px solid #3b82f6;
      padding-left: 8px;
    }
    .docent-card {
      border: 1px solid #e5e7eb;
      border-radius: 6px;
      padding: 8px 12px;
      margin-bottom: 8px;
      background: #f9fafb;
    }
    .docent-badge {
      font-family: monospace;
      font-weight: 700;
      font-size: 11px;
      color: #2563eb;
      margin-bottom: 4px;
    }
    .docent-card-title {
      font-weight: 600;
      font-size: 12px;
      line-height: 1.4;
      color: #111827;
    }
    .docent-card-desc {
      font-size: 11px;
      color: #4b5563;
      margin-top: 4px;
    }
    .solucio-item {
      border-bottom: 1px solid #e5e7eb;
      padding: 8px 0;
      font-size: 12px;
    }
    .solucio-text {
      color: #065f46;
      font-weight: 600;
      margin-top: 3px;
    }
    .solucio-obs {
      font-size: 11px;
      color: #6b7280;
      margin-top: 2px;
    }
    .rubrica-crit {
      margin-bottom: 10px;
      border: 1px solid #e5e7eb;
      border-radius: 6px;
      padding: 8px 12px;
      font-size: 11.5px;
    }
    .rubrica-title {
      font-weight: 700;
      color: #1e3a8a;
      margin-bottom: 4px;
    }
    .rubrica-levels {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 6px;
      font-size: 11px;
      color: #374151;
    }
    .print-toolbar {
      display: flex;
    }
    @media print {
      .print-toolbar, .no-print {
        display: none !important;
      }
    }
  </style>
</head>
<body>
  <div class="print-toolbar no-print" style="position: sticky; top: 0; left: 0; right: 0; background: #0f172a; color: white; padding: 10px 18px; display: flex; align-items: center; justify-content: space-between; font-family: system-ui, -apple-system, sans-serif; font-size: 13px; z-index: 9999; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.15);">
    <div style="font-weight: 600; display: flex; align-items: center; gap: 8px;">
      <span>📄 Fitxa d'Educació Primària (Decret 175/2022)</span>
      <span style="font-size: 11px; background: #334155; padding: 2px 8px; rounded: 4px; color: #cbd5e1;">A4 Blanc i Negre</span>
    </div>
    <div style="display: flex; gap: 10px;">
      <button onclick="window.print()" style="background: #4f46e5; color: white; border: none; padding: 8px 16px; border-radius: 8px; font-weight: 700; cursor: pointer; font-size: 13px; display: flex; align-items: center; gap: 6px; box-shadow: 0 1px 2px rgba(0,0,0,0.2);">
        🖨️ Imprimir Fitxa Ara (Ctrl+P / Desar en PDF)
      </button>
      <button onclick="window.close()" style="background: #334155; color: #f1f5f9; border: none; padding: 8px 12px; border-radius: 8px; cursor: pointer; font-size: 12px;">
        Tancar
      </button>
    </div>
  </div>
  ${bodyContent}
  <script>
    // Si la finestra s'obre des d'un botó d'impressió, dispara automàticament el diàleg del navegador
    if (window.location.search.includes('print=true') || window.name === 'didacticat_print_window') {
      window.addEventListener('load', function() {
        setTimeout(function() {
          try {
            window.focus();
            window.print();
          } catch(e) {}
        }, 300);
      });
    }
  </script>
</body>
</html>`;
}

function escapeHtml(str: string): string {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Opens the printable sheet in a new browser tab/window where window.print()
 * is never blocked by preview iframe sandbox restrictions.
 */
export function openInNewTabForPrint(
  activity: GeneratedActivityData,
  mode: 'alumne' | 'docent' | 'tot' = 'alumne',
  fontStyle: string = 'school'
): boolean {
  try {
    const html = generatePrintableHtml(activity, mode, fontStyle);
    const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    // Try window.open first
    const newWin = window.open(url, 'didacticat_print_window');
    if (newWin) {
      try {
        newWin.focus();
      } catch {}
      return true;
    }

    // Fallback: anchor click with target="_blank"
    const a = document.createElement('a');
    a.href = url;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    return true;
  } catch (e) {
    console.warn('Could not open tab, triggering direct download fallback:', e);
    downloadPrintableFile(activity, mode, fontStyle);
    return false;
  }
}

/**
 * Triggers instant printing.
 * Handles the iframe sandbox of web previews by falling back seamlessly
 * to opening in a new tab or downloading the ready-to-print HTML file.
 */
export function executePrint(
  activity: GeneratedActivityData,
  mode: 'alumne' | 'docent' | 'tot' = 'alumne',
  fontStyle: string = 'school'
): void {
  // If we are detected inside an iframe, directly open in a new tab or trigger window.print
  const isInIframe = window.self !== window.top;

  if (isInIframe) {
    // In preview iframes, direct window.print() or iframe print is usually blocked by the browser.
    // Opening in a new tab bypasses the iframe sandbox completely!
    const opened = openInNewTabForPrint(activity, mode, fontStyle);
    if (!opened) {
      downloadPrintableFile(activity, mode, fontStyle);
    }
    return;
  }

  // If running top-level (not in an iframe), standard window.print works
  try {
    window.focus();
    window.print();
  } catch (err) {
    console.warn('Direct print failed, opening in new tab:', err);
    openInNewTabForPrint(activity, mode, fontStyle);
  }
}

/**
 * Downloads a standalone, styled HTML file ready for printing or editing in Word / Google Docs.
 */
export function downloadPrintableFile(
  activity: GeneratedActivityData,
  mode: 'alumne' | 'docent' | 'tot' = 'alumne',
  fontStyle: string = 'school'
): void {
  const html = generatePrintableHtml(activity, mode, fontStyle);
  const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  const safeName = (activity.titolActivitat || 'Fitxa_DidactiCat')
    .slice(0, 35)
    .replace(/[^a-zA-Z0-9àèéíòóúÀÈÉÍÒÓÚçÇñÑ_-]/g, '_');
  a.download = `Fitxa_${mode === 'alumne' ? 'Alumne_A4' : mode === 'docent' ? 'Docent' : 'Completa'}_${safeName}.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
