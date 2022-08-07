import chalk from 'chalk';

export default class Logger {
  /**
   * Logger for Nyx.
   *
   * @param {string} name - The name of the Logger/Event
   */
  public constructor(public name: string) {
    this.name = name;
  }

  public getCurrentTime(): string {
    const date = new Date();
    return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  }

  public INFO(content: string): void {
    console.log(
      `${chalk.gray(this.getCurrentTime())} ${chalk.bgGreen(
        '[INFO]',
      )} [${chalk.bold(`${this.name}`)}]: ${content}`,
    );
  }

  public ERROR(err: string, shouldExit?: boolean): void {
    console.error(
      `${chalk.gray(this.getCurrentTime())} ${chalk.bgRed(
        '[ERROR]',
      )} [${chalk.bold(`${this.name}`)}]: ${err}`,
    );

    if (shouldExit) {
      console.error('Exiting with status 1.');
      process.exit(1);
    }
  }
}
