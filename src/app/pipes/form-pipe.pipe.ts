import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Pipe({
    name: 'castForm',
})
export class FormPipePipe implements PipeTransform {
    // cast AbstractControl to FormControl
    //Type 'AbstractControl<any, any>' is missing the following properties from type 'FormControl<any>': defaultValue, registerOnChange, registerOnDisabledChange
    transform(value: AbstractControl): FormControl<typeof value['value']> {
        return value as FormControl<typeof value['value']>;
    }
}
