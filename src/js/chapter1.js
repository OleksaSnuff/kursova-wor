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
//===========================Тема 1
const questions1_1 = [
  {
    text: "1. Хто розробив мову програмування JavaScript?",
    right: "Брендан Айк",
  },
  {
    text: "2. Для чого широко використовується JavaScript у веб-розробці?",
    right: "Динаміки",
  },
  {
    text: "3. Що можна створювати за допомогою JavaScript крім ігор та анімацій?",
    right: "Вебдодатки",
  },
];
generateTestBlock(test1_1, questions1_1, "quiz-input", "#button1_1");

const questions1_2 = [
  {
    text: "1. Через яку об'єктну модель JavaScript дозволяє змінювати елементи вебсторінки(скорочено)?",
    right: "DOM",
  },
  {
    text: "2. Чи можна валідувати поля форми за допомогою JavaScript?",
    right: "Так",
  },
  {
    text: "3. Яка технологія дозволяє виконувати асинхронні запити на сервер?",
    right: "AJAX",
  },
];
generateTestBlock(test1_2, questions1_2, "quiz-input", "#button1_2");

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
  setLocalData("chapter1");
  iziToast.success({
    title: "Ваша кількість балів наразі складає:",
    message: `${score}`,
  });
}
//===========================Тема 1

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

  setLocalData("chapter1");
  iziToast.success({
    title: "Ваша кількість балів наразі складає:",
    message: `${score}`,
  });
};
//============================================Модальний1
window.openCode = function () {
  // Отримання вмісту з текстового поля
  const code = document.getElementById("codeInput").value;

  // Створення нового вікна браузера з вмістом коду
  const newWindow = window.open();
  newWindow.document.open();
  newWindow.document.write(
    `<html><head><title>Код</title><link rel="stylesheet" href="../css/userPage.css"></head><body><pre>` +
      code +
      "</pre></body></html>"
  );
  newWindow.document.close();
};

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
