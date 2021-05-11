import { formatCurrency } from "@angular/common";
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'vndFormat' })
export class VndFormatPipe implements PipeTransform {
    transform(value: number) {
        return value === null || value === undefined ? '' : value.toLocaleString('vi-VN', {
            style: 'currency',
            currency: 'VND'
        })
    }
}