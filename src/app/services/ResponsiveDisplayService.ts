import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { inject, Injectable } from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ResponsiveDisplayService {
  private breakpointObserver: BreakpointObserver = inject(BreakpointObserver);
  isMobile(): Observable<boolean> {
    return this.breakpointObserver.observe(Breakpoints.Handset)
      .pipe(
        map((breakpointState: BreakpointState) => breakpointState.matches),
        shareReplay()
      );
  }
}