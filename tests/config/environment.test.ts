import { afterEach, describe, expect, it } from "vitest";

import { loadEnvironment } from "../../src/config/environment.js";

const originalEnvironment = { ...process.env };

afterEach(() => {
  process.env = { ...originalEnvironment };
});

describe("loadEnvironment", () => {
  it("should load all required environment variables", () => {
    process.env.DISCORD_TOKEN = "test-token";
    process.env.DISCORD_CLIENT_ID = "123456789012345678";
    process.env.DISCORD_GUILD_ID = "987654321098765432";

    const environment = loadEnvironment();

    expect(environment).toEqual({
      discordToken: "test-token",
      discordClientId: "123456789012345678",
      discordGuildId: "987654321098765432",
    });
  });

  it("should trim whitespace from environment variable values", () => {
    process.env.DISCORD_TOKEN = " test-token ";
    process.env.DISCORD_CLIENT_ID = " 123456789012345678 ";
    process.env.DISCORD_GUILD_ID = " 987654321098765432 ";

    const environment = loadEnvironment();

    expect(environment).toEqual({
      discordToken: "test-token",
      discordClientId: "123456789012345678",
      discordGuildId: "987654321098765432",
    });
  });

  it("should throw an error when a required environment variable is missing", () => {
    delete process.env.DISCORD_TOKEN;

    process.env.DISCORD_CLIENT_ID = "123456789012345678";
    process.env.DISCORD_GUILD_ID = "987654321098765432";

    expect(() => loadEnvironment()).toThrow(
      "The required environment variable DISCORD_TOKEN has not been set",
    );
  });

  it("should throw an error when a required environment variable contains only whitespace", () => {
    process.env.DISCORD_TOKEN = "   ";
    process.env.DISCORD_CLIENT_ID = "123456789012345678";
    process.env.DISCORD_GUILD_ID = "987654321098765432";

    expect(() => loadEnvironment()).toThrow(
      "The required environment variable DISCORD_TOKEN has not been set",
    );
  });
});