class Score {
  date: Date;
  value: number;

  constructor() {
    this.date = new Date();
    this.value = 0;
  }

  increment() {
    this.value += 1;
  }
}

export { Score };
