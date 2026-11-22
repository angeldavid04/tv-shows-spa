import DOMPurify from "https://cdn.jsdelivr.net/npm/dompurify@3.2.6/+esm";

export default function cleanHTML(html) {
  return DOMPurify.sanitize(html);
}
