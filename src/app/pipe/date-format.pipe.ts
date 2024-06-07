import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {
  transform(value: string | undefined): string {
    if (!value) {
      return '';
    }

    const date = new Date(value);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Los meses en JavaScript son 0-based
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }
}

@Pipe({
  name: 'dateFormat2'
})
export class DateFormatPipe2 implements PipeTransform {
  transform(value: string | undefined): string {
    if (!value) {
      return '';
    }

    const date = new Date(value);
    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1; // Los meses en JavaScript son 0-based
    const year = date.getUTCFullYear();

    return `${year}-${month}-${day}`;
  }
}

@Pipe({
  name: 'dateFormat3'
})
export class DateFormatPipe3 implements PipeTransform {
  transform(value: Date | undefined): string {
    if (!value) {
      return '';
    }

  
    const day = value.getUTCDate();
    const month = value.getUTCMonth() + 1; // Los meses en JavaScript son 0-based
    const year = value.getUTCFullYear();
    const hour = value.getHours()
    const min = value.getMinutes()
    const seg = value.getSeconds()

    return `${year}-${month}-${day} ${hour}:${min}:${seg}`;
  }
}
