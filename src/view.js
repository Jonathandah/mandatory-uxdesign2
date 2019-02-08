export default{
    form: undefined,

    sideBar: undefined,

    answers:[],

render: function(array, main, randomize, submitForm){
    let form = document.createElement("form");
    let submitButton = document.createElement("buton");
    
    this.form = form;

    main.innerHTML = ""
    
    submitButton.textContent = "submit";
    
    submitButton.addEventListener("click", submitForm);
    
    submitButton.setAttribute("type", "button"); 
    submitButton.setAttribute("data-toggle", "modal");
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
            p.textContent = question.question
    
            container.classList.add("container");
    
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
    
                lable.textContent = answer;
                
                this.answers.push(radio);

                li.appendChild(radio)
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

    renderMenu: function(buttonValue){
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
    },

    modalDialog: function ( modalBodyText, correctAnswers){
        modalBodyText.textContent = "Du hade: " + correctAnswers + "/10" + " rätt!";
    }

}