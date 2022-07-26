import { Formatters, TimestampStylesString } from 'discord.js';

/**
 * Converts a JS Date number to Discord Timestamp Compatible
 * @param {number} date
 */
export default function toTimestamp(date: number, type?: TimestampStylesString): string {
    return Formatters.time(new Date(date), type);
}
