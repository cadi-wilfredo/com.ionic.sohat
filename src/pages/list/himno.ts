export interface IHimno {
    number: number;
    title: string;
    content?: string;
}

export class Himno {
    himnos: IHimno[] = [
        {
            number: 1, title: 'Danos tu Espíritu', content: `
Coro<br />
Danos Tu Esp&iacute;ritu, Padre danos Tu Esp&iacute;ritu.<br />
<br />
 1. Como un ni&ntilde;o que no puede hablar ni andar,<br />
no sabemos pedir ante el trono de gracia<br />
oh, danos Tu Esp&iacute;ritu.<br />
<br />
 2. Que t&uacute; seas conocido cual Padre de amor, <br />
en el mundo, debajo y tambi&eacute;n en el cielo<br />
oh, danos Tu Esp&iacute;ritu.<br />
<br />
 3. Que tu pueblo en Babel salga pronto de all&iacute;,<br />
y rehuya su vino y no sienta sus plagas<br />
oh, danos Tu Esp&iacute;ritu.<br />
<br />
 4. Que T&uacute; Iglesia se una en acci&oacute;n y pensar,<br />
y que llegue a ser uno en amor y sentir<br />
oh, danos Tu Esp&iacute;ritu.<br />
<br />
 5. Que la luz del cuarto &aacute;ngel brille por doquier, <br />
con la lluvia tard&iacute;a y la gloria divina<br />
oh, danos Tu Esp&iacute;ritu.<br />
<br />
Letra y m&uacute;sica: Czeslaw Kroczkek<br />
&copy; 2003, Sabbath Rest Advent Church`},
        { number: 2, title: 'Temed a Jehová' },
        { number: 3, title: 'Como el Ciervo al Agua' },
        { number: 4, title: 'Satanás el Destructor-Dios el Restaurador' },
        { number: 5, title: 'Alabad a Jehová' },
        { number: 6, title: 'Gloria divina' },
        { number: 7, title: 'Fiel es Dios' },
        { number: 8, title: 'El efecto de la Justicia' },
        { number: 9, title: 'Mi Mundo Hoy Dejo Atrás' },
        { number: 10, title: 'Te Exaltaré' },
        { number: 11, title: 'Odio al Pecado' },
        { number: 12, title: 'Pide y Se Os Dará' },
        { number: 13, title: 'Ninguna Condenación' },
        { number: 14, title: 'Por Gracia Sois Salvos' },
        { number: 15, title: 'Un Lugar de Oración' },
        { number: 16, title: 'Bienaventurado el varón' },
        { number: 17, title: 'Buscad las Cosas de Arriba' },
        { number: 18, title: 'Tanto Amó al Mundo Dios' },
        { number: 19, title: 'La invitación' },
        { number: 20, title: 'Vasos de Barro' },
        { number: 21, title: 'La Palabra del Testigo Fiel' },
        { number: 22, title: 'Babel Ha Caído' },
        { number: 23, title: 'Venid a Mí' },
        { number: 24, title: 'A trabajar' },
        { number: 25, title: 'Haya en Vosotros Este Sentir' },
        { number: 26, title: 'No se Turbe Vuestro Corazón' },
        { number: 27, title: 'La Voz de la Naturaleza' },
        { number: 28, title: 'Mi Esposa Ibas a Ser' },
        { number: 29, title: 'Petición Esperada' },
        { number: 30, title: 'Si Alguno Quiere Venir' },
        { number: 31, title: 'Un Espíritu Afable' },
        { number: 32, title: 'Oh Pastor de Israel Escucha' },
        { number: 33, title: 'El Evangelio es Poder' },
        { number: 34, title: 'Dos Caminos' },
        { number: 35, title: 'Mi Decisión' },
        { number: 36, title: 'El Tiene Cuidado de Vosotros' },
        { number: 37, title: 'Nueva Criatura es' },
        { number: 38, title: 'La Paciencia de los Santos' },
        { number: 39, title: 'El Señor es Nuestra Paz' },
        { number: 40, title: 'Clamé a Ti, Oh Jehová' },
        { number: 41, title: 'Someteos, pues, a Dios' },
        { number: 42, title: 'Derribando Argumentos' },
        { number: 43, title: 'La Paz os Dejo' },
        { number: 80, title: 'Santo, Santo, Santo' },
        { number: 81, title: 'De mañana me presentaré' }
    ];

    public get Himnos(): IHimno[] {
        return this.himnos;
    }

}