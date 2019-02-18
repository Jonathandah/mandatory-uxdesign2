import view from "./view";
import model from "./model";

let body = document.querySelector("body");
let main = document.querySelector("main");

// fixa en render till start page till closebutton på modal-dialog
function startMenu(){
    console.log("start Menu körs")
    view.renderStart(main, findApi);
}
startMenu();

function findApi (){
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

function submitForm (){
    let modal = document.querySelector(".modal");
    let modalContent = document.querySelector(".modal-content");
    let answers = view.answers;
    
    console.log(answers);
    
    model.formRequirements(answers);
    let correctAnswers = model.checkAnswers(answers);
    model.statsUpdate(correctAnswers);
    view.modalDialog(body, modal, modalContent, correctAnswers, startMenu, findApi);
}

function controllMenu(){
    if(model.navbarButton === false){
        model.navbarButton = true
        view.renderMenu(model.navbarButton);
        
    }else{
        model.navbarButton = false
        view.renderMenu(model.navbarButton);
    }
}
let navbarButton = document.querySelector(".navbar-toggler");
navbarButton.addEventListener("click", controllMenu);
