import { Component, Input } from '@angular/core';
import { config, interval, Subscription } from 'rxjs';
import { take, tap } from 'rxjs/operators';

@Component({
    selector: 'app-cards',
    templateUrl: './cards.component.html',
    styleUrls: ['./cards.component.sass']
})
export class CardsComponent {
    @Input() config: any;

    countdownTimer: number;
    countdownSubscribtion: Subscription;

    randomValues: number[] = [];
    map = new Map();

    card1: any;
    card2: any;
    bothCardIsClicked: boolean;

    selectedIndexes: boolean[];

    ngOnInit() {
        this.startGame();
    }

    startGame() {
        this.startCountdown();
        let i = 0;
        let tmpArr = [];
        this.randomValues = [];

        // Randomize initial array values
        while (i < this.config.numPair) {
            const random = 1 + Math.floor(Math.random() * this.config.numPair * 2);
            tmpArr.push(random);
            i++;
        }

        // Create pair
        this.randomValues = this.randomValues.concat(tmpArr);
        this.randomValues = this.randomValues.concat(tmpArr);

        // Shuffle array
        this.randomValues = this.shuffleArray(this.randomValues.sort());

        this.selectedIndexes = new Array(this.randomValues.length);
        this.selectedIndexes.fill(false);
    }

    startCountdown() {
        const source = interval(1000).pipe(
            take(this.config.timeOut),
            tap(next => {
                this.countdownTimer = this.config.timeOut - next - 1;
                if (this.countdownTimer === 0 || this.randomValues.length === 0) {
                    this.countdownSubscribtion.unsubscribe();
                }
            })
        );
        this.countdownSubscribtion = source.subscribe();
    }

    shuffleArray(arr: number[]) {
        for (let i = 0; i < arr.length; i++) {
            const randomIndex = Math.floor(Math.random() * arr.length);
            let tmp = arr[i];
            arr[i] = arr[randomIndex];
            arr[randomIndex] = tmp;
        }
        return arr;
    }

    cardClicked(value: any) {

        this.selectedIndexes[value.index] = !this.selectedIndexes[value.index];

        if (value.clicked !== true || this.bothCardIsClicked) {
            return;
        }

        if (!this.card1) {
            this.card1 = value;
        } else if (!this.card2 && value.index !== this.card1.index) {
            this.card2 = value;
        }

        if (this.card1 && this.card2) {
            this.bothCardIsClicked = true;
            setTimeout(() => {
                if (this.card1.value === this.card2.value) {
                    let arr = [];
                    for (let i = 0; i < this.randomValues.length; i++) {
                        if (i === this.card1.index || i === this.card2.index) {
                            continue;
                        }
                        arr.push(this.randomValues[i]);
                    }
                    this.randomValues = arr;
                }

                this.card1 = null;
                this.card2 = null;
                this.bothCardIsClicked = false;
                this.selectedIndexes.fill(false);
            }, this.config.hintTime * 1000);
        }

    }

    tryAgain() {
        this.startGame();
    }
}