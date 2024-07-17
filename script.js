const instructions = [
    {
        question: 1,
        title: "השפעת אי-נוכחות על הציון",
        steps: [
            "צור עמודה חדשה 'male_skipped' = male * skipped",
            "בצע רגרסיה: Y=grade, X=male,skipped,male_skipped",
            "בדוק את ערך t-statistic של 'male_skipped'"
        ]
    },
    {
        question: 2,
        title: "השפעת ציון הבגרות על הציון באוניברסיטה",
        steps: [
            "צור עמודה חדשה 'male_bagrut' = male * bagrut",
            "בצע רגרסיה: Y=grade, X=male,bagrut,male_bagrut",
            "בדוק את המקדם (coefficient) של 'bagrut'"
        ]
    },
    {
        question: 3,
        title: "בדיקת הטרוסקדסטיות",
        steps: [
            "בצע רגרסיה: Y=grade, X=bagrut,alcohol",
            "שמור את השאריות (residuals)",
            "חשב ln(residuals^2)",
            "בצע רגרסיה: Y=ln(residuals^2), X=bagrut,alcohol",
            "הכפל R-squared של הרגרסיה האחרונה ב-n (מספר התצפיות)"
        ]
    },
    {
        question: 4,
        title: "רגרסיה משוקללת",
        steps: [
            "צור עמודה חדשה 'weight' = 1/bagrut",
            "בצע רגרסיה משוקללת: Y=grade, X=bagrut,male, משקולות=weight",
            "בדוק את המקדם (coefficient) של 'bagrut'"
        ]
    },
    {
        question: 5,
        title: "מתאם סדרתי מסדר שני",
        steps: [
            "בטבלת PHILLIPS, בצע רגרסיה: Y=inf, X=unem",
            "שמור את השאריות (residuals)",
            "צור עמודות של שאריות בפיגור: resid_lag1, resid_lag2",
            "בצע רגרסיה: Y=residuals, X=resid_lag1,resid_lag2",
            "בדוק את המקדם והt-statistic של resid_lag2"
        ]
    },
    {
        question: 6,
        title: "מתאם סדרתי מסדר ראשון",
        steps: [
            "בטבלת PHILLIPS, בצע רגרסיה: Y=inf, X=unem",
            "שמור את השאריות (residuals)",
            "צור עמודה של שאריות בפיגור: resid_lag1",
            "בצע רגרסיה: Y=residuals, X=resid_lag1",
            "בדוק את המקדם של resid_lag1"
        ]
    },
    {
        question: 7,
        title: "מודל דינמי",
        steps: [
            "בטבלת PHILLIPS, צור עמודות בפיגור: unem_lag2, inf_lag2",
            "בצע רגרסיה: Y=inf, X=unem_lag2,inf_lag2",
            "חשב את ההשפעה ארוכת הטווח: β₀ / (1-λ)"
        ]
    },
    {
        question: 8,
        title: "רגרסיה משוקללת מורכבת",
        steps: [
            "צור עמודה 'sqrt_x' = sqrt(x)",
            "צור עמודה '1_over_x' = 1/x",
            "צור עמודה 'weight' = sqrt(x)",
            "בצע רגרסיה משוקללת: Y=y*weight, X=sqrt_x*weight,1_over_x*weight,x*weight",
            "בדוק את המקדמים"
        ]
    },
    {
        question: 9,
        title: "שאלה תיאורטית",
        steps: [
            "זו שאלה תיאורטית - אין צורך בחישובים באקסל"
        ]
    },
    {
        question: 10,
        title: "מולטיקוליניאריות",
        steps: [
            "צור עמודות דמי Q1, Q2, Q3, Q4 לכל רבעון",
            "בצע רגרסיה: Y=ta25, X=Q1,Q2,Q3,Q4 (ללא חותך)",
            "בדוק אם יש בעיית מולטיקוליניאריות מלאה"
        ]
    }
];

function createQuestionButtons() {
    const buttonContainer = document.getElementById('questionButtons');
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