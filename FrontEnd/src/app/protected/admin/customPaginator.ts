
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';

@Injectable()
export class MyCustomPaginatorIntl implements MatPaginatorIntl {
  changes = new Subject<void>();

  // For internationalization, the `$localize` function from
  // the `@angular/localize` package can be used.
  firstPageLabel = $localize`Primera página`;
  itemsPerPageLabel = $localize`Items por página:`;
  lastPageLabel = $localize`Última página`;

  // You can set labels to an arbitrary string too, or dynamically compute
  // it through other third-paty internationalization libraries.
  nextPageLabel = 'Siguiente página';
  previousPageLabel = 'Página anterior';

  getRangeLabel(page: number, pageSize: number, length: number): string {
    if (length === 0) {
      return $localize`Página 1 of 1`;
    }
    const amountPages = Math.ceil(length / pageSize);
    return $localize`Página ${page + 1} de ${amountPages}`;
  }
}