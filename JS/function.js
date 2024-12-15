

// Определяем переменные для элементов в DOM
const dane = JSON.parse(localStorage.getItem("wybraneZegary")) || [];  // Загружаем данные из localStorage или используем пустой массив
const selectMiasta = document.getElementById("czasDadaj");
const dadajCzas = document.getElementById("dadajCzas");
const wybraneLocacje = document.getElementById("wybraneLocacje");  // Убедитесь, что этот элемент существует в HTML

// Функция для добавления городов в список выбора
const zaladujdane = () => {
    czas.forEach((strefa) => {
        const opcija = document.createElement("option");
        opcija.value = strefa.miasto;
        opcija.textContent = strefa.miasto;
        selectMiasta.appendChild(opcija);
    });
};

// Функция для добавления города
const dadajlokacije = () => {
    const wbrany = selectMiasta.value;
    if (!dane.includes(wbrany)) {
        dane.push(wbrany);
        localStorage.setItem("wybraneZegary", JSON.stringify(dane));  // Сохраняем в localStorage
        wyswietlDane();  // Обновляем отображение
    }
};

// Функция для удаления города
const usunCas = (miastoUsun) => {
    const index = dane.indexOf(miastoUsun);  // Находим индекс города
    if (index !== -1) {
        dane.splice(index, 1);  // Удаляем город из массива
        localStorage.setItem("wybraneZegary", JSON.stringify(dane));  // Сохраняем обновленный массив
        wyswietlDane();  // Обновляем отображение
    }
};

// Функция для отображения данных (города и их времени)
function wyswietlDane() {
    wybraneLocacje.innerHTML = '';  // Очищаем текущие данные

    dane.forEach((localizacja) => {
        const localizacjaLower = localizacja.toLowerCase().trim();  // Приводим к нижнему регистру и убираем пробелы
        console.log(`Поиск для города: "${localizacjaLower}"`);  // Логируем город, для которого ищем данные

        const strefaCzasowa = czas.find((st) => st.miasto.toLowerCase().trim() === localizacjaLower);

        if (!strefaCzasowa) {
            console.error(`Не найдена информация для города: ${localizacja}`);
            return;  // Прерываем выполнение этой итерации, если города нет в списке
        }

        // Вычисляем локальное время с учетом часового пояса
        const czasLocalny = new Date(
            new Date().getTime() + strefaCzasowa.czas * 3600000  // Вычисляем локальное время
        ).toLocaleTimeString();

        // Создаем элемент списка
        const punkt = document.createElement("li");
        const span = document.createElement("span");
        span.textContent = `${localizacja} - ${czasLocalny}`;

        const button = document.createElement("button");
        button.textContent = "Удалить";
        button.addEventListener("click", () => usunCas(localizacja));  // Удаляем город при нажатии кнопки

        punkt.appendChild(span);
        punkt.appendChild(button);
        wybraneLocacje.appendChild(punkt);
    });
}

// Обновляем данные каждую секунду
setInterval(wyswietlDane, 1000);

// Загружаем данные и отображаем их
zaladujdane();
wyswietlDane();

// Добавляем обработчик для кнопки добавления города
dadajCzas.addEventListener("click", dadajlokacije);
