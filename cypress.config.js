import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173",
    supportFile: false,
  },
  veiwportWidth: 1024,
  veiwportHeight: 768
});
