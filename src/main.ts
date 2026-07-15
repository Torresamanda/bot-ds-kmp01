import { loadEnvironment } from "./config/environment.js";

function bootstrap(): void {
  loadEnvironment();

  console.log("KMP-01: núcleo de inicialização validado.");
}

bootstrap();
