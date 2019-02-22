

export default{
    form: undefined,

    sideBar: undefined,

    answers:[],
    test:[],

    renderStart: function(main, findApi){
        main.innerHTML = "";
        let container = document.createElement("div");
        let h1 = document.createElement("h1");
        let button = document.createElement("button");

        button.setAttribute("type", "button");
        button.setAttribute("tabindex", "0");
        h1.setAttribute("tabindex", "0");
        h1.setAttribute("aria-label", "Game Of Quiz");

        this.test.push(h1);
        this.test.push(button);

        button.classList.add("btn", "btn-dark");
        h1.classList.add("title");
        container.classList.add("startContiner");
        button.id = "quizButton";

        h1.textContent = "Game Of Quiz"
        button.textContent = "Start Quiz";

        button.addEventListener("click", findApi);

        container.appendChild(h1);
        container.appendChild(button);
        main.appendChild(container);
    },

    render: function(array, main, randomize, submitForm){
        main.innerHTML = ""
        let form = document.createElement("form");
        let submitButton = document.createElement("button");

        this.test.push(submitButton);
        this.form = form;
        
        submitButton.textContent = "submit";
        
        form.addEventListener("submit", function(e){
            console.log("submit funkar")
            submitForm();
            e.preventDefault();
        });

        form.setAttribute("action", "#");
        submitButton.setAttribute("type", "submit"); 
        submitButton.setAttribute("data-target", "#exampleModalCentered");
        submitButton.setAttribute("tabindex", "0");
        submitButton.setAttribute("aria-label", "Submit Button");

        submitButton.classList.add("btn", "btn-lg");
        submitButton.id = "submitButton";
        form.id = "quizform";

        console.log(array);
        
            for(let question of array){
                
                let container = document.createElement("div");
                let h3 = document.createElement("h3");
                let p = document.createElement("p");
                let ul = document.createElement("ul");
                
                let number = array.indexOf(question) + 1;//numret på frågan
        
                h3.textContent = "Q." + number;

                p.innerHTML = question.question;

                this.test.push(h3);
                this.test.push(p);
        
                container.classList.add("container");
                ul.classList.add("container__answers");
                p.classList.add("contianer__question");
                h3.classList.add("container__order");

                h3.setAttribute("tabindex", "0");
                h3.setAttribute("aria-label", "question" + number);
                p.setAttribute("tabindex", "0");
        
                let allAnswers = randomize(question.correct_answer, question.incorrect_answers);
        
                for(let answer of allAnswers){

                    let li = document.createElement("li");
                    let radio = document.createElement("input");
                    let lable = document.createElement("lable");

                    li.classList.add("container__answers__value");

                    radio.setAttribute("type", "radio");
                    radio.setAttribute("name", number);
                    radio.setAttribute("value", answer);
                    radio.setAttribute("required", "");
                    radio.setAttribute("tabindex", "0");
                    radio.setAttribute("aria-label", answer);
                    lable.setAttribute("for", number);
        
                    lable.innerHTML = answer;

                    this.test.push(radio);
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

    renderMenu: function(sidebar, boolean, body, menuButton){
        console.log(sidebar.background);
        if(boolean === true){
            body.setAttribute("style", "overflow: hidden;");
            sidebar.sidebarMenu.setAttribute("style", "width: 300px; left:0px;");
            sidebar.background.setAttribute("style", "width: 100%");
            sidebar.sidebarMenu.classList.add("sidebar--show"); 
            sidebar.gameScreen.setAttribute("tabindex", "1");
            sidebar.stats.setAttribute("tabindex", "1");
            sidebar.about.setAttribute("tabindex", "1");   
            sidebar.title.setAttribute("tabindex", "1");   
            sidebar.gameScreen.setAttribute("aria-hidden", "false");
            sidebar.stats.setAttribute("aria-hidden", "false");
            sidebar.about.setAttribute("aria-hidden", "false"); 
            sidebar.title.setAttribute("aria-hidden", "false"); 

            for(let item of this.test){
                item.setAttribute("tabindex", "-1");
            }
            menuButton.setAttribute("tabindex", "-1");
        }
        else{
            body.setAttribute("style", "overflow: visible;");
            sidebar.sidebarMenu.setAttribute("style", "width: 0px; left: -300px;");  
            sidebar.background.setAttribute("style", "width: 0%");
            sidebar.sidebarMenu.classList.remove("sidebar--show");  
            sidebar.gameScreen.setAttribute("tabindex", "-1");
            sidebar.stats.setAttribute("tabindex", "-1");
            sidebar.about.setAttribute("tabindex", "-1"); 
            sidebar.title.setAttribute("tabindex", "-1"); 
            sidebar.gameScreen.setAttribute("aria-hidden", "true");
            sidebar.stats.setAttribute("aria-hidden", "true");
            sidebar.about.setAttribute("aria-hidden", "true"); 
            sidebar.title.setAttribute("aria-hidden", "true"); 

            menuButton.setAttribute("tabindex", "0");

            for(let item of this.test){
                item.setAttribute("tabindex", "0");
            }

        }
        console.log(sidebar.sidebarMenu);
        sidebar.sidebarMenu.setAttribute("open", "");
        sidebar.gameScreen.focus();

        sidebar.sidebarMenu.addEventListener('transitionend', (e) => {
            sidebar.gameScreen.focus();
          });
    },

    modalDialog: function (obj, correctAnswers, startMenu, findApi, main){
        console.log(obj);
        console.log(obj.modalTitle);

        obj.modalTitle.focus();
        obj.modal.setAttribute("style", "display: flex;");
        obj.modalContent.setAttribute("open", "");
        obj.modalText.textContent = "Du hade: " + correctAnswers + "/10" + " rätt!";
        
        for(let item of this.test){
            item.setAttribute("tabindex", "");
        }

        obj.modalContent.addEventListener('transitionend', (e) => {
            obj.modalTitle.focus();
        });

        obj.modalCancel.addEventListener("click", function(){
            obj.modal.setAttribute("style", "display: none;");
            document.documentElement.scrollTop = 0;
            startMenu();
            //renderar start
        });

        obj.modalRestart.addEventListener("click", function(){
            obj.modal.setAttribute("style", "display: none;");
            document.documentElement.scrollTop = 0;
            //renderar nytt quiz
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


        container.classList.add("container", "--flexCenter");
        gamesSection.classList.add("container__gamesSection", "--flexCenter");
        correctSection.classList.add("container__correctSection", "--flexCenter");
        incorrectSection.classList.add("container__incorrectSection", "--flexCenter");
        h2Games.classList.add("container__gamesSection__title");
        h2Correct.classList.add("container__correctSection__title");
        h2Incorrect.classList.add("container__incorrectSection__title");
        gamesStats.classList.add("container__gamesSection__stat");
        correctStats.classList.add("container__correctSection__stat");
        incorrectStats.classList.add("container__incorrectSection__stat");

        h2Games.setAttribute("tabindex", "0");
        h2Games.setAttribute("aria-label", "Games Played");
        gamesStats.setAttribute("tabindex", "0");
        h2Correct.setAttribute("tabindex", "0");
        correctStats.setAttribute("tabindex", "0");
        h2Incorrect.setAttribute("tabindex", "0");
        incorrectStats.setAttribute("tabindex", "0");

        this.test.push(h2Games);
        this.test.push(gamesStats);
        this.test.push(h2Correct);
        this.test.push(correctStats);
        this.test.push(h2Incorrect);
        this.test.push(incorrectStats);
        
        h2Games.textContent = "Games Played";
        h2Correct.textContent = "Total Correct Answers";
        h2Incorrect.textContent = "Total Incorrect Answers";
        gamesStats.textContent = stats.gamesPlayed;
        correctStats.textContent = stats.correctAnswers;
        incorrectStats.textContent = stats.incorrectAnswers;

        gamesSection.appendChild(h2Games);
        gamesSection.appendChild(gamesStats);
        correctSection.appendChild(h2Correct);
        correctSection.appendChild(correctStats);
        incorrectSection.appendChild(h2Incorrect);
        incorrectSection.appendChild(incorrectStats);
        container.appendChild(gamesSection);
        container.appendChild(correctSection);
        container.appendChild(incorrectSection);
        main.appendChild(container);
    },
    renderAbout: function (text, main){
        main.innerHTML = "";
        let container = document.createElement("div");
        let h2 = document.createElement("h2");
        let p = document.createElement("p");

        container.classList.add("container", "--flexCenter");
        h2.classList.add("container__tilte");
        p.classList.add("container__text");

        p.textContent = text;
        h2.textContent = "About";

        h2.setAttribute("tabindex", "0");
        p.setAttribute("tabindex", "0");

        this.test.push(h2);
        this.test.push(p);

        container.appendChild(h2);
        container.appendChild(p);
        main.appendChild(container);
    }
 
}