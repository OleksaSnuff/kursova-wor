let score = 0;
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

function setLocalData(chapter) {
  window.localStorage.setItem(chapter, score);
}

iziToast.success({
  title: "Привіт!",
  message: "Я тут, щоб тобі допомагати)",
});

//===========копіювання----
const codeElements = document.querySelectorAll(".code");
codeElements.forEach(function (element) {
  element.addEventListener("click", function () {
    const tempTextArea = document.createElement("textarea");
    tempTextArea.value = element.textContent;
    document.body.appendChild(tempTextArea);
    tempTextArea.select();
    document.execCommand("copy");
    document.body.removeChild(tempTextArea);
    // Повідомлення про копіювання
    iziToast.success({
      title: "Готово!",
      message: "Код скопійовано!",
    });
  });
});

window.showSection = function (sectionId) {
  document.getElementById(sectionId).classList.remove("visually-hidden");
  window.scrollBy({
    top: 500,
    behavior: "smooth",
  });
};

window.showCorrectAnswer = function (elementId) {
  let element = document.getElementById(elementId);
  let nestedElements = element.querySelectorAll(
    ":scope > * > .visually-hidden"
  );
  nestedElements.forEach(function (item) {
    item.classList.remove("visually-hidden");
  });
};

window.showCorrectAnswerField = function (fieldsetId) {
  let fieldset = document.getElementById(fieldsetId);

  let inputElements = fieldset.querySelectorAll(
    ':scope > * > * > input[value="true"]'
  );

  inputElements.forEach(function (input) {
    const parent = input.parentNode;
    parent.style.color = "green";
    parent.style.fontWeight = "bold";
  });
};

//===========================Тема 3
const questions3_1 = [
  {
    text: "1. Хто розробив бібліотеку jQuery?",
    right: " Джон Резіг",
  },
  {
    text: "2. У якому році була випущена перша версія jQuery?",
    right: "2006",
  },
  {
    text: "3. Яка основна ціль створення бібліотеки jQuery?(одне слово)",
    right: "Спрощення",
  },
];
generateTestBlock(test3_1, questions3_1, "quiz-input", "#button3_1");

const questions3_2 = [
  {
    text: "Як позначається вибір елемента за його ідентифікатором в jQuery? (ідентифікатор - id)",
    right: "$('#id')",
  },
  {
    text: "Як позначається вибір елементів за їх класом в jQuery?(клас -  class)",
    right: "$('.class')",
  },
  {
    text: "Як позначається вибір елементів за їх тегом в jQuery?(тег - tag)",
    right: "$('tag')",
  },
];
generateTestBlock(test3_2, questions3_2, "quiz-input", "#button3_2");
//===========================Тема 3
const questions3_3 = [
  {
    text: "Яка функція встановлює обробник подій для події 'click' на вибраних елементах?",
    right: ".click()",
  },
  {
    text: "Яка функція встановлює обробник подій для події 'double click' на вибраних елементах?",
    right: ".dblclick()",
  },
  {
    text: " Функція on() є корисною тоді, коли вам потрібно працювати з багатьма подіями чи з однією?",
    right: "Багатьма",
  },
];
generateTestBlock(test3_3, questions3_3, "quiz-input", "#button3_3");
/*============================Test==========================*/
function generateTestBlock(container, questions, inputClass, buttonSelector) {
  for (let question of questions) {
    let div = document.createElement("div");
    container.appendChild(div);

    let p = document.createElement("p");
    p.innerHTML = question.text;
    div.appendChild(p);

    let input = document.createElement("input");
    input.classList.add(inputClass);
    input.dataset.right = question.right;
    div.appendChild(input);

    let p1 = document.createElement("p");
    p1.innerHTML = question.right;
    p1.classList.add("questionRight");
    p1.classList.add("visually-hidden");
    div.appendChild(p1);
  }

  let button = document.querySelector(buttonSelector);
  button.addEventListener("click", function () {
    checkAnswers(container, inputClass);
    button.disabled = true;
  });
}

