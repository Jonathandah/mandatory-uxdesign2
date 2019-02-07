export default{
    form: undefined,
    answers:[],

render: function(array, main, randomize, submitForm){
    let form = document.createElement("form");
    let submitButton = document.createElement("buton");
    
    this.form = form;

    main.innerHTML = ""
    
    submitButton.textContent = "submit";
    
    submitButton.addEventListener("click", submitForm);
    
    submitButton.setAttribute("type", "submit");
    
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

}