// Solutions for manage async functions
// 1. SetTimeout
// 2. Callbacks
// 3. Promises

function placeInOutput(text = '') {
  document.getElementById('output').innerText = text;
}

//             sendRequestToServer('/interview', {knowledge: ['functions', 'arrays', 'var/let difference']}, (interviewResult) => {
//                 if (interviewResult.body.passInterview) {
//                     document.getElementById('output').innerText = "Ура! Мы прошли интервью Пора звонить маме!";
//
//                     sendRequestToServer('/call-mom', {}, (momReactionResponse) => {
//                         document.getElementById('output').innerText = momReactionResponse.body.momReaction;
//                     });
//                 } else {
//                     document.getElementById('output').innerText = "Ищем дальше...";
//                 }
//             });
//         } else {
//             document.getElementById('output').innerText = "Ищем дальше...";
//         }
//     });
// });

function findVacancies(interestingSkill = "js") {
  return new Promise((resolve, reject) => {
    sendRequestToServer('/vacancies', {}, (vacanciesResponse) => {
      if (vacanciesResponse.body.vacancies.some((vacancy) => vacancy.skills.includes(interestingSkill))) {
        placeInOutput(`Интересная вакансия ${JSON.stringify(vacanciesResponse.body.vacancies[2])}`);
        resolve(vacanciesResponse.body.vacancies.find((vacancy) => vacancy.skills.includes(interestingSkill)));
      } else {
        reject('Could not find vacancies by your criteria');
      }
    });
  });
}

function sendCV(vacancyId, skills = []) {
  return new Promise((resolve, reject) => {
    sendRequestToServer('/send-cv', {vacancyId, skills}, (inviteResponse) => {
      if (inviteResponse.body.inviteToInterview) {
        placeInOutput('Ура! Мы идем на интервью! 🧑🏻‍💻');
        resolve();
      } else {
        placeInOutput('Мы никому не нужны... Жизнь - боль...');
        reject();
      }
    });
  });
}

function goToTheInterview(knowledge = []) {
  return new Promise((resolve, reject) => {
    sendRequestToServer('/interview', {knowledge}, (verdictResponse) => {
      if (verdictResponse.body.verdict) {
        placeInOutput("Ура! Мы прошли интервью Пора звонить маме!");
        resolve();
      } else {
        placeInOutput('Мы никому не нужны... Жизнь - боль...');
        reject();
      }
    });
  });
}

findVacancies("vanilla.js")
  .then((interestingVacancy) => sendCV(interestingVacancy.id, ['html', 'css', 'js', 'vanilla.js']))
  .then(() => goToTheInterview(['functions', 'arrays', 'var/let difference']))
  .then(() => {});
