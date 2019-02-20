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
   
    let answers = view.answers;
    let obj ={
        modal: document.querySelector(".modals"),
        modalContent: document.querySelector(".modal__content"),
        modalTitle: document.querySelector(".modal__content__header__title"),
        modalText: document.querySelector(".modal__content__body__text"),
        modalCancel: document.querySelector(".modal__content__footer__cancel"),
        modalRestart: document.querySelector(".modal__content__footer__restart"), 
    }
    console.log(answers);
    
    let correctAnswers = model.checkAnswers(answers);
    model.statsUpdate(correctAnswers);
    view.modalDialog(obj, correctAnswers, startMenu, findApi);
}

function controllMenu(){
    console.log("sidebartoggled")
let sidebar= {
    background: document.querySelector(".sidebar__background"),
    sidebarMenu: document.querySelector(".sidebar"),
    header: document.querySelector(".sidebar__header"),
    title: document.querySelector(".sidebar__header__title"),
    content: document.querySelector(".sidebar__content"),
    gameScreen: document.querySelector(".gameScreenLink"),
    stats: document.querySelector(".statsLink"),
    about: document.querySelector(".aboutLink"),
}
   if(model.navbarButton === false){
        model.navbarButton = true
        console.log("körtrue");
        view.renderMenu(sidebar, model.navbarButton);
        
    }else{
        model.navbarButton = false
        console.log("körfalse");
        view.renderMenu(sidebar, model.navbarButton);
    }
}
let navbarButton = document.querySelector(".navbar-toggler");
let sidebarFade = document.querySelector(".sidebar__background");
sidebarFade.addEventListener("click", controllMenu);
navbarButton.addEventListener("click", controllMenu);
