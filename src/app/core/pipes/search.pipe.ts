import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  standalone: true,
})
export class SearchPipe implements PipeTransform {
  transform(ArrayOfObj: any[], term: string): any[] {
    return ArrayOfObj.filter((item) => item.title.toLowerCase().includes(term.toLowerCase()));
  }
}
