function getApi(){
    let promise = new Promise(
        (resolve, reject) =>{
            resolve(axios.get("https://opentdb.com/api.php?amount=10&type=multiple"));

            let error = new Error("faild to get Api");
            reject(error);
        }   
    )

    promise.then(function(response){
        console.log(response);
        let array = response.data.results
        console.log(array);
        render(array);
    })
}
/*
.catch(function(error){
    console.log(error)
});
*/

let quizButton = document.querySelector("#quizButton");
quizButton.addEventListener("click", getApi);

function render(array){
let main = document.querySelector("main");
let form = document.createElement("form");
let submitButton = document.createElement("buton");

main.innerHTML = ""

submitButton.textContent = "submit";

submitButton.addEventListener("click", submitForm);

submitButton.setAttribute("type", "submit");

submitButton.classList.add("btn");
submitButton.classList.add("btn-dark");
submitButton.classList.add("btn-lg");

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
            lable.setAttribute("for", answer);

            lable.textContent = answer;

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
}

function randomize(correct, incorrect){
    let array = [];
    array.push(correct);
    
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
}

function submitForm (){
    
}