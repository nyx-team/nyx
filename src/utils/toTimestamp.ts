/**
 * Converts a JS Date number to Discord Timestamp Compatible
 * @param {number} date
 */
export default function toTimestamp(date: number): number {
    return Math.floor(date / 1000);
}
