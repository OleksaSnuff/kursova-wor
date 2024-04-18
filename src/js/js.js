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
//===========копіювання
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
//======================= показ секції
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
//===========================Тема 2
const questions1 = [
  {
    text: "Скорочена назва мови програмування JavaScript?",
    right: "JS",
  },
  {
    text: "Контейнери, всередині яких ви можете зберігати значення - це?",
    right: "Змінні",
  },
  {
    text: "Який оператор(символ) присвоєння в мові JavaScript?",
    right: "=",
  },
];
const questions2 = [
  {
    text: "Конструкція, що дозволяє перевірити, чи є вираз істинним чи хибним?",
    right: "if",
  },
  {
    text: "Який необов'язковий блок може містити інструкція if?",
    right: "else",
  },
  {
    text: "Чи виконається умова при виразі в if - !true? 'Так' або 'Ні'",
    right: "Ні",
  },
];
const questions3 = [
  {
    text: "Яким методом можна додати новий елемент в кінець масиву?",
    right: "push",
  },
  {
    text: "Яким індексом отримати перший елемент масиву?",
    right: "0",
  },
  {
    text: "Яка властивість дозволяє отримати кількість елементів у масиві?",
    right: "length",
  },
];

//===========================Тема 2
// Використання функції для першого блоку
generateTestBlock(test, questions1, "quiz-input", "#button");
// Використання функції для другого блоку
generateTestBlock(test_1, questions2, "quiz-input", "#button1");
// Використання функції для 3 блоку
generateTestBlock(test2, questions3, "quiz-input", "#button2");
//===========================Тема 3

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
    if (input.value === "") {
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
  setLocalData("chapter2");
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
  setLocalData("chapter2");
  iziToast.success({
    title: "Ваша кількість балів наразі складає:",
    message: `${score}`,
  });
};
