import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

export interface Option {
  label: string;
  selected: boolean;
}

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AutoCompleteComponent implements OnInit, OnChanges {
  @Input() options: Option[];
  @Input() debounceTime: number = 400;
  @Output() onSearchTextChange = new EventEmitter<string>();
  @Output() onOptionAction = new EventEmitter<string>();
  @Output() onOptionSelection = new EventEmitter<Option[]>();

  searchText = '';
  searchTextSub$ = new Subject<string>();
  unsubscribe$ = new Subject<void>();
  selectedOptions: Option[] = [];
  focusedOption: { option: Option, index: number };
  loading = false;
  collapseOptionPanel = false;

  ngOnInit() {
    this.searchTextSub$.pipe(
      debounceTime(this.debounceTime),
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

  @HostListener('document:mouseover', ['$event'])
  mouseover(event) {
    if (event.target.classList.contains('option-container')) {
      const optionId = event.target.id;
      const index = +optionId.slice(7); // trim option- and convert to string
      this.focusOptionAtIndex(index);
    }
  }

  @HostListener('window:keyup', ['$event'])
  keyboardEvent(event: KeyboardEvent) {
    if (event.code === 'ArrowUp') {
      if (!!this.focusedOption) {
        this.focusOptionAtIndex(this.focusedOption.index - 1);
      }
    }
    if (event.code === 'ArrowDown') {
      if (!this.focusedOption) {
        this.focusOptionAtIndex(0);
      } else {
        this.focusOptionAtIndex(this.focusedOption.index + 1);
      }
    }
    if (event.code === 'Enter') {
      this.handleOptionSelection(this.focusedOption.option);
    }
  }

  handleOptionAction(option: Option) {
    option.selected = false;
    this.selectedOptions = this.selectedOptions.filter(o => o.label !== option.label);
  }

  handleOptionSelection(option: Option) {
    if (!this.selectedOptions.find(o => o.label === option.label)) {
      this.selectedOptions.push(option);
      option.selected = true;
      this.onOptionSelection.emit(this.selectedOptions);
    }
  }

  focusOptionAtIndex(index: number) {
    this.focusedOption = { option: this.options[index], index };
  }

  handlSearchTextChange(searchText: string) {
    this.searchText = searchText;
    if (!!searchText) {
      this.loading = true;
      this.searchTextSub$.next(this.searchText);
    }
  }



}