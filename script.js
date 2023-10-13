const apiUrl = 'https://5d76bf96515d1a0014085cf9.mockapi.io/quiz';
        let quizData = [];

        async function fetchQuizData() {
            try {
                const response = await fetch(apiUrl);
                quizData = await response.json();
                return quizData;
            } catch (error) {
                console.error('Error fetching quiz data:', error);
            }
        }

        async function startQuiz() {
            await fetchQuizData();
            const questionsContainer = document.getElementById('questions-container');

            if (quizData.length > 0) {
                quizData.forEach((question, index) => {
                    const questionDiv = document.createElement('div');

                    const questionElement = document.createElement('p');
                    questionElement.textContent = `Q${index + 1}. ${question.question}`;
                    questionDiv.appendChild(questionElement);

                    question.options.forEach((option, optionIndex) => {
                        const optionElement = document.createElement('label');
                        optionElement.classList.add('option-label');

                        const radioButton = document.createElement('input');
                        radioButton.type = 'radio';
                        radioButton.name = `options${index}`;
                        radioButton.value = optionIndex;

                        const optionText = document.createElement('span');
                        optionText.textContent = option;

                        optionElement.appendChild(radioButton);
                        optionElement.appendChild(optionText);
                        questionDiv.appendChild(optionElement);

                    });
                    const hrElement = document.createElement('hr');
                    questionDiv.appendChild(hrElement);

                    questionsContainer.appendChild(questionDiv);
                });
            }
        }

        let score = 0;

        function calculateScore() {
            score = 0;

            for (let i = 0; i < quizData.length; i++) {
                const selectedOption = document.querySelector(`input[name="options${i}"]:checked`);

                if (selectedOption) {
                    const selectedAnswer = parseInt(selectedOption.value);
                    const correctAnswer = quizData[i].answer;

                    if (selectedAnswer === correctAnswer) {
                        score++;
                    }
                }
            }

            const scoreElement = document.getElementById('score');
            scoreElement.textContent = `${score}/${quizData.length}`;
        }

        document.addEventListener('DOMContentLoaded', startQuiz);