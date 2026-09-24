/**
 * Utility to ensure the student worksheet is 100% clean and authentic:
 * - Removes hints/pistes (these belong to the teacher, not printed on the student sheet)
 * - Removes parenthetical metadata labels like (COMPRENSIÓ DIRECTA), (COMPLETAR), (LITERAL), etc.
 * - Strips any DUA adaptation notes or curriculum codes from student-facing text.
 */

export function cleanStudentExerciseText(text: string): string {
  if (!text) return '';

  let cleaned = text;

  // 1. Remove parenthetical exercise classification tags:
  // e.g. (COMPRENSIÓ DIRECTA), (COMPLETAR), (LITERAL), (INFERÈNCIA), (EXTRACCIÓ D'INFORMACIÓ), etc.
  cleaned = cleaned.replace(
    /\s*\((?:COMPRENSIÓ(?:\s*(?:DIRECTA|INFERENCIAL|LITERAL|CRÍTICA|TEXTUAL))?|COMPLETAR|LITERAL|INFERÈNCIA|EXTRACCIÓ(?:\s*D'INFORMACIÓ)?|OPCIÓ\s*MÚLTIPLE|VERTADER\s*O\s*FALS|RESPOSTA\s*OBERTA|RELACIONAR|PENSAMENT\s*CRÍTIC|APARELLAR|RELACIÓ|REFLEXIÓ)[^)]*\)/gi,
    ''
  );

  // 2. Remove bracketed or parenthetical hints/pistes:
  // e.g. [Pista: ...], (Pista: ...), [Ajuda: ...], (Ajuda: ...), [Suport: ...]
  cleaned = cleaned.replace(/\s*\[(?:Pista|Ajuda|Suport|Consell)[^\]]*\]/gi, '');
  cleaned = cleaned.replace(/\s*\((?:Pista|Ajuda|Suport|Consell)[^)]*\)/gi, '');

  // 3. Remove standalone hint lines at start or end of string / newline:
  // e.g. "Pista: busca la paraula al primer paràgraf"
  cleaned = cleaned.replace(/(?:^|\n)\s*(?:Pista|Ajuda|Consell)\s*:\s*[^\n]*/gi, '');

  // 4. Remove lingering empty brackets or parentheses: () or []
  cleaned = cleaned.replace(/\s*\(\s*\)/g, '');
  cleaned = cleaned.replace(/\s*\[\s*\]/g, '');

  // 5. Clean excessive spaces
  cleaned = cleaned.replace(/[ \t]{2,}/g, ' ').trim();

  return cleaned;
}

/**
 * Ensures the student header is clean, without DUA adaptation badges or technical curriculum notes
 */
export function cleanStudentWorksheetTitle(title: string): string {
  if (!title) return 'ACTIVITAT DE TREBALL';
  return title
    .replace(/\s*\((?:Versió|Nivell|DUA)[^)]*\)/gi, '')
    .replace(/\s*-\s*Versió.*$/gi, '')
    .trim();
}
