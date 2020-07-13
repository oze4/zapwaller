const fs = require("fs");

const arguments = process.argv.slice(2);
const buildFor = arguments[0];

if (!["chrome", "firefox"].includes(buildFor)) {
  throw new Error("Incorrect parameter! Must be either chrome or firefox.");
}

let manifest = {
  name: "zapwaller",
  version: "0.0.1",
  description: "Zap paywalls",
  manifest_version: 2,
  permissions: ["activeTab", "storage"],
  background: {
    scripts: ["src/background.js"]
  },
  content_scripts: [
    {
      matches: ["http://*/*", "https://*/*"],
      js: ["src/contentScripts/paywallCheck.js"],
      run_at: "document_end",
    },
  ],
  icons: {
    "16": "assets/png/icon16.png",
    "32": "assets/png/icon32.png",
    "48": "assets/png/icon48.png",
    "128": "assets/png/icon128.png",
  },
  browser_action: {
    default_popup: "src/popup/popup.html",
    default_icon: {
      "16": "assets/png/icon16.png",
      "32": "assets/png/icon32.png",
      "48": "assets/png/icon48.png",
      "128": "assets/png/icon128.png",
    },
  },
};

if (buildFor === "chrome") {
  manifest.permissions.push("declarativeContent");
  manifest.options_page = "src/options/options.html";
  manifest.background.persistent = false;
}

if (buildFor === "firefox") {
  manifest.browser_specific_settings = {
    gecko: {
      id: "borderify@example.com",
    },
  };
}

fs.writeFileSync("manifest.json", JSON.stringify(manifest, null, 2));
