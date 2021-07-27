import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './customInput.component.html',
  styleUrls: ['./customInput.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomInputComponent  {
  @Input() value: string;
  @Output() onValueChange = new EventEmitter<string>();

  onTextChange(str: string) {
    this.onValueChange.emit(str);
  }
}