import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AutoCompleteComponent implements OnInit, OnChanges {
  @Input() options: string[];
  @Input() debounceTime: number = 400;
  @Output() onSearchTextChange = new EventEmitter<string>();
  @Output() onOptionAction = new EventEmitter<string>();
  @Output() onOptionSelection = new EventEmitter<string>();

  searchText = '';
  searchTextSub$ = new Subject<string>();
  unsubscribe$ = new Subject<void>();
  selectedOption: string;
  focusedOption: string;
  loading = false;
  collapseOptionPanel = false;

  ngOnInit() {
    this.searchTextSub$.pipe(
      debounceTime(this.debounceTime),
      // tap(() => { this.loading = true; }),
      takeUntil(this.unsubscribe$)
    ).subscribe(() => {
      this.onSearchTextChange.emit(this.searchText);
    });
  }

  ngOnChanges() {
    if (this.options) {
      this.loading = false;
    }
  }

  handleOptionAction(option: string) {
    this.onOptionAction.emit(option);
  }

  handleOptionSelection(option: string) {
    this.onOptionSelection.emit(option);
  }

  handlSearchTextChange(searchText: string) {
    this.searchText = searchText;
    if (!!searchText) {
      this.loading = true;
      console.log('search ... : ', this.searchText);
      this.searchTextSub$.next(this.searchText);
    }
  }



}