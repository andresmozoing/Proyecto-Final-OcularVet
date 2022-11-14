
//Imports de Angular
import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
//Imports de Terceros
import { Subject } from 'rxjs';


//Permite customizar el recuso Paginator de Angular Material
@Injectable()
export class MyCustomPaginatorIntl implements MatPaginatorIntl {
  changes = new Subject<void>();


  firstPageLabel = $localize`Primera página`;
  itemsPerPageLabel = $localize`Items por página:`;
  lastPageLabel = $localize`Última página`;

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