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
        if ( guerreiro.estaEliminado() ) {
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

    constructor(id: number, localizacaoX: number,  localizacaoY: number) {
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

    avaliar(time01: Array<Defensivel>, time02: Array<Defensivel>): string {
        time01.forEach(
            (defensivel) => {
                if ( !defensivel.estaEliminado() ) {
                    if ( defensivel instanceof Guerreiro ) {
                        this.scoreTime01 += defensivel.getLife()
                        this.qtdGuerreiroTime01 += 1;
                    }
                    if (defensivel instanceof BaseMilitar ) {
                        this.scoreTime01 += Math.ceil(defensivel.getPercentualDano() / 10)
                    }
                    throw new PersonagemInvalidoException('Você possui um personagem inválido.')
                }
            }
        )
        time02.forEach(
            (defensivel) => {
                if ( !defensivel.estaEliminado() ) {
                    if ( defensivel instanceof Guerreiro ) {
                        this.scoreTime02 += defensivel.getLife()
                        this.qtdGuerreiroTime02 += 1;
                    }
                    if (defensivel instanceof BaseMilitar ) {
                        this.scoreTime02 += Math.ceil(defensivel.getPercentualDano() / 10)
                    }
                    throw new PersonagemInvalidoException('Você possui um personagem inválido.')
                }
            }
        )
        if ( this.scoreTime01 === this.scoreTime02 ) {
            if (this.qtdGuerreiroTime01 > this.qtdGuerreiroTime02) {
                return `O time 01 venceu com ${this.qtdGuerreiroTime01} guerreiros e ${this.scoreTime01} de score no final da batalha.`
            } else {
                return `O time 02 venceu com ${this.qtdGuerreiroTime02} guerreiros e ${this.scoreTime02} de score no final da batalha.`
            }
        }
        if ( this.scoreTime01 > this.scoreTime02 ) {
            return `O time 01 venceu com ${this.qtdGuerreiroTime01} guerreiros e ${this.scoreTime01} de score no final da batalha.`
        }
        return `O time 02 venceu com ${this.qtdGuerreiroTime02} guerreiros e ${this.scoreTime02} de score no final da batalha.`
    }
}

class Questao08 {

    batalhaDeMarineford(): void {
        let luffy: Guerreiro = new Guerreiro(1, 'Luffy do chapeu de palha', 7)
        let jinbe: Guerreiro = new Guerreiro(2, 'Jinbe o cavaleiro do mar', 7)
        let barbaBranca: Guerreiro = new Guerreiro(3, 'Eu sou o barba branca caralho', 10)
        let buggy: Guerreiro = new Guerreiro(3, 'Buggy o palhaço', 5)
        let navio01: BaseMilitar = new BaseMilitar(1, 0, 1)

        let barbaNegra: Guerreiro = new Guerreiro(1, 'Luffy do chapeu de palha', 9)
        let sonGoku: Guerreiro = new Guerreiro(2, 'Jinbe o cavaleiro do mar', 10)
        let akainu: Guerreiro = new Guerreiro(3, 'Eu sou o barba branca caralho', 10)
        let aokig: Guerreiro = new Guerreiro(3, 'Buggy o palhaço', 10)
        let soldado: Guerreiro = new Guerreiro(1, 'Luffy do chapeu de palha', 4)
        let gigante: Guerreiro = new Guerreiro(2, 'Jinbe o cavaleiro do mar', 7)
        let portao01: BaseMilitar = new BaseMilitar(1, 1, 2)
        let portao02: BaseMilitar = new BaseMilitar(2, 2, 3)
        let praca: BaseMilitar = new BaseMilitar(3, 3, 4)

        let time01: Array<Defensivel> = [luffy, jinbe, barbaBranca, buggy, navio01];
        let time02: Array<Defensivel> = [barbaNegra, sonGoku, akainu, aokig, soldado, gigante, portao01, portao02, praca];

        let cenario: CenarioDeBatalha = new CenarioDeBatalha()
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
            akainu.atacar(barbaBranca)
            console.log(cenario.avaliar(time01, time02))
        } catch(e: any) {
            if ( e instanceof JaEliminadoException ) {
                console.log(e.message)
            }
            if ( e instanceof PersonagemInvalidoException ) {
                console.log(e.message)
            }
            if ( e instanceof AplicacaoError ) {
                console.log('Procure o administrador.')
            }
        }
        
    }
}