import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LogicalfuntionService {
  constructor() {}

  public filteredArrayWithJsonValue(value, data) {
    let values;
    values = value.map((x) => x[data]);
    return values.filter((x, i, a) => a.indexOf(x) === i);
  }
}
