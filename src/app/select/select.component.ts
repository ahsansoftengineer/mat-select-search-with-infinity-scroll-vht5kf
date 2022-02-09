import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, Subscription } from 'rxjs';
import { scan } from 'rxjs/operators';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css'],
})
export class SelectComponent implements OnInit {
  ctrl: FormControl = new FormControl();
  searchCtrl: FormControl = new FormControl();
  subscriptions: Subscription[] = [];
  _options = new BehaviorSubject([]);
  options$ = this._options.asObservable().pipe(
    scan((acc, curr) => {
      if (!acc || !curr) return [];
      return [...acc, ...curr];
    }, [])
  );
  offset = 0;
  limit = 10;
  data = [];
  // From Parent Component
  myarray = Array.from({ length: 100 }).map((_, i) => `Option ${i}`);
  private _data = new BehaviorSubject<any[]>(this.myarray);
  data$ = this._data.asObservable();
  constructor() {}
  ngOnInit() {
    this.subscriptions.push(
      this.data$.subscribe({
        next: (data) => {
          console.log('Ingested data changed');
          this.data = data;
          this.offset = 0;
          this._options.next(null);
          this.getNextBatch();
        },
      })
    );
    this.subscriptions.push(
      this.searchCtrl.valueChanges.subscribe((val) => this.searchChanged(val))
    );

    this.subscriptions.push(
      this.options$.subscribe((val) =>
        console.log(`New view array contains ${val.length} items`)
      )
    );
  }
  getNextBatch(): void {
    const results = this.data.slice(this.offset, this.offset + this.limit);
    this._options.next(results);
    this.offset += this.limit;
  }
  searchChanged(e) {
    console.log(`Search by: ${e}`);
    let val = e ? e.trim() : null;
    if (!val) {
      this._data.next(this.myarray);
      return;
    } else {
      val = val.toLowerCase();
    }
    this._data.next(this.getAllThatContain(val));
  }

  getAllThatContain(val: string): string[] {
    return this.myarray.filter(
      (i) => i.toLowerCase().indexOf(val.toLowerCase()) > -1
    );
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
