import { Coche } from "./coche.class";

fdescribe('Pruebas sobre la clase Coche', () => {

  it('El vehiculo debe 4 ruedas', () => {
    const coche = new Coche('rojo');
    expect(coche.cantRuedas).toBe(4);
  });

  it('La caja de cambios no debe moverse si el embrage no esta presionado', () => {
    const coche = new Coche('rojo');
    coche.realizarCambio(1);
    expect(coche.posicionPalancaDeCambio).toBe(0);
  });

  it ('El arranque debe funcionar', async () => {
    const coche = new Coche('rojo');
    const spyOnEncenderMotor = spyOn(coche, 'encenderMotor')
    const spyOnQuitarFrenoDeManos = spyOn(coche, 'quitarFrenoDeManos')

    coche.arranque();

    expect(spyOnEncenderMotor).toHaveBeenCalled();
    expect(spyOnQuitarFrenoDeManos).toHaveBeenCalled();
  });
});
