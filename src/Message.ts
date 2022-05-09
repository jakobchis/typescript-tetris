class Message {
  text;
  age: number;

  constructor(text: string) {
    this.text = text;
    this.age = 0;
  }

  draw(context: CanvasRenderingContext2D, offset: number) {
    context.font = "20px Comic Sans MS";
    context.fillStyle = "White";
    context.fillText(this.text, 10, offset * 25, 300);
  }
}

export { Message };
