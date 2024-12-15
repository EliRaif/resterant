
// מצביע לתיבת החיפוש
 let Search1 = document.getElementById('Search_eat');

// מצביע לכפתור החיפוש
let button = document.getElementById('myButton');

// מצביע לחלון תוצאות חיפוש בצד שמאל
let search_results = document.getElementById('left-column1');

// מצביע לחלון רכיבי מתכון אמצע העמוד
let recipeDetails = document.getElementById('left-column2');

// מצביע לחלון רשימת קניות בצד ימין
let shopping_list = document.getElementById('left-column3');

//מצביע לדיו שנמצא בתוך הדיו של המועדפים
let ad_heart = document.querySelector('.content');

// משתנה שבהמשך שומר בו את המידע על המתכון שחזר מהבקשה 
let dataInfo;

//מונה שמחזיק את מספר הסועדים למתכון על פי מה שחזר מהבקשה
let count;

// מאזין ללחיצת כפתור חיפוש של המשתמש ומפעיל א ת פונקציית חיפוש והצגת מתכונים לחלון צד שמאל של המסך
button.addEventListener('click', Search_eat1);




// פונקציה לחיפוש מתכון שמופעלת אחרי הזנת תוכן ולחיצת כפתור חיפוש ע"י המשתמש
function Search_eat1() {

    //אם נגמרים הרשאת הבקשות השתמש במפתח החירום הזה
    // let ap2 = 'c2c7d38d72c64fea9b6652a1c1cd759a'

    //מחזיק את התוכן שהוזן בתיבת חיפוש על ידי המשתמש 
    let ochel = Search1.value.trim();

    //מפתח גישה לדאטה
    let apiKey = '6e8a5c674f604d4b8b31e83efc568130';

    //מחזיק את הקישור לדאטה + הערך שהמשתמש הזין + המפתח גישה לדאטה
    let http1 = `https://api.spoonacular.com/recipes/complexSearch?query=${ochel}&apiKey=${apiKey}`;


    //בדיקה אם בוצע חיפוש ללא הזנת ערך 
    if (ochel === "") {

        alert("אנא הזן מתכון לחיפוש.");

        return;
    }


    //שליחת הבקשה עם כל הנתונים
    fetch(http1)

        .then(response => {

            if (!response.ok) {

                throw new Error('משהו השתבש עם הבקשה!');
            }

            return response.json();
        })

        //במישה והבקשה חזרה תקין התוכן חוזר למשתנה בשם דאטה
        .then(data => {


            //בודק האם קיים המתכון שהתבקש במידה ולא זה יקפיץ הודעה למשתמש
            if (data.results.length === 0) {
                alert("לא נמצאו תוצאות עבור החיפוש שלך.")
                return;
            }


            //מנקה את כל התוכן שקיים בחלון צד שמאל של תוצאות חיפוש
            search_results.innerHTML = '';

            //לולאה שרצה ומזריקה לחלון תוצאות חיפוש בצד שמאל - תמונה + שם המתכון המתאים לבקשת החיפוש של המשתמש
            //  הוא רץ כמועת פעמים לפי הגודל שהוא קיבל חזרה הבדיקה נעשית על המשתנה בשם דאטה שבו יש מערך אובייקטים בשם ריזולטס
            for (let i = 0; i < data.results.length; i++) {

                //מייצר תגית דיו חדש שהולך להחזיק את כל פרטי המתכון
                const eater = document.createElement('div');

                //מייצר תגית תמונה חדש שהולך להזיק את תמונת המתכון
                const img1 = document.createElement('img');

                //מייצר תגית פסקה חדש שהולך להזיק את שם המתכון
                const eater1 = document.createElement('p');

                //מוסיף לתגית מסוג תמונה את תמונת המתכון על פי האינדקס במערך האובייקטים
                img1.src = data.results[i].image;

                //מוסיף לתגית מסוג פסקה את שם המתכון על פי האינדקס במערך האובייקטים
                eater1.textContent = data.results[i].title;

                //מוסיף לתגית מסוג דיו את מספר המזהה המתכון על פי האינדקס במערך האובייקטים
                eater.id = data.results[i].id;

                //מוסיף לתגית מסוג התמונה, פונקציית האזנה, שבאם המשתמש ילחץ על התמונה 
                // זה ישלח לפונקציה של הצגת רכיבי המתכון את המספר המזהה של המתכון על פי מה ששמרנו  לתמונה וזה יציג  בחלונית באמצע העמוד את רכיבי המתכון ועוד
                img1.addEventListener('click', () => {

                    Recipe_information(eater.id);
                });

                //מוסיף לדיו שיצרנו אמש את התג של תמונת המתכון שיצרנו אמש
                eater.appendChild(img1);

                //מוסיף לדיו שיצרנו אמש את התג של שם  המתכון שיצרנו אמש
                eater.appendChild(eater1);


                img1.style.width = "400px"
                img1.style.height = "150px"
                eater.style.border = "2px solid black";
                eater.style.marginBottom = "10px";
                eater.style.textAlign = "center"
                eater1.style.textAlign = "center"


                //מכניס כילד, את הדיו שיצרנו אמש ומכיל את כל הנתונים למשתנה בשם סארטש ריזולט שמצביע לחלון השמאלי בעמוד וזה יציג את כל המתכונים השווים לחיפוש    
                search_results.appendChild(eater);
            }
        })

        .catch(error => {
            console.error('שגיאה:', error);
        });
}




