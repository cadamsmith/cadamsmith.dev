import { Direction } from "./Direction";

export class TwentyFortyEight {
    board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];

    hasWon = false;

    winValue = 2048;

    public init() : string {
        this.reset();
        this.initialSeed();

        return this.toString();
	}

    public shift(direction: Direction): string {
        for (let i = 0; i < 4; i++) {
            this.shiftColumn(i, direction);
            this.shiftRow(i, direction);
        }

        // every move, a random available cell is filled (if any cells are available)
        const [x, y] = this.getRandomAvailableSpace();
        if (x !== -1) {
            // 10% chance of spawning a 4
            // 90% chance of spawning a 2
            const isFour = Math.random() < 0.1;
            const cellValue = isFour ? 4 : 2;

            this.setSpace([x, y], cellValue);
        }

        return this.toString();
    }

    shiftRow(row: number, direction: Direction) {
        if (direction === Direction.Up || direction === Direction.Down) {
            return;
        }

        // filter out zeroes
        let values = this.board[row].filter(n => n !== 0);

        if (direction === Direction.Right) {
            values = values.reverse();
        }

        // combine adjacent equal values
        for (let i = 0; i < values.length - 1; i++) {
            if (values[i] === values[i + 1]) {
                const sum = values[i] * 2;
                if (sum >= this.winValue) {
                    this.hasWon = true;
                }

                values[i] = sum;
                values[i + 1] = 0;
            }
        }

        // Filter out zeros again after combining
        values = values.filter(n => n !== 0);

        // Add zeros to the end to maintain the row length of 4
        while (values.length < 4) {
            values.push(0);
        }

        // Reverse the values if the direction is right
        if (direction === Direction.Right) {
            values = values.reverse();
        }

        this.board[row] = values;
    }

    shiftColumn(col: number, direction: Direction) {
        if (direction === Direction.Left || direction === Direction.Right) {
            return;
        }

        let values: number[] = [];

        for (let row = 0; row < 4; row++) {
            values.push(this.board[row][col])
        }

        if (direction === Direction.Down) {
            values = values.reverse();
        }

        // combine adjacent equal values
        for (let i = 0; i < values.length - 1; i++) {
            if (values[i] === values[i + 1]) {
                const sum = values[i] * 2;
                if (sum >= this.winValue) {
                    this.hasWon = true;
                }

                values[i] = sum;
                values[i + 1] = 0;
            }
        }

        // Filter out zeros after combining
        values = values.filter(n => n !== 0);

        // Add zeros to the end to maintain the row length of 4
        while (values.length < 4) {
            values.push(0);
        }

        if (direction === Direction.Down) {
            values = values.reverse();
        }

        for (let row = 0; row < 4; row++) {
            this.board[row][col] = values[row];
        }
    }

    public toString(): string {
        return this.board.map(
                row => row.map(n => this.prettyPrintValue(n)).join(' | ')
            )
            .join('\n\n---------------------------------\n\n');
    }

    prettyPrintValue(value: number): string {
        const stringValue = ` ${value.toString().padStart(4, ' ')} `;

        return `<span class=\"game-cell game-cell-${value}\">${stringValue}</span>`;
    }

    reset() {
        this.hasWon = false;

        for (let row = 0; row < this.board.length; row++) {
            for (let col = 0; col < this.board[row].length; col++) {
                this.board[row][col] = 0;
            }
        }
    }

    initialSeed() {
        // initial seed: put a 2 in 2 random spots on the board
        const [x1, y1] = this.getRandomAvailableSpace();

        let x2, y2;
        do {
            [x2, y2] = this.getRandomAvailableSpace();
        }
        while (x1 === x2 && y1 === y2);

        this.setSpace([x1, y1], 2);
        this.setSpace([x2, y2], 2);
    }

    setSpace([x, y]: [number, number], value: number) {
        this.board[x][y] = value;
    }

    getRandomAvailableSpace(): [number, number] {
        const availableSpaces = this.getAvailableSpaces();
        if (availableSpaces.length === 0) {
            return [-1, -1];
        }

        const randomIndex = Math.floor(Math.random() * availableSpaces.length);
        return availableSpaces[randomIndex];
    }

    getAvailableSpaces(): [number, number][] {
        const available: [number, number][] = [];
    
        for (let row = 0; row < this.board.length; row++) {
            for (let col = 0; col < this.board[row].length; col++) {
                if (this.board[row][col] === 0) {
                    available.push([row, col]);
                }
            }
        }
        
        return available;
    }
}