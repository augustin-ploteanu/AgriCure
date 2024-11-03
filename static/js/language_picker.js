"use strict";

// Language strings
var MLstrings = [
    { English: "Language", Romanian: "Limba", Russian: "Язык" },
    { English: "Dark Mode", Romanian: "Mod Întunecat", Russian: "Тёмный Режим" },
    { English: "What is AgriCure?", Romanian: "Ce este AgriCure?", Russian: "Что такое AgriCure?" },
    { English: "Frequently asked questions", Romanian: "Întrebări frecvente", Russian: "Часто задаваемые вопросы" },
    { English: "Upload", Romanian: "Încarcă", Russian: "Загрузить" },
    { 
        English: "AgriCure is a simple and powerful tool that helps you identify plant diseases by analyzing a photo of your plants. Just snap a picture of the affected plant, and the app will diagnose the issue, suggest treatments, and offer care tips to keep your garden healthy. Whether you're a home gardener or a professional, it provides quick and reliable solutions to protect your plants and improve their overall health.", 
        Romanian: "AgriCure este un instrument simplu și puternic care te ajută să identifici bolile plantelor prin analizarea unei fotografii a plantelor tale. Fă o poză plantei afectate, iar aplicația va diagnostica problema, va sugera tratamente și îți va oferi sfaturi de îngrijire pentru a menține grădina sănătoasă. Fie că ești grădinar amator sau profesionist, aplicația oferă soluții rapide și de încredere pentru a proteja plantele și a le îmbunătăți starea generală.", 
        Russian: "AgriCure это простое и удобное приложение, которое помогает выявлять болезни растений с помощью анализа фотографии. Просто сделайте снимок вашего растения, и приложение поставит диагноз, предложит способы лечения и даст советы по уходу, чтобы сохранить ваш сад здоровым. Независимо от того, являетесь ли вы садоводом-любителем или профессионалом, это приложение быстро и надежно поможет защитить ваши растения и улучшить их общее состояние." 
    },
    {
        English: "How accurate is the app in identifying plant diseases?",
        Romanian: "Cât de precisă este aplicația în identificarea bolilor plantelor?",
        Russian: "Насколько точно приложение определяет болезни растений?",
    },
    {
        English: "Can I use the app offline?",
        Romanian: "Pot folosi aplicația offline?",
        Russian: "Можно ли использовать приложение офлайн?",
    },
    {
        English: "Does the app provide organic treatment options?",
        Romanian: "Oferă aplicația opțiuni de tratament organic?",
        Russian: "Предлагает ли приложение органичные методы лечения?",
    },
    {
        English: "The app uses advanced machine learning algorithms and image processing techniques to analyze plant symptoms and provide highly accurate diagnoses. While it performs well with common diseases, it's continually updated to improve accuracy for a wide range of plant species and conditions.",
        Romanian: "Aplicația folosește algoritmi avansați de învățare automată și tehnici de procesare a imaginilor pentru a analiza simptomele plantelor și a oferi diagnostice precise. Deși funcționează excelent cu boli comune, este actualizată constant pentru a îmbunătăți acuratețea pentru o gamă mai largă de specii de plante și condiții.",
        Russian: "Приложение использует передовые алгоритмы машинного обучения и методы обработки изображений для анализа симптомов растений и предоставления точных диагнозов. Хотя оно отлично справляется с распространенными заболеваниями, оно постоянно обновляется, чтобы улучшить точность для более широкого спектра видов растений и условий.",
    },
    {
        English: "The app requires an internet connection to analyze images and access the latest plant disease data. However, you can store previously diagnosed plants and treatments in your library for offline access.",
        Romanian: "Aplicația necesită o conexiune la internet pentru a analiza imaginile și a accesa cele mai recente date despre bolile plantelor. Cu toate acestea, poți stoca plantele și tratamentele diagnosticate anterior în biblioteca ta pentru acces offline.",
        Russian: "Для анализа изображений и доступа к последним данным о заболеваниях растений требуется подключение к интернету. Однако вы можете сохранить ранее диагностированные растения и методы лечения в библиотеке для доступа без интернета.",
    },
    {
        English: "Yes! The app offers a variety of treatment recommendations, including organic and environmentally friendly solutions, so you can choose the option that best suits your gardening preferences.",
        Romanian: "Da! Aplicația oferă o varietate de recomandări de tratament, inclusiv soluții organice și prietenoase cu mediul, astfel încât să poți alege opțiunea care se potrivește cel mai bine preferințelor tale de grădinărit.",
        Russian: "Да! Приложение предлагает различные рекомендации по лечению, включая органические и экологически безопасные решения, чтобы вы могли выбрать подходящий вариант в зависимости от ваших предпочтений в садоводстве.",
    },
    {
        English: "Upload an image!",
        Romanian: "Încarcă imagine!",
        Russian: "Загрузите изображение!",
    },
    {
        English: "Select Plant Type:",
        Romanian: "Selectați tipul de plantă:",
        Russian: "Выберите тип растения:",
    },
    {
        English: "Submitted Image",
        Romanian: "Imagine încărcată",
        Russian: "Загруженное изображение",
    },
    {
        English: "Result",
        Romanian: "Rezultat",
        Russian: "Результат",
    },
    {
        English: "",
        Romanian: "",
        Russian: "",
    },
    { English: "Grapes", Romanian: "Struguri", Russian: "Виноград" },
    { English: "Apple", Romanian: "Măr", Russian: "Яблоко" },
    { English: "Cucumber", Romanian: "Castravete", Russian: "Огурец" },
    { English: "Tomato", Romanian: "Roșii", Russian: "Помидор" }
];

// Default language in use
var mlrLangInUse = "English";

// Map radio button IDs to languages
var languageMapping = {
    english: "English",
    romanian: "Romanian",
    russian: "Russian"
};

// Initialize the language picker
var mlr = function ({ stringAttribute = "data-mlr-text", chosenLang = "English", mLstrings = MLstrings } = {}) {
    mlrLangInUse = chosenLang;

    // Attach event listeners to the radio buttons
    document.querySelectorAll("input[name='second-language']").forEach(radio => {
        radio.addEventListener("change", function () {
            // Get the selected language from the ID of the radio button
            mlrLangInUse = languageMapping[radio.id];
            resolveAllMLStrings();
        });
    });

    // Resolve all strings based on the chosen language
    function resolveAllMLStrings() {
        let stringsToBeResolved = document.querySelectorAll(`[${stringAttribute}]`);
        stringsToBeResolved.forEach(stringToBeResolved => {
            let originalTextContent = stringToBeResolved.textContent;
            let resolvedText = resolveMLString(originalTextContent, mLstrings);
            stringToBeResolved.textContent = resolvedText;
        });
    }
};

// Find the correct translation for each string
function resolveMLString(stringToBeResolved, mLstrings) {
    var matchingStringIndex = mLstrings.find(function (stringObj) {
        let stringValues = Object.values(stringObj);
        return stringValues.includes(stringToBeResolved);
    });
    if (matchingStringIndex) {
        return matchingStringIndex[mlrLangInUse];
    } else {
        return stringToBeResolved;
    }
}

// Initialize the language picker with default language
mlr({
    stringAttribute: "data-mlr-text",
    chosenLang: "English",
    mLstrings: MLstrings
});
