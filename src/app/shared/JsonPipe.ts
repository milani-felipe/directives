import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'prettyprint',
  standalone: true,
})
export class PrettyPrintPipe implements PipeTransform {
  transform(val: any) {
    if (!val) {
      return '';
    }

    let json = JSON.stringify(val, null, 2)
      .replaceAll(/(\s+)"(\w+)":/g, '<br/>$1"$2":')
      .replaceAll(/(\s*)}/g, '<br/>$1}')
      .replaceAll(' ', '&nbsp;')
      .replaceAll('[', '[ <br/>')
      .replaceAll('],', '<br/>&nbsp;&nbsp;],')
      .replaceAll('},', '},<br/>')
      .replaceAll('\n', '');
    return json;
  }
}
