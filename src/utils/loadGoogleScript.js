export function loadGoogleScript() {
  return new Promise((resolve) => {
    if (document.getElementById("google-client")) {
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.id = "google-client";
    script.onload = resolve;
    document.body.appendChild(script);
  });
}
