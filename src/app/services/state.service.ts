import { BehaviorSubject, Observable, distinctUntilChanged, map } from 'rxjs';

export class StateService<T> {
  state$: BehaviorSubject<T>;
  get state(): T {
    return this.state$.getValue();
  }

  constructor(initialState: T) {
    this.state$ = new BehaviorSubject<T>(initialState);
  }

  protected select<K>(mapFn: (state: T) => K): Observable<K> {
    return this.state$.asObservable().pipe(
      map((state: T) => mapFn(state)),
      distinctUntilChanged()
    );
  }

  protected setState(newState: Partial<T>) {
    this.state$.next({
      ...this.state,
      ...newState,
    });
  }

  protected clearCurrentState(state: T): void {
    this.state$.next(state ? state : ({} as T));
  }
}
