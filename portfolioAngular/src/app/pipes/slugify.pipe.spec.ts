import { Pipe, PipeTransform } from '@angular/core';


/* describe('SlugifyPipe', () => {
  it('create an instance', () => {
    const pipe = new SlugifyPipe();
    expect(pipe).toBeTruthy();
  });
}); */


@Pipe({
  name: 'slugify'
})
export class SlugifyPipe implements PipeTransform {
  transform(value: string): string {
    return value.toLowerCase().replace(/\s+/g, '-'); // Reemplaza espacios por guiones
  }
}
