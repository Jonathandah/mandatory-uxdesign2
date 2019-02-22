export default{
    aboutText: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem mollitia illum, nihil cupiditate architecto voluptatibus ut! Repellendus, a. Esse aliquid necessitatibus sequi, labore excepturi aliquam modi ea doloribus veritatis quos. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem mollitia illum, nihil cupiditate architecto voluptatibus ut! Repellendus, a. Esse aliquid necessitatibus sequi, labore excepturi aliquam modi ea doloribus veritatis quos.",
    
    currentArray: undefined,

    navbarButton: false,

    stats: {
        gamesPlayed: 0,
        correctAnswers: 0,
        incorrectAnswers: 0,
        //correctPercentage: null, //måste fixas så att den funkar
    },

    randomize: function (correct, incorrect){
        let array = [];
        array.push(correct);
        console.log(incorrect);
        for(let question of incorrect){
            array.push(question);
        }
    
        for (let i = array.length - 1; i > 0; i--) {
            let random = Math.floor(Math.random() * (i + 1));
            let item = array[i];
            array[i] = array[random];
            array[random] = item;
        }
    
        return array;
    },

    checkAnswers: function(answers){
        let count = 0;

        for(let answer of answers){
            if(answer.checked){
                let index = answer.name - 1; //numret måste stäma med array index som såklart börjar på 0;
                if(answer.value === this.currentArray[index].correct_answer) {
                    console.log("rätt");
                    count++;
                } else{
                    console.log("fel");
                }
            }
        }
        return count;
    }, 



    statsUpdate: function (currentStats){
        console.log(this.stats);
        this.stats.gamesPlayed += 1;
        this.stats.correctAnswers += currentStats;
        this.stats.incorrectAnswers += 10 - currentStats;
        //this.stats.correctPercentage += ((currentStats/10) *100).toFixed(3); // msåte fixas
        console.log(this.stats);
    }
}