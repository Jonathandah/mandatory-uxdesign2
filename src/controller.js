import view from "./view";
import model from "./model";

function findApi (){
    let main = document.querySelector("main");
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
        model.currentArray = array;
        view.render(array, main, model.randomize, submitForm);
    })
    
.catch(function(error){
    console.log(error)
});   
}
let quizButton = document.querySelector("#quizButton");
quizButton.addEventListener("click", findApi);


function submitForm (){
    let answers = view.answers;

    console.log(answers);
    model.checkAnswers(answers);
}

