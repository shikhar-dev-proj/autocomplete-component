import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-option',
  templateUrl: './customOption.component.html',
  styleUrls: ['./customOption.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomOptionComponent {
  @Input() label: string;
  @Input() selected: boolean;
  @Input() focused: boolean;
  @Input() actionText: string;
  @Output() onAction = new EventEmitter<void>();
  @Output() onSelection = new EventEmitter<void>();


  onActionClick(event: Event) {
    console.log('action clicked');
    event.stopPropagation();
    this.onAction.emit();
  }

  onSelectionChange() {
    console.log('selection change');
    this.onSelection.emit();
  }
}