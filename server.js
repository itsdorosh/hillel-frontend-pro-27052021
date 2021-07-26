function randomTiming() {
  return Math.random() * 1500 + 1000;
}

function sendRequestToServer(
  url = '',
  params = null,
  onResponseCallback = () => {},
) {
  const response = {code: 0, body: {}}; // codes 200 & 404
  switch (url) {
    case "/vacancies": {
      setTimeout(() => {
        response.code = 200;
        response.body.vacancies = [
          {id: 0, title: "Junior Front-end (React)", years: 1, skills: ['js', 'react', 'typescript']},
          {id: 1, title: "Junior Front-end (Angular)", years: 1, skills: ['js', 'angular', 'typescript']},
          {id: 2, title: "Junior Front-end (JavaScript)", years: 0.5, skills: ['js', 'vanilla.js']},
        ];
        onResponseCallback(response);
      }, randomTiming());
      break;
    }

    case "/send-cv": {
      setTimeout(() => {
        response.code = 200;
        response.body.inviteToInterview = params.skills.includes('vanilla.js');
        onResponseCallback(response);
      }, randomTiming());
      break;
    }

    case "/interview": {
      setTimeout(() => {
        response.code = 200;
        response.body.verdict = params.knowledge.includes('var/let difference');
        onResponseCallback(response);
      }, randomTiming());
      break;
    }

    case "/call-mom": {
      setTimeout(() => {
        response.code = 200;
        response.body.momsReaction = "Ура, ура, ура! 🥰";
        onResponseCallback(response);
      }, randomTiming());
      break;
    }

    default: {
      setTimeout(() => {
        response.code = 404;
        response.body.message = "Content not Found!";
        onResponseCallback(response);
      }, randomTiming());
    }
  }
}
