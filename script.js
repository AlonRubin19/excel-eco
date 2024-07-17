const instructions = [
    {
        question: 1,
        title: "השפעת אי-נוכחות על הציון",
        steps: [
            "פתח את קובץ האקסל 'GRADES.xlsx'",
            "צור עמודה חדשה 'male_skipped' = male * skipped",
            "הפעל את כלי הרגרסיה: Data > Data Analysis > Regression",
            " Y Range =  grade | |  X Range =  male, skipped, male_skipped",
            "בדוק את ערך t-statistic של 'male_skipped' בטבלת המקדמים בפלט"
        ]
    },
    {
        question: 2,
        title: "השפעת ציון הבגרות על הציון באוניברסיטה",
        steps: [
            "בקובץ 'GRADES.xlsx', צור עמודה חדשה 'male_bagrut' = male * bagrut",
            "הפעל רגרסיה: Y Range = grade, X Range = male, bagrut, male_bagrut",
            "בדוק את המקדם (coefficient) של 'bagrut' בטבלת המקדמים בפלט"
        ]
    },
    {
        question: 3,
        title: "בדיקת הטרוסקדסטיות",
        steps: [
            "בקובץ 'GRADES.xlsx', בצע רגרסיה: Y = grade, X = bagrut, alcohol",
            "שמור את השאריות: בפלט הרגרסיה, העתק את עמודת 'Residuals' לגיליון חדש",
            "חשב ln(residuals^2): בעמודה לידה, הכנס נוסחה =LN(residuals^2)",
            "בצע רגרסיה חדשה: Y = ln(residuals^2), X = bagrut, alcohol",
            "הכפל R-squared של הרגרסיה האחרונה ב-n (מספר התצפיות)"
        ]
    },
    {
        question: 4,
        title: "רגרסיה משוקללת",
        steps: [
            "בקובץ 'GRADES.xlsx', צור עמודה חדשה 'weight' = 1/bagrut",
            "הפעל רגרסיה משוקללת: Data > Data Analysis > Regression",
            "Y Range = grade, X Range = bagrut, male, סמן 'Weights' ובחר בעמודת weight",
            "בדוק את המקדם (coefficient) של 'bagrut' בטבלת המקדמים בפלט"
        ]
    },
    {
        question: 5,
        title: "מתאם סדרתי מסדר שני",
        steps: [
            "פתח את קובץ 'PHILLIPS.xlsx'",
            "בצע רגרסיה: Y = inf, X = unem",
            "שמור את השאריות (Residuals) מהפלט לעמודה חדשה",
            "צור עמודות של שאריות בפיגור: resid_lag1 = השאריות מהשורה הקודמת, resid_lag2 = השאריות משתי שורות קודמות",
            "בצע רגרסיה חדשה: Y = residuals, X = resid_lag1, resid_lag2",
            "בדוק את המקדם והt-statistic של resid_lag2 בטבלת המקדמים"
        ]
    },
    {
        question: 6,
        title: "מתאם סדרתי מסדר ראשון",
        steps: [
            "בקובץ 'PHILLIPS.xlsx', בצע רגרסיה: Y = inf, X = unem",
            "שמור את השאריות (Residuals) מהפלט לעמודה חדשה",
            "צור עמודה של שאריות בפיגור: resid_lag1 = השאריות מהשורה הקודמת",
            "בצע רגרסיה חדשה: Y = residuals, X = resid_lag1",
            "בדוק את המקדם של resid_lag1 בטבלת המקדמים"
        ]
    },
    {
        question: 7,
        title: "מודל דינמי",
        steps: [
            "בקובץ 'PHILLIPS.xlsx', צור עמודות בפיגור:",
            "unem_lag2 = ערכי unem משתי שורות קודמות",
            "inf_lag2 = ערכי inf משתי שורות קודמות",
            "בצע רגרסיה: Y = inf, X = unem_lag2, inf_lag2",
            "חשב את ההשפעה ארוכת הטווח: β₀ / (1-λ), כאשר β₀ הוא המקדם של unem_lag2 ו-λ הוא המקדם של inf_lag2"
        ]
    },
    {
        question: 8,
        title: "רגרסיה משוקללת מורכבת",
        steps: [
            "צור גיליון חדש עם עמודות x ו-y",
            "צור עמודה 'sqrt_x' = SQRT(x)",
            "צור עמודה '1_over_x' = 1/x",
            "צור עמודה 'weight' = SQRT(x)",
            "צור עמודות חדשות: y*weight, sqrt_x*weight, 1_over_x*weight, x*weight",
            "בצע רגרסיה משוקללת: Y = y*weight, X = sqrt_x*weight, 1_over_x*weight, x*weight",
            "בדוק את המקדמים בטבלת המקדמים בפלט"
        ]
    },
    {
        question: 9,
        title: "שאלה תיאורטית",
        steps: [
            "זו שאלה תיאורטית - אין צורך בחישובים באקסל",
            "התמקד בהבנת המושגים של הטרוסקדסטיות ומתאם סדרתי"
        ]
    },
    {
        question: 10,
        title: "מולטיקוליניאריות",
        steps: [
            "צור גיליון חדש עם עמודת ta25",
            "צור עמודות דמי Q1, Q2, Q3, Q4 לכל רבעון (1 לרבעון הרלוונטי, 0 אחרת)",
            "בצע רגרסיה: Y = ta25, X = Q1, Q2, Q3, Q4 (ללא חותך)",
            "בדוק אם יש בעיית מולטיקוליניאריות מלאה: אם הרגרסיה לא מצליחה לרוץ או מראה שגיאות, יש בעיה"
        ]
    }
];

function createQuestionButtons() {
    const buttonContainer = document.getElementById('questionButtons');
    
    // הוספת כפתור להצגת כל ההנחיות
    const allInstructionsButton = document.createElement('button');
    allInstructionsButton.textContent = "הצג את כל ההנחיות";
    allInstructionsButton.onclick = showAllInstructions;
    buttonContainer.appendChild(allInstructionsButton);
    
    // הוספת כפתורים לכל שאלה
    instructions.forEach(item => {
        const button = document.createElement('button');
        button.textContent = `שאלה ${item.question}`;
        button.onclick = () => showInstructions(item);
        buttonContainer.appendChild(button);
    });
}

function showInstructions(item) {
    const content = document.getElementById('content');
    content.innerHTML = `
        <div class="question-title">שאלה ${item.question}: ${item.title}</div>
        <ol>
            ${item.steps.map(step => `<li class="step">${step}</li>`).join('')}
        </ol>
    `;
}

function showAllInstructions() {
    const content = document.getElementById('content');
    content.innerHTML = instructions.map(item => `
        <div class="question-title">שאלה ${item.question}: ${item.title}</div>
        <ol>
            ${item.steps.map(step => `<li class="step">${step}</li>`).join('')}
        </ol>
    `).join('<hr>');
}

createQuestionButtons();
