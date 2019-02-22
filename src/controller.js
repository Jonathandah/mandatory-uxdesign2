import view from "./view";
import model from "./model";

let body = document.querySelector("body");
let main = document.querySelector("main");
let menuButton = document.querySelector("#menuButton");
/*=============================Renderar startMenu=============================================*/
function startMenu(){
    console.log("start Menu körs")
    view.renderStart(main, findApi);
}
startMenu();
/*=============================Renderar startMenu End=============================================*/

/*=============================Hämtar API:et=============================================*/
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
/*=============================Hämtar API:et End=============================================*/

/*=============================Submittar alla quizfrågor=============================================*/
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
    view.modalDialog(obj, correctAnswers, startMenu, findApi, main);
}
/*=============================Submittar alla quizfrågor End=============================================*/


/*=============================Renderar Sidebaren=============================================*/
function controllMenu(){
    console.log("sidebartoggled");

    let sidebar= {
        background: document.querySelector(".sidebar--background"),
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
        view.renderMenu(sidebar, model.navbarButton, body, menuButton);
        
    }else{
        model.navbarButton = false
        console.log("körfalse");
        view.renderMenu(sidebar, model.navbarButton, body, menuButton);
    }
}
let navbarButton = document.querySelector(".navbar-toggler");
let sidebarFade = document.querySelector(".sidebar--background");
sidebarFade.addEventListener("click", controllMenu);
navbarButton.addEventListener("click", controllMenu);

/*=============================Renderar Sidebaren End=============================================*/

/*=============================Hanterar menyvalen i sidebaren=============================================*/
function switchMenu(e){
    if(e.target.classList[1] === "gameScreenLink"){
        startMenu();
    }else if(e.target.classList[1] === "statsLink"){
        view.renderStats(model.stats, main) 
    }else if(e.target.classList[1] === "aboutLink"){
        console.log("about");
        view.renderAbout(model.aboutText, main);
    }
}

let buttons = document.querySelectorAll(".aLink");
for(let button of buttons){
    button.addEventListener("click", switchMenu);
}

/*=============================Hanterar menyvalen i sidebaren End=============================================*/
