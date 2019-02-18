(function () {
  'use strict';

  var model = {
      currentArray: undefined,

      navbarButton: false,

      stats: {
          gamesPlayed: 0,
          correctAnswers: 0,
          incorrectAnswers: 0,
          correctPercentage: null,
      },
    /*  
      getApi: function(){
      
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
              return array;
          })
          
      .catch(function(error){
          console.log(error)
      });


     axios.get('https://opentdb.com/api.php?amount=10&type=multiple')
     .then(function (response) {
      let array = response.data.results
      console.log(array);
      return array;
     })
     .catch(function (error) {
       console.log(error);
     });
      },
  */
      randomize: function (correct, incorrect){
          let array = [];
          array.push(correct);
          console.log(incorrect);
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
      },

      checkAnswers: function(answers){
          let count = 0;

          for(let answer of answers){
              if(answer.checked){
                  let index = answer.name - 1; //numret måste stäma med array index som såklart börjar på 0;
                  if(answer.value === this.currentArray[index].correct_answer) {
                      console.log("rätt");
                      count++;
                  } else{
                      console.log("fel");
                  }
              }
          }
          return count;
      }, 

      formRequirements: function (answers){
      },

      statsUpdate: function (currentStats){
          console.log(this.stats);
          this.stats.gamesPlayed += 1;
          this.stats.correctAnswers += currentStats;
          this.stats.incorrectAnswers += 10 - currentStats;
          this.stats.correctPercentage += ((currentStats/10) *100).toFixed(3); // msåte fixas
          console.log(this.stats);
      }
  };

  var view = {
      form: undefined,

      sideBar: undefined,

      answers:[],

      renderStart: function(main, findApi){
          main.innerHTML = "";
          let h1 = document.createElement("h1");
          let button = document.createElement("button");

          button.setAttribute("type", "button");
          
          button.id = "quizButton";

          button.classList.add("btn", "btn-dark", "btn-lg");
          h1.classList.add("title");

          h1.textContent = "Game Of Quiz";
          button.textContent = "Large button";

          button.addEventListener("click", findApi);

          main.appendChild(h1);
          main.appendChild(button);

      },

      render: function(array, main, randomize, submitForm){
          main.innerHTML = "";

          let form = document.createElement("form");
          let submitButton = document.createElement("buton");
          
          this.form = form;
          
          submitButton.textContent = "submit";
          
          submitButton.addEventListener("click", submitForm);
          
          submitButton.setAttribute("type", "submit"); 
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
                  p.textContent = question.question;
          
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
          
                      lable.textContent = answer;
                      
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

      modalDialog: function (body, modal, modalContent, correctAnswers, startMenu, findApi){
          console.log(modalContent);
          console.log(modalContent.childNodes[5].childNodes);
          let modalText = modalContent.childNodes[3].childNodes[0];
          let modalButtonClose = modalContent.childNodes[5].childNodes[1];
          let modalButtonRestart = modalContent.childNodes[5].childNodes[3];

          modalText.textContent = "Du hade: " + correctAnswers + "/10" + " rätt!";
          

                  //måste få restart-knappen att funka

          modalButtonClose.addEventListener("click", startMenu);
      }
   
  };

  let body = document.querySelector("body");
  let main = document.querySelector("main");

  // fixa en render till start page till closebutton på modal-dialog
  function startMenu(){
      console.log("start Menu körs");
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
      );
      //question.correct_answer, question.incorrect_answers
      promise.then(function(response){
          let array = response.data.results;
          console.log(array);
          model.currentArray = array;
          view.render(array, main, model.randomize, submitForm);
      })
      
  .catch(function(error){
      console.log(error);
  });   
  }

  function submitForm (){
      let modal = document.querySelector(".modal");
      let modalContent = document.querySelector(".modal-content");
      let answers = view.answers;
      
      console.log(answers);
      let correctAnswers = model.checkAnswers(answers);
      model.statsUpdate(correctAnswers);
      view.modalDialog(body, modal, modalContent, correctAnswers, startMenu, findApi);
  }

  function controllMenu(){
      if(model.navbarButton === false){
          model.navbarButton = true;
          view.renderMenu(model.navbarButton);
          
      }else{
          model.navbarButton = false;
          view.renderMenu(model.navbarButton);
      }
  }
  let navbarButton = document.querySelector(".navbar-toggler");
  navbarButton.addEventListener("click", controllMenu);

}());
