

export default{
    form: undefined,

    sideBar: undefined,

    answers:[],

    renderStart: function(main, findApi){
        main.innerHTML = "";
        let container = document.createElement("div");
        let h1 = document.createElement("h1");
        let button = document.createElement("button");

        button.setAttribute("type", "button");
        
        button.id = "quizButton";

        button.classList.add("btn", "btn-dark");
        h1.classList.add("title");
        container.classList.add("startContiner");

        h1.textContent = "Game Of Quiz"
        button.textContent = "Large button";

        button.addEventListener("click", findApi);
        container.appendChild(h1);
        container.appendChild(button);
        main.appendChild(container);

    },

    render: function(array, main, randomize, submitForm){
        main.innerHTML = ""

        let form = document.createElement("form");
        let submitButton = document.createElement("button");
        
        this.form = form;
        
        submitButton.textContent = "submit";

        form.setAttribute("action", "#");
        
        form.addEventListener("submit", function(e){
            console.log("submit funkar")
            submitForm();
            e.preventDefault();
        });
        
        submitButton.setAttribute("type", "submit"); 
        submitButton.setAttribute("data-target", "#exampleModalCentered");

        submitButton.classList.add("btn");
        submitButton.classList.add("btn-dark");
        submitButton.classList.add("btn-lg");

        console.log(array);
        
            for(let question of array){
                let container = document.createElement("div");
                let h3 = document.createElement("h3");
                let p = document.createElement("p");
                let ul = document.createElement("ul");
                
                let number = array.indexOf(question) + 1;//numret på frågan
        
                h3.textContent = "Q." + number;
                p.innerHTML = question.question
        
                container.classList.add("container");
                ul.classList.add("container__answers");
                p.classList.add("contianer__question");
                h3.classList.add("container__order");
        
                let allAnswers = randomize(question.correct_answer, question.incorrect_answers);
        
                for(let answer of allAnswers){

                    let li = document.createElement("li");
                    let radio = document.createElement("input");
                    let lable = document.createElement("lable");
                    radio.setAttribute("type", "radio");
                    radio.setAttribute("name", number);
                    radio.setAttribute("value", answer);
                    radio.setAttribute("required", "");
                    lable.setAttribute("for", number);
        
                    lable.innerHTML = answer;
                    
                    li.classList.add("container__answers__value");
                    
                    this.answers.push(radio); 
                    
                    li.appendChild(radio);
                    li.appendChild(lable);
                    ul.appendChild(li);
                }
        
                container.appendChild(h3);
                container.appendChild(p);
                container.appendChild(ul);
                form.appendChild(container);
            }

        form.appendChild(submitButton);
        main.appendChild(form);
    },

    renderMenu: function(sidebar, boolean){
        console.log(sidebar.background);
        if(boolean === true){
            sidebar.sidebarMenu.setAttribute("style", "display: flex");
            sidebar.background.setAttribute("style", "display: flex");
        }
        else{
            sidebar.sidebarMenu.setAttribute("style", "display:none");  
            sidebar.background.setAttribute("style", "display: none");
        }
        console.log(sidebar.sidebarMenu);
        sidebar.sidebarMenu.setAttribute("open", "");
        sidebar.gameScreen.focus();

        sidebar.sidebarMenu.addEventListener('transitionend', (e) => {
            sidebar.gameScreen.focus();
          });

        /*
        let body = document.querySelector("body");
        if(buttonValue === true){
            let sideBar = document.createElement("div");
            let sideBar_header = document.createElement("div");
            let sideBar_content = document.createElement("div");
            let h2 = document.createElement("h2");
            let aQuiz = document.createElement("a");
            let aStats = document.createElement("a");
            let aAbout = document.createElement("a");
           
            h2.textContent = "Game Of Quiz";
            aQuiz.textContent = "Game Screen";
            aStats.textContent = "Stats";
            aAbout.textContent = "About";

            aQuiz.setAttribute("href", "index.html");
            aStats.setAttribute("href", "stats.html");
            aAbout.setAttribute("href", "about.html");
            
            sideBar.classList.add("sidebar");
            sideBar_header.classList.add("sidebar_header");
            sideBar_content.classList.add("sidebar_content");
            h2.classList.add("sidebarTitle");
            aQuiz.classList.add("aLink");
            aStats.classList.add("aLink");
            aAbout.classList.add("aLink");

            this.sideBar = sideBar;

            sideBar_header.appendChild(h2);
            sideBar_content.appendChild(aQuiz);
            sideBar_content.appendChild(aStats);
            sideBar_content.appendChild(aAbout);
            sideBar.appendChild(sideBar_header);
            sideBar.appendChild(sideBar_content);
            body.appendChild(sideBar);
        }else{
            this.sideBar.innerHTML = "";
            body.removeChild(this.sideBar);
        }
        */
    },

    modalDialog: function (obj, correctAnswers, startMenu, findApi){
        console.log(obj);
        console.log(obj.modalTitle);
        obj.modalCancel.focus(); //focusar inte rätt elemnt
        obj.modal.setAttribute("style", "display: flex;");
        obj.modalContent.setAttribute("open", "");
        obj.modalText.textContent = "Du hade: " + correctAnswers + "/10" + " rätt!";


        obj.modalContent.addEventListener('transitionend', (e) => {
            obj.modalTitle.focus();
        });

        //måste få restart-knappen att funka
        obj.modalCancel.addEventListener("click", function(){
            obj.modal.setAttribute("style", "display: none;");
            startMenu();
            //rendera start
        });

        obj.modalRestart.addEventListener("click", function(){
            obj.modal.setAttribute("style", "display: none;");
            document.documentElement.scrollTop = 0;
            //rendera nytt quiz
            findApi();
        });
    },
    renderStats: function (stats, main){
        main.innerHTML = "";
        let container = document.createElement("div");
        let gamesSection = document.createElement("div");
        let h2Games = document.createElement("h2");
        let gamesStats = document.createElement("p");
        let correctSection = document.createElement("div");
        let h2Correct = document.createElement("h2");
        let correctStats = document.createElement("p");
        let incorrectSection = document.createElement("div");
        let h2Incorrect = document.createElement("h2");
        let incorrectStats = document.createElement("p");
        let percentageSection = document.createElement("div");
        let h2Percentage = document.createElement("h2");
        let percentageStats = document.createElement("p");

        container.classList.add("container");
        gamesSection.classList.add("container__gamesSection");
        correctSection.classList.add("container__correctSection");
        incorrectSection.classList.add("container__incorrectSection");
        percentageSection.classList.add("container__percentageSection");
        h2Games.classList.add("container__gamesSection__title");
        h2Correct.classList.add("container__correctSection__title");
        h2Incorrect.classList.add("container__incorrectSection__title");
        h2Percentage.classList.add("container__percentageSection__title");
        gamesStats.classList.add("container__gamesSection__stat");
        correctStats.classList.add("container__correctSection__stat");
        incorrectStats.classList.add("container__incorrectSection__stat");
        percentageStats.classList.add("container__percentageSection__stat");


        
        h2Games.textContent = "Games Played";
        h2Correct.textContent = "Total Correct Answers";
        h2Incorrect.textContent = "Total Incorrect Answers";
        h2Percentage.textContent = "Correct rate";
        gamesStats.textContent = stats.gamesPlayed;
        correctStats.textContent = stats.correctAnswers;
        incorrectStats.textContent = stats.incorrectAnswers;
        percentageStats.textContent = stats.correctPercentage;

        gamesSection.appendChild(h2Games);
        gamesSection.appendChild(gamesStats);
        correctSection.appendChild(h2Correct);
        correctSection.appendChild(correctStats);
        incorrectSection.appendChild(h2Incorrect);
        incorrectSection.appendChild(incorrectStats);
        percentageSection.appendChild(h2Percentage);
        percentageSection.appendChild(percentageStats);
        container.appendChild(gamesSection);
        container.appendChild(correctSection);
        container.appendChild(incorrectSection);
        container.appendChild(percentageSection);
        main.appendChild(container);
    }
 
}