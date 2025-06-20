// utils/isEditorContentEmpty.ts
export function isEditorContentEmpty(html: string) {
  if (!html) return true;
  const temp = document.createElement("div");
  temp.innerHTML = html;
  const text = temp.textContent?.trim();
  return !text;
}