function checkAnswers(container, inputClass) {
  let inputs = container.querySelectorAll(`.${inputClass}`);

  for (let input of inputs) {
    if (input.valueю === "") {
      input.classList.add("incorrect");
      input.readOnly = true;
    } else if (
      input.value.toLowerCase().trim() == input.dataset.right.toLowerCase()
    ) {
      input.classList.add("correct");
      score++;
      input.readOnly = true;
    } else {
      input.classList.add("incorrect");
      input.readOnly = true;
    }
  }
  setLocalData("chapter3");
  iziToast.success({
    title: "Ваша кількість балів наразі складає:",
    message: `${score}`,
  });
}

/*========================Radio=========================== */
window.submitQuiz = function (formId) {
  let questions = document.querySelectorAll(`form#${formId} .quiz-wrap-set`);

  questions.forEach((question) => {
    let selectedOption = question.querySelector("input:checked");

    if (selectedOption.value === "true") {
      score++;
      question.classList.add("correct");
    } else {
      question.classList.add("incorrect");
    }

    let inputs = question.querySelectorAll("input");
    inputs.forEach((input) => {
      input.disabled = true;
    });

    let callingButton = event.currentTarget;
    callingButton.disabled = true;
  });
  setLocalData("chapter3");
  iziToast.success({
    title: "Ваша кількість балів наразі складає:",
    message: `${score}`,
  });
};
/*=============================Модульний================================ */
document.getElementById("module-check").addEventListener("click", function () {
  document.getElementById("modal-section").classList.add("is-open");
});

document.getElementById("close-modal").addEventListener("click", function () {
  document.getElementById("modal-section").classList.remove("is-open");
});
window.reload = function () {
  score = 0;
  location.reload();
};

const questionsModal = [
  {
    text: "Яка об'єктна модель дозволяє JavaScript змінювати елементи веб-сторінки?",
    q1: "HTML",
    q2: "CSS",
    q3: "DOM",
    right: "DOM",
  },
  {
    text: "Чи можна використовувати JavaScript для взаємодії з користувачем на веб-сторінці?",
    q1: "Ні, JavaScript не підтримує взаємодію з користувачем.",
    q2: "Так, JavaScript дозволяє створювати інтерактивні елементи.",
    q3: "Це можливо лише за допомогою HTML.",
    right: "Так, JavaScript дозволяє створювати інтерактивні елементи.",
  },
  {
    text: "Яка технологія дозволяє виконувати асинхронні запити на сервер з використанням JavaScript?",
    q1: "HTML5",
    q2: "XML",
    q3: "AJAX",
    right: "AJAX",
  },
  {
    text: "Яка методика використання JavaScript дозволяє вставляти код JavaScript безпосередньо в HTML-документ?",
    q1: "Вбудований (Inline)",
    q2: "Зовнішній файл (External)",
    q3: "Атрибут onclick",
    right: "Вбудований (Inline)",
  },
  {
    text: "Яка конструкція в JavaScript дозволяє перевірити, чи є вираз істинним чи хибним та виконати певний код в залежності від результату?",
    q1: "Loop",
    q2: "If statement",
    q3: "Object",
    right: "If statement",
  },
  {
    text: "Яким методом можна додати новий елемент в кінець масиву?",
    q1: "add()",
    q2: "insert()",
    q3: "push()",
    right: "push()",
  },
  {
    text: "Яке ключове слово в JavaScript вказує на поточний об'єкт?",
    q1: "current",
    q2: "self",
    q3: "this",
    right: "this",
  },
  {
    text: "Як можна оголосити функцію в JavaScript?",
    q1: "declare function myFunction() {}",
    q2: "function: myFunction() {}",
    q3: "function myFunction() {}",
    right: "function myFunction() {}",
  },
  {
    text: "Як встановити обробник подій для події 'click' на вибраних елементах у jQuery?",
    q1: ".trigger()",
    q2: ".click()",
    q3: ".on()",
    right: ".on()",
  },
  {
    text: "Яка функція використовується для створення анімаційних ефектів, таких як переміщення, зміна розміру, зміна прозорості тощо у jQuery?",
    q1: ".animate()",
    q2: ".fade()",
    q3: ".show()",
    right: ".animate()",
  },
  {
    text: "Що забезпечує можливість делегування обробки подій вище по DOM-дереву у jQuery?",
    q1: ".bind()",
    q2: ".delegate()",
    q3: ".on()",
    right: ".delegate()",
  },
  {
    text: "Як вибрати всі елементи за їх класом у jQuery?",
    q1: "$('.class')",
    q2: "$('class')",
    q3: "$('#class')",
    right: "$('.class')",
  },
];
function shuffleQuestions(questions) {
  let shuffledQuestions = [...questions];

  for (let i = shuffledQuestions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledQuestions[i], shuffledQuestions[j]] = [
      shuffledQuestions[j],
      shuffledQuestions[i],
    ];
  }

  return shuffledQuestions;
}
let shufQuestions = shuffleQuestions(questionsModal);
generateTestModule(test_module, shufQuestions, "quiz-label");

