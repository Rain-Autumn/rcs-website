/**
 * Standalone retirement response. No application modules, assets or bindings.
 * Production Worker identity and routing must be confirmed separately.
 */
const message = [
  "Le service de conversation en ligne Even / Evidence Engine a été retiré.",
  "Aucune demande n'est transmise à un modèle d'intelligence artificielle.",
  "Retrouvez Raiju Cloud System : https://raijucloudsystem.com/fr",
  "",
].join("\n");

export function retirementResponse(method = "GET") {
  return new Response(method.toUpperCase() === "HEAD" ? null : message, {
    status: 410,
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "content-language": "fr",
      "cache-control": "no-store",
      "content-security-policy":
        "default-src 'none'; base-uri 'none'; frame-ancestors 'none'",
      "referrer-policy": "no-referrer",
      "x-content-type-options": "nosniff",
      "x-robots-tag": "noindex, nofollow, noarchive",
    },
  });
}

const retiredWorker = {
  fetch(request) {
    // This runs before any URL, request body, authentication or model handling.
    return retirementResponse(request.method);
  },
};

export default retiredWorker;
