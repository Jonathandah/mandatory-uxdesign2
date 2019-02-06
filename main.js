let promise = new Promise(
    (resolve, reject) =>{
        resolve(axios.get("https://opentdb.com/api.php?amount=10&type=multiple"));

        let error = new Error("faild to get Api");
        reject(error);
})

promise.then(function(response){
    console.log(response);
    let array = response.data.results
    console.log(array);
    render(array);
})
/*
.catch(function(error){
    console.log(error)
});
*/


function render(array){
let main = document.querySelector("main");
    for(let question of array){
        let container = document.createElement("div");
        let h3 = document.createElement("h3");
        let p = document.createElement("p");
        let ul = document.createElement("ul");

        let number = array.indexOf(question) + 1;//numret på frågan

        h3.textContent = "Q." + number;
        p.textContent = question.question

        let allAnswers = randomize(question.correct_answer, question.incorrect_answers);

        for(let answer of allAnswers){
            let li = document.createElement("li");
            let radio = document.createElement("input");
            let lable = document.createElement("lable");
            radio.setAttribute("type", "radio");
            radio.setAttribute("name", answer);
            lable.setAttribute("for", answer);

            lable.textContent = answer;

            li.appendChild(radio)
            li.appendChild(lable);
            ul.appendChild(li);
        }

        container.appendChild(h3);
        container.appendChild(p);
        container.appendChild(ul);
        main.appendChild(container);
    }
}

function randomize(correct, incorrect){
    let array = [];
    let randomArray = [];
    array.push(correct);

    for(let question of incorrect){
        array.push(question);
    }

    for(let item of array){
        let random = array[Math.floor(Math.random()*array.length)]
        randomArray.push(random);
    }
    console.log(array);
    console.log(randomArray);

    return randomArray;
}