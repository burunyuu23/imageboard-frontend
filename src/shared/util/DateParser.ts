function padZero(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
}

export function DateParse(timestamp: number, format: string) {
    const date = new Date(timestamp);

    const day = padZero(date.getDate());
    const month = padZero(date.getMonth() + 1);
    const yyyy = date.getFullYear().toString();
    const yy = date.getFullYear().toString().slice(2);
    const hours = padZero(date.getHours());
    const minutes = padZero(date.getMinutes());
    const seconds = padZero(date.getSeconds());

    const formatOptions = {
        dd: day,
        mm: month,
        yyyy: yyyy,
        yy: yy,
        HH: hours,
        MM: minutes,
        SS: seconds,
    };

    return format.replace(/(dd|mm|yyyy|yy|HH|MM|SS)/g, (match) => formatOptions[match as keyof typeof formatOptions]);
}