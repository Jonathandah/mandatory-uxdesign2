export default{
    currentArray: undefined,
    
    getApi: function(){
        /*
        let promise = new Promise(
            (resolve, reject) =>{
                resolve(axios.get("https://opentdb.com/api.php?amount=10&type=multiple"));
        
                let error = new Error("faild to get Api");
                reject(error);
            }   
        )
        //question.correct_answer, question.incorrect_answers
        promise.then(function(response){
            let array = response.data.results
            console.log(array);
            return array;
        })
        /*
    .catch(function(error){
        console.log(error)
    });
    */

   axios.get('https://opentdb.com/api.php?amount=10&type=multiple')
   .then(function (response) {
    let array = response.data.results
    console.log(array);
    return array;
   })
   .catch(function (error) {
     console.log(error);
   });
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
        for(let answer of answers){
            if(answer.checked){
                let index = answer.name - 1; //numret måste stäma med array index som såklart börjar på 0;

                if(answer.value === this.currentArray[index].correct_answer){
                    console.log("rätt");
                }else{
                    console.log("fel");
                }
            }
            
        }
    }, 

correctAnswers: function (){

}



}