export function downloadTextFile(args: Readonly<{ filename: string; contents: string; mimeType: string }>) {
  const blob = new Blob([args.contents], { type: args.mimeType });
  const url = URL.createObjectURL(blob);

  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = args.filename;
  anchor.click();

  URL.revokeObjectURL(url);
}

