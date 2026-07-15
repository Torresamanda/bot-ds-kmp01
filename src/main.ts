import { Events } from "discord.js";
import { loadEnvironment } from "./config/environment.js";
import { createDiscordClient } from "./infrastructure/discord/discord-client.js";

async function bootstrap(): Promise<void> {
  const environment = loadEnvironment();
  const client = createDiscordClient();

  client.once(Events.ClientReady, (readyClient) => {
    console.log(`KMP-01: connected as ${readyClient.user.tag}`);
  });

  await client.login(environment.discordToken);
}

void bootstrap().catch((error: unknown) => {
  console.error("KMP-01 failed to start", error);
  process.exitCode = 1;
});
