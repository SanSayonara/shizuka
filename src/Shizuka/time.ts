import TimerConfig from '../Interfaces/TimerConfig';

class Time {
    public timezone: number;

    constructor(timezone: number) {
        this.timezone = timezone;
    }

    public getTime(): Date {
        const localDate = new Date();

        const UTC = localDate.getTime() + (localDate.getTimezoneOffset() * 60000);

        const OffSetDate = new Date(UTC + (3600000 * this.timezone));

        return OffSetDate;
    }

    public getFutureDate(hours: number, minutes = 0): Date {
        const futureDate = this.getTime();

        futureDate.setHours(futureDate.getHours() + hours);
        futureDate.setMinutes(minutes);
        futureDate.setSeconds(0);
        futureDate.setMilliseconds(0);

        return futureDate;
    }

    public absoluteTimeToMs(timeSuffix: string, timeNumber: number): number {
        let milliseconds: number = 0;

        if (timeSuffix === 'h') {
            const oneHourFutureDate = this.getFutureDate(timeNumber);

            const nowDate = this.getTime();

            milliseconds = oneHourFutureDate.getTime() - nowDate.getTime();
        }

        if (timeSuffix === 'm') {
            let minutesFutureDate = this.getFutureDate(0, timeNumber);

            let nowDate = this.getTime();

            milliseconds = minutesFutureDate.getTime() - nowDate.getTime();

            if (milliseconds > 10) {
                minutesFutureDate = this.getFutureDate(1, timeNumber);

                nowDate = this.getTime();

                milliseconds = minutesFutureDate.getTime() - nowDate.getTime();
            }
        }

        return milliseconds;
    }

    public relativeTimeMs(timeSuffix: string, timeNumber: number): number {
        let milliseconds: number = 0;

        switch (timeSuffix) {
            case 'h':
                milliseconds = timeNumber * 60 * 60 * 1000;
                break;
            case 'm':
                milliseconds = timeNumber * 60 * 1000;
                break;
            case 's':
                milliseconds = timeNumber * 1000;
                break;
        }

        return milliseconds;
    }

    public convertToMs(timerObject: TimerConfig): number {
        let { time, isAbsolute } = timerObject;
        const timeSuffix = time.slice(-1);
        const timeNumber = Number(time.slice(0, time.length - 1));
        let milliseconds: number = timeNumber;

        if (Number.isNaN(timeNumber)) {
            throw new Error("Time is not a number");
        }

        if (timeSuffix !== 'h' && timeSuffix !== 'm') {
            isAbsolute = false;
        }

        if (isAbsolute) {
            milliseconds = this.absoluteTimeToMs(timeSuffix, timeNumber);
        } else {
            milliseconds = this.relativeTimeMs(timeSuffix, timeNumber);
        }

        return milliseconds;
    }
}

export default Time;