function generateTestModule(container, questions, inputClass) {
  let j = 1;
  for (let question of questions) {
    let div = document.createElement("div");
    div.classList.add("quiz-wrap-set");
    container.appendChild(div);

    let p = document.createElement("p");
    p.innerHTML = question.text;
    div.appendChild(p);

    for (let i = 1; i <= 3; i++) {
      let label = document.createElement("label");
      label.classList.add(inputClass);

      let input = document.createElement("input");
      input.type = "radio";
      input.name = "q" + j;
      input.value = question["q" + i];
      if (i == 1) input.setAttribute("checked", true);
      label.appendChild(input);

      label.innerHTML += " " + question["q" + i];

      div.appendChild(label);
    }
    j++;
  }
}

window.submitModuleQuiz = function (formId) {
  let questions = document.querySelectorAll(`form#${formId} .quiz-wrap-set`);
  let i = 0;
  questions.forEach((question) => {
    let selectedOption = question.querySelector("input:checked");

    if (selectedOption.value === shufQuestions[i].right) {
      score++;
      question.classList.add("correct");
    } else {
      question.classList.add("incorrect");
    }

    let inputs = question.querySelectorAll("input");
    inputs.forEach((input) => {
      input.disabled = true;
    });
    let callingButton = event.currentTarget;
    callingButton.disabled = true;
    i++;
  });
  setLocalData("chapter3");
  getFromLocalStorage();
};

function getFromLocalStorage() {
  const arr = [12, 18, 24];
  let str = "";
  for (let index = 1; index <= 3; index++) {
    let parsed = JSON.parse(window.localStorage.getItem(`chapter${index}`));
    if (parsed === null) {
      parsed = 0;
    }
    str = str + `<p>Тема ${index} : ${parsed}/${arr[index - 1]}</p>`;
  }

  document.getElementById("score").innerHTML =
    `<p>поточна кількість балів:</p>` + str;
}

window.highlightCorrectAnswers = function (formId) {
  let questions = document.querySelectorAll(`form#${formId} .quiz-wrap-set`);
  for (let i = 0; i < questions.length; i++) {
    let question = questions[i];

    let labels = question.querySelectorAll("label");
    labels.forEach((label) => {
      let input = label.querySelector("input");
      if (input.value === shufQuestions[i].right) {
        input.parentElement.style.color = "green";
        input.parentElement.style.fontWeight = "bold";
      }
    });
  }
};

// showSectionOnClick("zero-butt", "first-section");
// showSectionOnClick("first-butt", "second-section");
document.getElementById("module-butt").addEventListener("click", function () {
  document.getElementById("section-0").classList.add("visually-hidden");
  document.getElementById("section-1").classList.add("visually-hidden");
  document.getElementById("section-2").classList.add("visually-hidden");
  document.getElementById("section-3").classList.add("visually-hidden");
  document.getElementById("section-4").classList.remove("visually-hidden");
  window.scrollBy({
    top: -1500,
    behavior: "smooth",
  });
});
