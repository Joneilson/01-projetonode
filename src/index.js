const player1 = {
    NOME : "Mario",
    VELOCIDADE : 4,
    MANOBRABILIDADE: 3,
    PODER: 3,
    PONTOS: 0, 
};
const player2 = {
    NOME: "Bowser",
    VELOCIDADE: 5,
    MANOBRABILIDADE: 2,
    PODER: 5,
    PONTOS: 0,
};
async function roll_Dice(){
   return Math.floor(Math.random() * 6) + 1;
};
async function getRandomBlock() {
    let random = Math.random();
    let result

    switch(true){

        case random < 0.33:
            result = "RETA"
            break;
        case random < 0.66:
            result = "CURVA";
            break;
        default:
            result = "CONFRONTO";
    }

    return result;
    
};
async function logRollResult(characterName, block, diceResult, attribute) {
    console.log(`${characterName} 🎲  Rolou um dado de ${block} ${diceResult} + ${attribute} = ${diceResult + attribute}`);
};
async function play_Race_Engine(character1, character2) {
    for(let round = 1; round <= 10; round ++){
        console.log(`🏁 Rodada ${round}`);
        console.log();


        // Sortear Bloco

        let block = await getRandomBlock();
        console.log(`Bloco: ${block}`);

        // Rolar os dados

        let diceResultPlayer1 = await roll_Dice();
        let diceResultPlayer2 = await roll_Dice();

        // Teste de habilidade
        let totalTestSkill1 = 0;
        let totalTestSkill2 = 0;

        if(block === "RETA"){
            console.log();
            totalTestSkill1 = diceResultPlayer1 + character1.VELOCIDADE;
            totalTestSkill2 = diceResultPlayer2 + character2.VELOCIDADE;

            await logRollResult(character1.NOME, "Velocidade ", diceResultPlayer1, character1.VELOCIDADE);

            await logRollResult(character2.NOME, "Velocidade ", diceResultPlayer2, character2.VELOCIDADE);
        };

         if(block === "CURVA"){
            console.log();
            totalTestSkill1 = diceResultPlayer1 + character1.MANOBRABILIDADE;
            totalTestSkill2 = diceResultPlayer2 + character2.MANOBRABILIDADE;

            await logRollResult(character1.NOME, "Manobrabilidade ", diceResultPlayer1, character1.MANOBRABILIDADE);

            await logRollResult(character2.NOME, "Manobrabilidade ", diceResultPlayer2, character2.MANOBRABILIDADE);

        };

        if(block === "CONFRONTO"){
            console.log();

            let powerResultPlayer1 = diceResultPlayer1 + character1.PODER;
            let powerResultPlayer2 = diceResultPlayer2 + character2.PODER;

            let chanceBomba = Math.random();
            let bomba = 0;
            if(chanceBomba > 0.6){
                bomba++;
            }

            let buffPower = Math.random();
            let buff = 0;

            if(buffPower < 0.2 || buffPower > 0.8){
                buff++;
            }

            console.log(`${character1.NOME} confrontou com ${character2.NOME}! 🥊`);
            console.log();
            
            await logRollResult(character1.NOME, "Poder ", diceResultPlayer1, character1.PODER);

            await logRollResult(character2.NOME, "Poder ", diceResultPlayer2, character2.PODER);

            if(powerResultPlayer1 > powerResultPlayer2){
                if(character2.PONTOS > 0 && character2.PONTOS <= 2){
                    console.log()
                    console.log(`${character1.NOME} venceu o confronto! ${character2.NOME} perdeu 1 ponto! 🐢`)
                    character2.PONTOS--;
                    if(buff == 1){
                        console.log(`${character1.NOME} achou uma estrela! ⭐ Com isso ganhou 1 ponto!`);
                        character1.PONTOS++;
                    }
                }                
                if(character2.PONTOS > 2){
                    if(bomba == 1){
                        console.log()
                        console.log(`${character1.NOME} venceu o confronto! ${character2.NOME} perdeu 2 pontos! 💣`)
                        character2.PONTOS = character2.PONTOS - 2;
                        if(buff == 1){
                            console.log(`${character1.NOME} achou uma estrela! ⭐ Com isso ganhou 1 ponto!`);
                            character1.PONTOS++;
                        }
                    }
                    else(console.log(`${character1.NOME} venceu o confronto! ${character2.NOME} perdeu 1 ponto! 🐢`))
                }
                


            };

            if(powerResultPlayer2 > powerResultPlayer1){
                if(character1.PONTOS > 0 && character1.PONTOS <= 2){
                    console.log()
                    console.log(`${character2.NOME} venceu o confronto! ${character1.NOME} perdeu 1 ponto! 🐢`)
                    character1.PONTOS--;
                    if(buff == 1){
                        console.log(`${character2.NOME} achou uma estrela! ⭐ Com isso ganhou 1 ponto!`);
                        character2.PONTOS++;
                    }
                }                
                if(character1.PONTOS > 2){
                    if(bomba == 1){                        
                        console.log()
                        console.log(`${character2.NOME} venceu o confronto! ${character1.NOME} perdeu 2 pontos! 💣`)
                        character1.PONTOS = character1.PONTOS - 2;
                        if(buff == 1){
                            console.log(`${character2.NOME} achou uma estrela! ⭐ Com isso ganhou 1 ponto!`);
                            character2.PONTOS++;
                        }
                    }
                    else(console.log(`${character2.NOME} venceu o confronto! ${character1.NOME} perdeu 1 ponto! 🐢`))
                }
                
            };    
            
            console.log(powerResultPlayer1 === powerResultPlayer2 ? "Confronto EMPATADO! Nenhum ponto foi perdido!" : "");
        
        };

        //Verificando vencedor

        if(totalTestSkill1 > totalTestSkill2){
            console.log()
            console.log(`${character1.NOME} marcou 1 ponto!`);
            character1.PONTOS++;
        }

        else if(totalTestSkill2 > totalTestSkill1){
            console.log()
            console.log(`${character2.NOME} marcou 1 ponto!`);
            character2.PONTOS++;
        };
            
        console.log();
        console.log("--------------------------------------------------");
        console.log();
    };

    

};
async function declareWinner(character1, character2) {
    console.log("Resultado Final:")
    console.log(`${character1.NOME}: ${character1.PONTOS} ponto(s)`)
    console.log(`${character2.NOME}: ${character2.PONTOS} ponto(s)`)

    if(character1.PONTOS > character2.PONTOS){
        console.log()
        console.log(`${character1.NOME} foi o Grande Vencedor! 🏆`)
    }
    if(character2.PONTOS > character1.PONTOS){
        console.log()
        console.log(`${character2.NOME} foi o Grande Vencedor! 🏆`)
    }
    if(character2.PONTOS === character1.PONTOS){
        console.log()
        console.log(`${character2.NOME} e ${character1.NOME} Empataram! 🤡`)        
    } 

};
(async function main() {
    console.log()
    console.log(
    `🏁 🚨 Corrida entre ${player1.NOME} e ${player2.NOME} começando... \n`);

     await play_Race_Engine(player1, player2);
     await declareWinner(player1, player2);
    
})();