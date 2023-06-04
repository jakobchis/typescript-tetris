class Score {
  date: string;
  value: number;

  constructor() {
    this.date = new Date().toLocaleDateString('en-ca');
    this.value = 0;
  }

  increment() {
    this.value += 1;
  }
}

export { Score };
