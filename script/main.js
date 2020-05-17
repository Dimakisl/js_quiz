document.addEventListener('DOMContentLoaded', function(){
	'use strict'

	const  btnOpenModal = document.querySelector('#btnOpenModal');
	const modalBlock = document.querySelector('#modalBlock');
	const closeModal = document.querySelector('#closeModal');
	const questionTitle = document.querySelector('#question');
	const formAnswers = document.querySelector('#formAnswers');

	const nextButton = document.querySelector('#next');
	const prevButton = document.querySelector('#prev');

	const sendButton = document.querySelector('#send');



const questions = [
    {
        question: "Какого цвета бургер?",
        answers: [
            {
                title: 'Стандарт',
                url: './image/burger.png'
            },
            {
                title: 'Черный',
                url: './image/burgerBlack.png'
            }
        ],
        type: 'radio'
    },
    {
        question: "Из какого мяса котлета?",
        answers: [
            {
                title: 'Курица',
                url: './image/chickenMeat.png'
            },
            {
                title: 'Говядина',
                url: './image/beefMeat.png'
            },
            {
                title: 'Свинина',
                url: './image/porkMeat.png'
            }
        ],
        type: 'radio'
    },
    {
        question: "Дополнительные ингредиенты?",
        answers: [
            {
                title: 'Помидор',
                url: './image/tomato.png'
            },
            {
                title: 'Огурец',
                url: './image/cucumber.png'
            },
            {
                title: 'Салат',
                url: './image/salad.png'
            },
            {
                title: 'Лук',
                url: './image/onion.png'
            }
        ],
        type: 'checkbox'
    },
    {
        question: "Добавить соус?",
        answers: [
            {
                title: 'Чесночный',
                url: './image/sauce1.png'
            },
            {
                title: 'Томатный',
                url: './image/sauce2.png'
            },
            {
                title: 'Горчичный',
                url: './image/sauce3.png'
            }
        ],
        type: 'radio'
    }
]; 

	btnOpenModal.addEventListener('click', ()  => {
	modalBlock.classList.add('d-block');
	playTest();
	})

	closeModal.addEventListener('click', () => {
		modalBlock.classList.remove('d-block');
	})

	document.addEventListener('click', (e) => {
		if(!e.target.closest('.modal-dialog') && !e.target.closest('.openModalButton') && !e.target.closest('.burger') ){
			modalBlock.classList.remove('d-block');
		}
	})

	const playTest = () => {

		const finalAnswers = [];
		const obj = {};

		let numberQuestion = 0;

		const renderAnswers = (idx) => {
			questions[idx].answers.forEach((answer) => {
				const answerItem = document.createElement('div');
				answerItem.classList.add('answers-item', 'd-flex', 'justify-content-center');
				answerItem.innerHTML = `
					<input type="${questions[idx].type}" id="${answer.title}" name="answer" class="d-none" value="${answer.title}">
	                <label for="${answer.title}" class="d-flex flex-column justify-content-between">
	                  <img class="answerImg" src="${answer.url}" alt="burger">
	                  <span>${answer.title}</span>
	                </label>
				`;
				formAnswers.appendChild(answerItem);
			})
		}

		const renderQustions = (idx) => {
			formAnswers.innerHTML = '';

			if(numberQuestion >=0 && numberQuestion <= questions.length - 1){
				questionTitle.textContent = `${questions[idx].question}`;
				renderAnswers(idx);
				nextButton.classList.remove('d-none');
				prevButton.classList.remove('d-none');
				sendButton.classList.add('d-none');
			}

			if(numberQuestion === 0){
			prevButton.classList.add('d-none');
			}

			if(numberQuestion === questions.length){
				nextButton.classList.add('d-none');
				prevButton.classList.add('d-none');
				sendButton.classList.remove('d-none');
				questionTitle.textContent = ``;

				formAnswers.innerHTML = `
					<div class=""form-group">
						<label for="numberPhone">Введите ваш телефон</label>
						<input type="phone" class="form-control" id="numberPhone">
					</div>
				`;

				const numberPhone = document.querySelector('#numberPhone');
				numberPhone.addEventListener('input', (e) => {
					//e.target.value = e.target.value.replace(/\D/, "") //запрет ввода букв и символов
					e.target.value = e.target.value.replace(/[^0-9+-]/, ""); //запрет ввода букв
				})
			}

			if(numberQuestion === questions.length + 1){
				sendButton.classList.add('d-none');
					formAnswers.textContent = 'Спасибо за ваш заказ!';

					for (let key in obj){
						let newObj = {};
						newObj[key] = obj[key];
						finalAnswers.push(newObj);
					}

					setTimeout(() => {
						modalBlock.classList.remove('d-block');
					}, 5000)
			}

		}

		renderQustions(numberQuestion);

		const checkAnswer = () => {
			
			const inputs = [...formAnswers.elements].filter((input) => input.checked || input.id === 'numberPhone');

			inputs.forEach((input, index) => {
				if(numberQuestion >= 0 && numberQuestion <= questions.length -1){
					obj[`${index}_${questions[numberQuestion].question}`] = input.value;
				}
				if(numberQuestion === questions.length){
					obj[`Номер телефона`] = input.value;
				}

			})
		}

		nextButton.onclick = () => {
			checkAnswer();
			numberQuestion++;
			renderQustions(numberQuestion);
		}

		prevButton.onclick =  () => {
			numberQuestion--;
			renderQustions(numberQuestion);
		}

		sendButton.onclick = () => {
			numberQuestion++;
			renderQustions(numberQuestion);
			checkAnswer();
			console.log(finalAnswers);

		}
		

	}
})
