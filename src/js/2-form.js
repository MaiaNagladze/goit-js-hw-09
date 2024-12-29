'use strict';

const formData = {
    email: "",
    message: ""
};
const form = document.querySelector(".feedback-form");
const localStorageKey = "feedback-form-state";

const saveToLocalStorage = () => {
    try {
    localStorage.setItem(localStorageKey, JSON.stringify(formData));
   } catch(err) {
    console.log(err);
   }
};
 
const dataLoadingPage = () => {
    try {
    const formDataLS = localStorage.getItem(localStorageKey);
    return formDataLS ? JSON.parse(formDataLS) : null;
    } catch (err) {
        console.log(err);
    }
};

const populateForm = () => {
    const sevedData = dataLoadingPage();
    if (sevedData) {
        formData.email = sevedData.email || '';
        formData.message = sevedData.message || '';
        form.elements.email.value = formData.email.trim();
        form.elements.message.value = formData.message.trim();
    }
};
 
form.addEventListener("input", evt => {
    formData[evt.target.name] = evt.target.value.trim();
    saveToLocalStorage();
});

form.addEventListener("submit", evt => {
    evt.preventDefault();

    const email = form.elements.email.value.trim();
    const message = form.elements.message.value.trim();

        if (!email || !message) {
        alert('Fill please all fields');
        return;
    }
    console.log({ email, message });

    form.reset();
    localStorage.removeItem(localStorageKey);
    formData.email ="";
    formData.message ="";
});
    
populateForm();  