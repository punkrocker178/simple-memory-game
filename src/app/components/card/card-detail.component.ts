import { Component, EventEmitter, Input, Output, SimpleChange } from '@angular/core';

@Component({
    selector: 'app-card-detail',
    templateUrl: './card-detail.component.html',
    styleUrls: ['./card-detail.component.sass']
})
export class CardDetailComponent {

    @Input() index: number;
    @Input() value: number | string;
    @Input() isRevealed: boolean;

    @Output() clicked: EventEmitter<any> = new EventEmitter();

    reveal() {
        this.isRevealed = !this.isRevealed;
        this.clicked.emit({
            index: this.index,
            clicked: this.isRevealed,
            value: this.value
        });
    }
}
