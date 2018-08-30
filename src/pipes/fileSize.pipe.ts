import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'fileSize' })
export class FileSizePipe implements PipeTransform {
    constructor() { }
    transform(bytes: number): string {
        if (bytes) {
            if (bytes < 1024) {
                return bytes + ' B';
            } else if (bytes < 1048576) {
                return (bytes / 1024).toFixed(2) + ' KiB';
            } else if (bytes < 1073741824) {
                return (bytes / 1048576).toFixed(2) + ' MiB';
            } else if (bytes < 1099511627776) {
                return (bytes / 1073741824).toFixed(2) + ' GiB';
            } else if (bytes < 1125899906842624) {
                return (bytes / 1099511627776).toFixed(2) + ' TiB';
            } else if (bytes < 1152921504606846976) {
                return (bytes / 1125899906842624).toFixed(2) + ' PiB';
            } else if (bytes < 1180591620717411303424) {
                return (bytes / 1152921504606846976).toFixed(2) + ' EiB';
            } else if (bytes < 1208925819614629174706176) {
                return (bytes / 1180591620717411303424).toFixed(2) + ' ZiB';
            } else {
                return (bytes / 1208925819614629174706176).toFixed(2) + ' YiB';
            }
        }
    }
}