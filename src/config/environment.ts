import "dotenv/config";

export interface Environment {
  discordToken: string;
  discordClientId: string;
  discordGuildId: string;
}

function readRequiredEnvironmentVariable(name: string): string {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`The required environment variable ${name} has not been set`);
  }

  return value;
}

export function loadEnvironment(): Environment {
  return {
    discordToken: readRequiredEnvironmentVariable("DISCORD_TOKEN"),
    discordClientId: readRequiredEnvironmentVariable("DISCORD_CLIENT_ID"),
    discordGuildId: readRequiredEnvironmentVariable("DISCORD_GUILD_ID"),
  };
}
