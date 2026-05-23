/**
 * File Download Utility
 * Allows client-side text or document formatting and download as files.
 */
export const downloadAsFile = (content: string, fileName: string, contentType: string = "text/plain;charset=utf-8") => {
  const blob = new Blob([content], { type: contentType });
  const url = URL.createObjectURL(blob);
  const tempLink = document.createElement("a");
  tempLink.href = url;
  tempLink.setAttribute("download", fileName);
  
  // Append to body, click, and clean up
  document.body.appendChild(tempLink);
  tempLink.click();
  document.body.removeChild(tempLink);
  URL.revokeObjectURL(url);
};
