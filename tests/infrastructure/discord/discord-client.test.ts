import { GatewayIntentBits } from "discord.js";
import { describe, it, expect } from "vitest";

import { createDiscordClient } from "../../../src/infrastructure/discord/discord-client.js";

describe("createDiscordClient", () => {
  it("should create a Discord client with the Guild intent", () => {
    const client = createDiscordClient();

    expect(client.options.intents.has(GatewayIntentBits.Guilds)).toBe(true);
  });

  it("shoulnd not enable privileged intents by default", () => {
    const client = createDiscordClient();

    expect(client.options.intents.has(GatewayIntentBits.GuildMembers)).toBe(false);
    expect(client.options.intents.has(GatewayIntentBits.GuildPresences)).toBe(false);
    expect(client.options.intents.has(GatewayIntentBits.MessageContent)).toBe(false);
  });
});
