import { defineManifest } from "@crxjs/vite-plugin";

export default defineManifest({
  manifest_version: 3,
  name: "Broto",
  version: "1.0.0",
  description: "Visual browser automation tool",
  permissions: ["storage", "tabs", "debugger", "sidePanel"],

  action: {
    default_title: "Broto",
  },
  side_panel: {
    default_path: "index.html",
  },
  background: {
    service_worker: "src/background/service-worker.js",
    type: "module",
  },
});
