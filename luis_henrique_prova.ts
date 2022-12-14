class AplicacaoError extends Error {
    constructor(mensagem: string) {
        super(mensagem);
    }
}

class JaEliminadoException extends AplicacaoError {
    constructor(mensagem: string) {
        super(mensagem);
    }
}

class PersonagemInvalidoException extends AplicacaoError {
    constructor(mensagem: string) {
        super(mensagem);
    }
}

interface Defensivel {
    estaEliminado(): boolean;
    defenderAtaque(valorAtaque: number): void;
}

class Guerreiro implements Defensivel {
    private id: number;
    private descricao: string;
    private forcaAtaque: number;
    private life: number = 10;

    constructor(id: number, descricao: string, forcaAtaque: number) {
        this.id = id;
        this.descricao = descricao;
        this.forcaAtaque = forcaAtaque;
    }

    getLife(): number {
        return this.life
    }

    estaEliminado() {
        return this.life <= 0;
    }

    defenderAtaque(valorAtaque: number) {
        this.life -= valorAtaque
    }

    atacar(guerreiro: Defensivel): void {
        if (guerreiro.estaEliminado()) {
            throw new JaEliminadoException('Esse oponente já está eliminado.')
        }
        guerreiro.defenderAtaque(this.forcaAtaque)
    }


}

class BaseMilitar implements Defensivel {
    private id: number;
    private localizacaoX: number;
    private localizacaoY: number;
    private percentualDano: number = 0;

    constructor(id: number, localizacaoX: number, localizacaoY: number) {
        this.id = id;
        this.localizacaoX = localizacaoX;
        this.localizacaoY = localizacaoY;
    }

    getPercentualDano(): number {
        return this.percentualDano
    }

    estaEliminado() {
        return this.percentualDano >= 90;
    }

    defenderAtaque(valorAtaque: number) {
        this.percentualDano += valorAtaque
    }
}

class CenarioDeBatalha {
    /* 
    O time que obtiver menor soma de pontos dos Defensivel não eliminados
    A base vai ter seu (percentualDano / 10) antes da soma para que seja equivalente ao life do soldado.
    Obs: o soldado vai ficar valendo 10% a mais que a  Base #VidaHumanasImporta
    */

    private scoreTime01: number = 0;
    private scoreTime02: number = 0;
    private qtdGuerreiroTime01: number = 0;
    private qtdGuerreiroTime02: number = 0;

    avaliar(time01: Array<Guerreiro | BaseMilitar>, time02: Array<Guerreiro | BaseMilitar>): string {
        time01.forEach(
            (defensivel) => {
                if (!defensivel.estaEliminado()) {
                    if (defensivel instanceof Guerreiro) {
                        this.scoreTime01 += defensivel.getLife()
                        this.qtdGuerreiroTime01 += 1;
                        return
                    }
                    if (defensivel instanceof BaseMilitar) {
                        this.scoreTime01 += Math.ceil(defensivel.getPercentualDano() / 10)
                        return
                    }
                    throw new PersonagemInvalidoException('Você possui um personagem inválido.')
                }
            }
        )
        time02.forEach(
            (defensivel) => {
                if (!defensivel.estaEliminado()) {
                    if (defensivel instanceof Guerreiro) {
                        this.scoreTime02 += defensivel.getLife()
                        this.qtdGuerreiroTime02 += 1;
                        return
                    }
                    if (defensivel instanceof BaseMilitar) {
                        this.scoreTime02 += Math.ceil(defensivel.getPercentualDano() / 10)
                        return
                    }
                    throw new PersonagemInvalidoException('Você possui um personagem inválido.')
                }
            }
        )
        if (this.scoreTime01 === this.scoreTime02) {
            if (this.qtdGuerreiroTime01 > this.qtdGuerreiroTime02) {
                return `O time 01 venceu com ${this.qtdGuerreiroTime01} guerreiros e ${this.scoreTime01} de score no final da batalha.`
            }
            return `O time 02 venceu com ${this.qtdGuerreiroTime02} guerreiros e ${this.scoreTime02} de score no final da batalha.`

        }
        if (this.scoreTime01 > this.scoreTime02) {
            return `O time 01 venceu com ${this.qtdGuerreiroTime01} guerreiros e ${this.scoreTime01} de score no final da batalha.`
        }
        return `O time 02 venceu com ${this.qtdGuerreiroTime02} guerreiros e ${this.scoreTime02} de score no final da batalha.`
    }
}

class Questao08 {

    batalhaDeMarineford(): void {
        var luffy: Guerreiro = new Guerreiro(1, 'Luffy do chapeu de palha', 7)
        var jinbe: Guerreiro = new Guerreiro(2, 'Jinbe o cavaleiro do mar', 7)
        var barbaBranca: Guerreiro = new Guerreiro(3, 'Eu sou o barba branca caralho', 10)
        var buggy: Guerreiro = new Guerreiro(3, 'Buggy o palhaço', 5)
        var navio01: BaseMilitar = new BaseMilitar(1, 0, 1)

        var barbaNegra: Guerreiro = new Guerreiro(1, 'Luffy do chapeu de palha', 9)
        var sonGoku: Guerreiro = new Guerreiro(2, 'Jinbe o cavaleiro do mar', 10)
        var akainu: Guerreiro = new Guerreiro(3, 'Eu sou o barba branca caralho', 10)
        var aokig: Guerreiro = new Guerreiro(3, 'Buggy o palhaço', 10)
        var soldado: Guerreiro = new Guerreiro(1, 'Luffy do chapeu de palha', 4)
        var gigante: Guerreiro = new Guerreiro(2, 'Jinbe o cavaleiro do mar', 7)
        var portao01: BaseMilitar = new BaseMilitar(1, 1, 2)
        var portao02: BaseMilitar = new BaseMilitar(2, 2, 3)
        var praca: BaseMilitar = new BaseMilitar(3, 3, 4)

        var time01: Array<Guerreiro | BaseMilitar> = [luffy, jinbe, barbaBranca, buggy, navio01];
        var time02: Array<Guerreiro | BaseMilitar> = [barbaNegra, sonGoku, akainu, aokig, soldado, gigante, portao01, portao02, praca];

        var cenario: CenarioDeBatalha = new CenarioDeBatalha()
        try {
            luffy.atacar(gigante)
            jinbe.atacar(soldado)
            akainu.atacar(luffy)
            barbaBranca.atacar(portao01)
            barbaBranca.atacar(portao01)
            barbaBranca.atacar(portao01)
            barbaBranca.atacar(portao01)

            barbaBranca.atacar(portao02)
            barbaBranca.atacar(portao02)
            barbaBranca.atacar(portao02)

            akainu.atacar(navio01)
            akainu.atacar(navio01)
            akainu.atacar(barbaBranca)
            console.log(cenario.avaliar(time01, time02))
        } catch (e: any) {
            if (e instanceof JaEliminadoException) {
                console.log(e.message)
            }
            if (e instanceof PersonagemInvalidoException) {
                console.log(e.message)
            }
            if (e instanceof AplicacaoError) {
                console.log('Procure o administrador.')
            }
        }

    }
}

let teste: Questao08 = new Questao08();
teste.batalhaDeMarineford();