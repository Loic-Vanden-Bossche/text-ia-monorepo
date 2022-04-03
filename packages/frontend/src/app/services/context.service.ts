import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Context, ContextGroup} from "../../../lib/context";
import {map, Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ContextService {
  constructor(private http: HttpClient) {}

  formatToGroups(groupedContexts: { [type: string]: Context[]}): ContextGroup[] {
    let  groups: ContextGroup[] = [];
    for (const type in groupedContexts) {
      if (groupedContexts.hasOwnProperty(type)) {
        groups = [...groups, {
          name: type,
          contexts: groupedContexts[type]
        }];
      }
    }
    return groups;
  }

  getGroupedContexts(): Observable<ContextGroup[]> {
    return this.http.get<{ [type: string]: Context[]}>(`${environment.apiUrl}/contexts`).pipe(map(data => this.formatToGroups(data)));
  }

}
