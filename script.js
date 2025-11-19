let Add_New_Worker = document.getElementById("Add_New_Worker");
let modal_ajouter = document.getElementById("modal_ajouter");
let modal_ferme = document.getElementById("modal_ferme");

// ***** Modal *****
Add_New_Worker.addEventListener("click", () => {
    modal_ajouter.classList.remove("hidden");
});
modal_ferme.addEventListener("click", () => {
    modal_ajouter.classList.add("hidden");
});

// ***** LocalStorage *****
let employee_form = document.getElementById("employee_form");
let employeeArr = JSON.parse(localStorage.getItem("emplyeItem")) || [];

let unassigned_lists = document.getElementById("unassigned_lists");

// ***** Afficher employes*****
employeeArr.forEach(emp => {
    //si experiences vide
    let expList = "";
    if (emp.experiences && emp.experiences.length > 0) {
        expList = emp.experiences.map(e => e.titre).join(" & ");
    } else {
        expList = "Aucune expérience";
    }

    let unassigned_list = document.createElement("div");
    unassigned_list.className = "unassigned_list";
    unassigned_list.innerHTML = `
        <p><strong>Nom:</strong> ${emp.name}</p>
        <p><strong>Role:</strong> ${emp.role}</p>
        <p><strong>Email:</strong> ${emp.email}</p>
        <p><strong>Phone:</strong> ${emp.phone}</p>
        <p><strong>Experiences:</strong> ${expList}</p>
    `;
    unassigned_lists.appendChild(unassigned_list);
});

// ***** Ajouter expérience dynamiquement *****
let ajout_experience = document.getElementById("ajout_experience");
let experiencesContainer = document.getElementById("experiences");

ajout_experience.addEventListener("click", () => {
    let experiences_divPlus = document.createElement("div");
    experiences_divPlus.className = "experiences_div";
    experiences_divPlus.innerHTML = `
        <input type="text" class="experience_titre" placeholder="Titre de poste">
        <input type="date" class="experience_debut">
        <input type="date" class="experience_fin">
    `;
    experiencesContainer.insertBefore(experiences_divPlus, ajout_experience);
});

// ***** Ajout demploye (submit form )*****
employee_form.addEventListener("submit", e => {
    e.preventDefault();

    let name = document.getElementById("name").value;
    let role = document.getElementById("role").value;
    let url = document.getElementById("urlphoto").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;

    const experiences = [];
    document.querySelectorAll(".experiences_div").forEach(div => {
        let titre = div.querySelector(".experience_titre").value;
        let dateDebut = div.querySelector(".experience_debut").value;
        let dateFin = div.querySelector(".experience_fin").value;

        if (titre || dateDebut || dateFin) {
            experiences.push({ titre, dateDebut, dateFin });
        }
    });

    const employee = { name, role, url, email, phone, experiences };
    employeeArr.push(employee);
    localStorage.setItem("emplyeItem", JSON.stringify(employeeArr));

    // ***** Affichage immédiat *****
    let unassigned_list = document.createElement("div");
    unassigned_list.className = "unassigned_list";
    unassigned_list.innerHTML = `
        <p><strong>Nom:</strong> ${name}</p>
        <p><strong>Role:</strong> ${role}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Experiences:</strong> ${experiences.map(e => e.titre).join(", ")}</p>
    `;
    unassigned_lists.appendChild(unassigned_list);

    // ***** Reset form *****
    employee_form.reset();

    // garder seulement 1 bloc d'expérience
    document.querySelectorAll(".experiences_div").forEach((div, i) => {
        if (i > 0) div.remove();
    });

    modal_ajouter.classList.add("hidden");
});
