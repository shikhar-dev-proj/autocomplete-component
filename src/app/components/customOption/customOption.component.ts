import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-option',
  templateUrl: './customOption.component.html',
  styleUrls: ['./customOption.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomOptionComponent {
  @Input() label: string;
  @Input() index: number;
  @Input() selected: boolean;
  @Input() focused: boolean;
  @Input() actionText: string;
  @Output() onAction = new EventEmitter<void>();
  @Output() onSelection = new EventEmitter<void>();


  onActionClick(event: Event) {
    event.stopPropagation();
    this.onAction.emit();
  }

  onSelectionChange() {
    this.onSelection.emit();
  }
}