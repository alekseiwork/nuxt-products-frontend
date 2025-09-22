export const parseGoogleSheetUrl = (url: string): string | null => {
  try {
    const match = url.match(/\/d\/([a-zA-Z0-9-_]+)/);
    if (!match) return null;
    const sheetId = match[1];
    return `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv`;
  } catch (err) {
    console.error("Не удалось распарсить Google Sheet URL", err);
    return null;
  }
};
