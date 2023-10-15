export const getDate = (date: string) => {
    const day = new Date(date);
    const yyyy = day.getFullYear();
    let mm = day.getMonth() + 1; // Months start at 0!
    let dd = day.getDate();

    // if (dd < 10) dd = '0' + dd;
    // if (mm < 10) mm = '0' + mm;

    return mm + '/' + dd + '/' + yyyy;
}

export const getDateFull = (date: string) => {
    const day = new Date(date);
    const yyyy = day.getFullYear();
    let mm: any = day.getMonth() + 1; // Months start at 0!
    let dd: any = day.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    return dd + '/' + mm + '/' + yyyy;
}

export const getDateTime = (date: string) => {
    const day = new Date(date);
    const yyyy = day.getFullYear();
    let H: any = day.getHours();
    let m: any = day.getMinutes();
    let s: any = day.getSeconds();
    let mm: any = day.getMonth() + 1; // Months start at 0!
    let dd: any = day.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    if (H < 10) H = '0' + H;
    if (m < 10) m = '0' + m;
    if (s < 10) s = '0' + s;

    return dd + '/' + mm + '/' + yyyy + ' ' + H + ':' + m + ':' + s;
}