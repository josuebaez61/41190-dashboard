export class Coche {
  cantRuedas = 4;
  color: string;
  gasolina = 100; // %
  velocidad = 0; // km
  posicionPalancaDeCambio = 0; // 0 1 2 3 4 5 6
  frenoDeMano = true;
  motorEncendido = false;
  embraguePresionado = false;

  constructor(color: string) {
    this.color = color;
  }

  arranque() {
    this.encenderMotor();
    this.quitarFrenoDeManos();
    this.presionarEmbrage();
    this.realizarCambio(1);
    this.soltarEmbrage();
    this.acelerar(30);
  }

  quitarFrenoDeManos(): void {
    this.frenoDeMano = false;
  }

  encenderMotor(): void {
    this.motorEncendido = true;
  }

  presionarEmbrage(): void {
    this.embraguePresionado = true;
  }

  soltarEmbrage(): void {
    this.embraguePresionado = false;
  }

  realizarCambio(c: number) {
    if (this.embraguePresionado) {
      this.posicionPalancaDeCambio = c;
    }
  }


  acelerar(vel: number): void {
    this.velocidad = vel;
  }
}