// פונקציה להצגת רכיבי המתכון בחלונית האמצעית שמופעלת אחרי שהמשתמש לחץ על אחד המתכונים בחלון בצד שמאל 
// הפונקציה מקבלת את המספר המזהה של המתכון ששמרנו למתכון בעת יצירת חלונית המתכונים
function Recipe_information(id) {

    //אם נגמרים הרשאת הבקשות השתמש במפתח החירום הזה
    // let ap2 = 'c2c7d38d72c64fea9b6652a1c1cd759a'

    // משתנה ששומר את המספר מזהה של המתכון שנלחץ וזה התקבל לפה בעת קריאת הפונקציה
    let IdMatcon = id;

    //מפתח גישה לדאטה
    let apiKey = '6e8a5c674f604d4b8b31e83efc568130';

    //מחזיק את הקישור לדאטה + המספר מזהה שהתקבל לפונקציה בעת לחיצה על אחד מתמונות המתכונים + המפתח גישה לדאטה
    let http1 = `https://api.spoonacular.com/recipes/${IdMatcon}/information?apiKey=${apiKey}`;

    //שליחת הבקשה עם כל הנתונים
    fetch(http1)

        .then(response => {

            if (!response.ok) {

                throw new Error('משהו השתבש עם הבקשה!');
            }

            return response.json();
        })

        //במידה והבקשה חזרה תקין התוכן חוזר למשתנה בשם דאטה
        .then(data => {

            //שומר את האובייקט של כל המידע על המתכון שנלחץ על ידי המשתמש וזה חזר על פי הבקשה    
            dataInfo = data;

            //נותן למשתנה את כמות הסועדים שהמתכון מתאים לה 
            count = dataInfo.servings;

            // ניקוי התוכן  בחלונית האמצעית
            recipeDetails.innerHTML = '';

            //מייצר תגית מסוג אייטש2 שבו יוצג שם המתכון שמוצג עבור החלונית האמצעית
            const recipeTitle = document.createElement('h2');

            //מעדכן למשתנה אייטש2 את השם של המתכון שמוצג בחלונית האמצעית
            recipeTitle.textContent = dataInfo.title;
            recipeTitle.style.textAlign = 'center';

            //מכניס כילד,למשתנה שמצביע לחון האמצעי, את התג מסוג אייטש2 שיצרנו אמש ומכיל את שם המתכון שנלחץ וכעת יוצג בחלון האמצעי   
            recipeDetails.appendChild(recipeTitle);

            //מייצר תגית מסוג תמונה שבו יוצג תמונת המתכון שנלחץ שמייוצג כעת בחלון האמצעי
            const recipeImage = document.createElement('img');

            //מעדכן למשתנה מסוג תמונה שנוצר אמש את התמונה של המתכון שמוצג כעת בחלונית האמצעית
            recipeImage.src = dataInfo.image;
            recipeImage.style.width = '100%'; // גודל התמונה מתואם לעמודה

            //מכניס כילד,למשתנה שמצביע לחון האמצעי, את התג מסוג תמונה שיצרנו אמש ומכיל את תמונת המתכון שנלחץ וכעת יוצג בחלון האמצעי   
            recipeDetails.appendChild(recipeImage);


            // מייצר תג מסוג דיו שהוא הולך להכיל את רכיבי המתכון שמוצג בחלון האמצעי
            const ingredientsListDiv = document.createElement('div');
            ingredientsListDiv.style.marginTop = '20px';

            // מייצר תגית מסוג  דיו שמוצג בראש העמוד של דף הרכיבים
            let header_recipeDetails = document.createElement('header');

            //מזריק לתגית שיצרנו אמש את זמן בישול  המתכון + כמות הסועדים להם מותאם המתכון
            header_recipeDetails.innerHTML = `⏰ ${dataInfo.readyInMinutes} MINUTES 👨‍🌾 <span id="servings-count">${count}</span> SERVINGS`;

            //  מייצר תג מסוג כפתור להגדלת כמות  הסועדים
            const plus = document.createElement('button');

            //מעדכן את הסמל שיוצק על כפתור הפלוס
            plus.innerHTML = "+"

            //מוסיף לתגית מסוג כפתןר הפלוס, פונקציית האזנה, שבאם המשתמש ילחץ עליו 
            // זה  יעדכן את המשתנה מסוג כאונט את מספר הסועדים לפי מספר הלחיצות וזה יציג את זה במסך עם כמות הסועדים המעודכן
            plus.addEventListener('click', () => {

                count = count + 1;
                document.getElementById('servings-count').textContent = count;

                //שולח את הדיו שיוצר עבור הצגת הרכיבים, -------לפונקציה שתפקידה לייצג את רכיבי המתכון בחלון האמצעישיעדכן את הרכיבים מחדש על פי הלחיצת הכפתור
                AdReciv(ingredientsListDiv)
            });

            // מייצר תג מסוג כפתור להקטנת כמות הסועדים
            const minus = document.createElement('button');
            minus.innerHTML = "-"

            //מוסיף לתגית מסוג כפתןר המינוס, פונקציית האזנה, שבאם המשתמש ילחץ עליו 
            // זה  יעדכן את המשתנה מסוג כאונט את מספר הסועדים לפי מספר הלחיצות וזה יציג את זה במסך עם כמות הסועדים המעודכן
            minus.addEventListener('click', () => {

                if (count == 1)
                    return

                count = count - 1;
                document.getElementById('servings-count').textContent = count;

                //שולח את הדיו שיוצר עבור הצגת הרכיבים, -------לפונקציה שתפקידה לייצג את רכיבי המתכון בחלון האמצעי שיעדכן את הרכיבים מחדש על פי הלחיצת הכפתור
                AdReciv(ingredientsListDiv)
            });

            //מכניס את כפתור הפלוס כילד,לדיו שיצרנו עבור החזקת הכפתורים + זמן בישול + כמות הסועדים 
            header_recipeDetails.appendChild(plus)

            //מכניס את כפתור המינוס כילד,לדיו שיצרנו עבור החזקת הכפתורים + זמן בישול + כמות הסועדים  
            header_recipeDetails.appendChild(minus)

            //מכניס את הדיו שיצרנו עבור החזקת הכפתורים + זמן בישול + כמות הסועדים כילד,למצביע הראשי לחלון האמצעי 
            recipeDetails.appendChild(header_recipeDetails);


            // מייצר תגית מסוג  דיו שמוצג בתחתית  העמוד של דף הרכיבים
            const footer_recipeDetails = document.createElement('footer');

            //  מייצר תג מסוג כפתור לשמירת המתכון למועדפים שלי
            const Add_to_favorites = document.createElement('button');

            //מעדכן מה יהיה השם של הכפתור
            Add_to_favorites.innerHTML = "  ❤️ הוספה למועדפים"


            //מוסיף לתגית מסוג כפתןר המועדפים, פונקציית האזנה, שבאם המשתמש ילחץ עליו זה יוסיף למועדפים את המתכון
            Add_to_favorites.addEventListener('click', () => {


                //מייצר תגית דיו חדש שהולך להחזיק את כל פרטי המתכון
                const eater = document.createElement('div');

                //מייצר תגית תמונה חדש שהולך להזיק את תמונת המתכון
                const img1 = document.createElement('img');

                //מייצר תגית פסקה חדש שהולך להזיק את שם המתכון
                const eater1 = document.createElement('p');

                //נותן למשתנה את המספר מזהה של תמונת המתכון שהתווסף למועדפים
                eater.id = dataInfo.id;

                //נותן למשתנה את התמונה של המתכון שהתווסף למועדפים
                img1.src = dataInfo.image;

                //נותן למשתנה את השם של המתכון שהתווסף למועדפים
                eater1.textContent = dataInfo.title;

                //מטסיף כפתור מחיקה שיוצג ליד כל מתכון שנשמר למועדפים  למקרה שירצה למחוק מהרשימה
                const deleteBtn = document.createElement('button');

                //התמונה שתוצג על כפתור המחיקה
                deleteBtn.textContent = '🚮';
                deleteBtn.style.fontSize = '30px'; // שינוי גודל הטקסט (האימוג'י) ל-24 פיקסלים
                deleteBtn.style.marginLeft = '10px';
                deleteBtn.style.backgroundColor = 'white';

                //מוסיף לתגית מסוג כפתןר מחיקה במועדפים, פונקציית האזנה, שבאם המשתמש ילחץ עליו זה ימחק מהמועדפים את המתכון
                deleteBtn.addEventListener('click', () => {

                    eater.remove();

                    //מעדכן את המשתמש שהפריט נמחק למועדפים
                    alert('!הפריט שלך נמחק מהמועדפים ')
                });

                //מוסיף לתגית מסוג תמונה  במועדפים, פונקציית האזנה, שבאם המשתמש ילחץ עליו זה ישלח לפונקציה של הרכיבים את המזהה והוא יציג זאת שוב בחלון האמצעי 
                img1.addEventListener('click', () => {
                    Recipe_information(eater.id);
                });

                //מוסיף את הכפתור מחיקת מתכון מועדף לדיו שהולך להחזיק את כל המתכון המועדף
                eater.appendChild(deleteBtn)

                //מוסיף את תמונת המתכון מועדף לדיו שהולך להחזיק את כל המתכון המועדף
                eater.appendChild(img1)

                //מוסיף את שפ המתכון המועדף לדיו שהולך להחזיק את כל המתכון המועדף
                eater.appendChild(eater1)

                //מזריק את כל הדיו שהכנו עם כל פרטי המתכון המועדף למשתנה שמצביע לדיו חלונית המועדפים ןמעכשיו זה יוצג למשתמש
                ad_heart.appendChild(eater)

                //מעדכן את המשתמש שהפריט התווסף למועדפים
                alert('!הפריט שלך התווסף למועדפים')
            });


            //  מייצר תג מסוג כפתור להוספת המתכון לרשימת הקניות שלי
            const Add_to_shopping_list = document.createElement('button');

            //מעדכן מה יהיה השם של הכפתור
            Add_to_shopping_list.innerHTML = "הוספה לרשימת הקניות"


            //מוסיף לתגית מסוג כפתור הוספה לרשימת קניות, פונקציית האזנה, שבאם המשתמש ילחץ עליו זה יוסיף את הרכיבים לסל קניות בחלון הימני
            Add_to_shopping_list.addEventListener('click', () => {

                //מרוקן את כל התוכן שנמצא כעת בסל קניות בחלון הימני
                shopping_list.innerHTML = '';

                //יוצר תג מסוג רשימה שבו הולכים להכניס כילד את כל מה שנוצר עבור רשימת הקניות וזה אחכ יוזרק לחלון הראשי בצד ימין
                const shopping = document.createElement('ul');
                // shopping_list.appendChild(shopping);

                //מתחיל לרוץ על השתנה שלנו ששמרנו אצלו את האבייקש עם מידע על המתכון הספציצפי
                dataInfo.extendedIngredients.forEach(ingredient => {

                    //יוצר תגית רשימה שאליו הולכים להזריק הכל והוא יזורק ליו אל שיצרנו
                    const li = document.createElement('li');
                    li.style.border = "2px solid red";
                    li.style.marginBottom = "10px";
                    li.style.textAlign = "center";
                    li.style.listStyleType = 'none';
                    li.style.paddingTop = '10px';    // ריפוד 10 פיקסלים בחלק העליון
                    li.style.paddingRight = '5px';  // ריפוד 20 פיקסלים בצד ימין
                    li.style.paddingBottom = '10px'; // ריפוד 10 פיקסלים בחלק התחתון
                    li.style.paddingLeft = '5px';   // ריפוד 20 פיקסלים בצד שמא

                    //מייצר תגית מסוג ספאן שהוא הולך לקבל את שם המתכון
                    const name = document.createElement('span');

                    //מכניס לתגית שיצרנו אמש את שם המתכון על פי מה שהוא אוחז כרעג בלולאה
                    name.textContent = ` ${ingredient.name} `;
                    name.style.marginRight = "10px";

                    //מייצר תגית מסוג בלוק שאליו הולכים להזריק את כפתורי פלוס מינוס וכן את התיבת שמחזיק את הערך\כמות רכיב
                    const quantityWrapper = document.createElement('div');
                    quantityWrapper.style.display = 'inline-flex';
                    quantityWrapper.style.alignItems = 'center';

                    //מייצר תגית מסוג כפתור להורדת כמות הרכיב ברשית קניות לרכיב הספציפי
                    const decrementBtn = document.createElement('button');

                    //מעדכן מה יהיה הציור על הכפתור
                    decrementBtn.textContent = '↓';
                    decrementBtn.style.margin = '0 5px';
                    decrementBtn.style.padding = '5px';
                    decrementBtn.style.fontSize = '16px';
                    decrementBtn.style.backgroundColor = 'black';  // שינוי צבע הרקע לשחור

                    //מייצר תגית מסוג תיבת טקסט שבו יוצק הכמות של הרכיב
                    const quantity = document.createElement('input');

                    //מגדיר שהתגית תחזיק ערך מסוג טקטס
                    quantity.type = 'text';

                    //מכניס לתגית שיצרנו אמש את שם כמות הרכיב על פי מה שהוא מקבל מהאובייקט כפול כמות הסועדים כשהתווסף לרישמת קניות
                    quantity.value = `${(ingredient.amount / dataInfo.servings) * count}`;
                    quantity.style.width = '50px';
                    quantity.style.textAlign = 'center';
                    quantity.style.margin = '0 5px';
                    quantity.style.border = '1px solid #ccc';
                    quantity.style.padding = '5px';
                    quantity.readOnly = true; // מניעת עריכה ישירה של התיבה

                    //מייצר תגית מסוג כפתור להעלאת כמות הרכיב ברשית קניות לרכיב הספציפי
                    const incrementBtn = document.createElement('button');

                    //מעדכן מה יהיה הציור על הכפתור
                    incrementBtn.textContent = '↑';
                    incrementBtn.style.margin = '0 5px';
                    incrementBtn.style.padding = '5px';
                    incrementBtn.style.fontSize = '16px';
                    incrementBtn.style.backgroundColor = 'black';  // שינוי צבע הרקע לשחור

                    //מוסיף לתגית מסוג כפתור הקטנת כמות רכיב מסל הקניות, פונקציית האזנה, שבאם המשתמש ילחץ עליו זה יעדכן את כמות הרכיב בתיבת הטקטס על פי החישוב
                    decrementBtn.addEventListener('click', () => {

                        //מייצר משתנה ששולף את הערך\כמות הרכיב שנמצא בתוך התיבת טקטס וממיר אותו למספר עשרוני
                        let currentAmount = parseFloat(quantity.value);

                        //אם הכמות בתיבת טקטסט עדיין עומדת מעל 0
                        if (currentAmount > 0) {

                            //מעדכן למשתנה את הערך שלו פחות  - הכמות המקורית חלקח כמות הסועדים המקורית
                            currentAmount -= (ingredient.amount / dataInfo.servings);

                            // אם אחרי ההורדה הכמות היא פחות מ-0, תגדיר את הכמות כ-0
                            if (currentAmount < 0) {
                                currentAmount = 0;
                            }

                            //שולח בחזרה לתיבת טקטס את הערך המעודכן לאחר השינוי
                            quantity.value = currentAmount.toFixed(3);
                        }
                    });

                    //מוסיף לתגית מסוג כפתור הגדלת כמות רכיב מסל הקניות, פונקציית האזנה, שבאם המשתמש ילחץ עליו זה יעדכן את כמות הרכיב בתיבת הטקטס על פי החישוב
                    incrementBtn.addEventListener('click', () => {

                        //מייצר משתנה ששולף את הערך\כמות הרכיב שנמצא בתוך התיבת טקטס וממיר אותו למספר עשרוני
                        let currentAmount = parseFloat(quantity.value);

                        //מעדכן למשתנה את הערך שלו פלוס  - הכמות המקורית חלקח כמות הסועדים המקורית
                        currentAmount += (ingredient.amount / dataInfo.servings);

                        //שולח בחזרה לתיבת טקטס את הערך המעודכן לאחר השינוי
                        quantity.value = currentAmount.toFixed(3);
                    });

                    //מוסיף כילד את כפתור ההורדת כמות רכיב -  לדיו שיצרנו עבור החזקת הכפתורים והתיבת טקטסט
                    quantityWrapper.appendChild(decrementBtn);

                    //מוסיף כילד את תיבת הטקטס של כמות הרכיב   -  לדיו שיצרנו עבור החזקת הכפתורים והתיבת טקטסט
                    quantityWrapper.appendChild(quantity);

                    //מוסיף כילד את כפתור העלאת כמות רכיב -  לדיו שיצרנו עבור החזקת הכפתורים והתיבת טקטסט
                    quantityWrapper.appendChild(incrementBtn);

                    //מייצר כפתור מחיקה עבור הרכיב הספציפי בסל הקניות
                    const deleteBtn = document.createElement('button');

                    //מעדכן מה יהיה הציור על הכפתור
                    deleteBtn.textContent = '🚮';
                    deleteBtn.style.fontSize = '30px'; // שינוי גודל הטקסט (האימוג'י) ל-24 פיקסלים
                    deleteBtn.style.marginLeft = '10px';
                    deleteBtn.style.backgroundColor = 'white';

                    //מוסיף האזנה ללחיצת הכפתור מחיקה ואז הוא מוחק את כל התג של ה אל איי שהוא מחזיק את הרכיב
                    deleteBtn.addEventListener('click', () => {
                        li.remove();
                    });

                    //מוסיף לתג אל איי את שם המתכון
                    li.appendChild(name);

                    //מוסיף לתג אל איי את הדיו שמחזיק את הכפתורים ואת התיבת טקטסט ערך רכיב
                    li.appendChild(quantityWrapper);

                    //מוסיף לתג אל איי את כפתור המחיקה
                    li.appendChild(deleteBtn);

                    //מוסיף לתג הרשאי של רשימה את האל איי ועכשיו הכל מוכן
                    shopping.appendChild(li);

                    //מוסיף לשמתנה הרשאי שאחראי על החלון הימני את התוצר שקרה ואז זה מוזק לחלון הימני רשימת קניות
                    shopping_list.appendChild(shopping);

                });
            });

            //מוסיף לתג תחתון עמוד אמצעי את כפתור הוספת למועדפים
            footer_recipeDetails.appendChild(Add_to_favorites)

            //מוסיף לתג תחתון עמוד אמצעי את כפתור הוספת לרשימת קניות
            footer_recipeDetails.appendChild(Add_to_shopping_list)

            //שולח את הדיו שיצרנו אמש עבור הצגת הרכיבין - לפונקציה שמכינה את הרכיבים של המתכון
            AdReciv(ingredientsListDiv)

            //מזריק לדיו הראשי שאחראי על הצגת הרכיב  בחלון האמצעי את זמן+כמות סועדים + כפתורי פלוס ומינוס
            recipeDetails.appendChild(header_recipeDetails);

            //מזריק לדיו הראשי שאחראי על הצגת הרכיב  בחלון האמצעי את רכיבי המתכון בלבד
            recipeDetails.appendChild(ingredientsListDiv);

            //מזריק לדיו הראשי שאחראי על הצגת הרכיב  בחלון האמצעי את כפתורי הוספה לרישמת קניות ולמועדפים
            recipeDetails.appendChild(footer_recipeDetails);

        })
        .catch(error => {
            console.error('שגיאה:', error);
        });
}

//הפונקציה מקבלת את הדיו של הצגת רכיב והוא הולך למלאות אותו אם רכיבי המתכון
function AdReciv(ingredientsListDiv) {

    //מרוקן את כל התוכן הרכיבים הקיים בעמוד
    ingredientsListDiv.innerHTML = '';

    //מתחיל לרוץ על האובייקט עם מידע על המתכון ומשם שולף ומציג את הרכיבי בישול
    dataInfo.extendedIngredients.forEach(ingredient => {

        //משרשר שם רכיב + סוג מידה + כמות 
        const ingredientText = `Name: ${ingredient.name}, Amount: ${(ingredient.amount / dataInfo.servings) * count} ${ingredient.unit}`;

        //מייצר תגית מסוג פסקה שאליו הוא הולך להזריק את כל השרשור שיצרנו אמש
        const ingredientParagraph = document.createElement('p');

        //מזריק את כל השרשור שיצרנו לתגית מסוג פסקה
        ingredientParagraph.textContent = ingredientText;

        //מכניס כילד את הפסקה עם השרשור,-------לדיו שקבלנו והוא אמור להציג את רכיבי המתכון 
        ingredientsListDiv.appendChild(ingredientParagraph);
    });


}





