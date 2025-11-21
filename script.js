let Add_New_Worker = document.getElementById("Add_New_Worker");
let modal_ajouter = document.getElementById("modal_ajouter");
let modal_ferme = document.getElementById("modal_ferme");

// ***** LocalStorage *****
let employee_form = document.getElementById("employee_form");
let employeeArr = JSON.parse(localStorage.getItem("emplyeItem")) || [];

let unassigned_lists = document.getElementById("unassigned_lists");

let zone_ajoute = document.querySelectorAll(".zone_ajoute");
//***************************affichages des employes dans zones
zone_ajoute.forEach(btn_ajout => {
    btn_ajout.addEventListener("click", () => {
        let sectionclicke = btn_ajout.parentElement;
        employeeArr.forEach(emp => {
            //zone conferance
            if (sectionclicke.id == "conference") {
                //vider div affichage
                sectionclicke.querySelector(".zone_liste").innerHTML = ""
                //tout array dans div zone list dans conference
                employeeArr.forEach(emp => {
                    sectionclicke.querySelector(".zone_liste").insertAdjacentHTML("beforeend",
                        `<img src="${emp.url}" class="img_confere" id="${emp.id}" >`)
                });

                //tout array dans div zone list dans conference
                Array.from(document.querySelectorAll(".img_confere")).forEach(element => {
                    element.addEventListener("click", (imgConf) => {
                        let imagechoosed = imgConf.currentTarget.id;
                        let empClicked = employeeArr.find(employ => employ.id == imagechoosed);
                        if (empClicked) {
                            console.log(empClicked.location)
                            empClicked.location = "conference";
                            localStorage.setItem("emplyeItem", JSON.stringify(employeeArr));
                            location.reload();
                        }
                    })
                });
            }
            //zone personnel
            if (sectionclicke.id == "personnel") {
                //vider div affichage
                sectionclicke.querySelector(".zone_liste").innerHTML = ""
                //tout array dans div zone list dans personnel
                employeeArr.forEach(emp => {
                    sectionclicke.querySelector(".zone_liste").insertAdjacentHTML("beforeend",
                        `<img src="${emp.url}" class="img_personnel" id="${emp.id}" >`)
                });

                //tout array dans div zone list dans personnel
                Array.from(document.querySelectorAll(".img_personnel")).forEach(element => {
                    element.addEventListener("click", (imgPersonnel) => {
                        let imagechoosed = imgPersonnel.currentTarget.id;
                        let empClicked = employeeArr.find(employ => employ.id == imagechoosed);
                        if (empClicked) {
                            console.log(empClicked.location)
                            empClicked.location = "personnel";
                            localStorage.setItem("emplyeItem", JSON.stringify(employeeArr));
                            location.reload();
                        }
                    })
                });
            }
            //zone serveur
            if (sectionclicke.id == "serveur") {
                //vider div affichage
                sectionclicke.querySelector(".zone_liste").innerHTML = ""
                //tout array dans div zone list dans serveur
                let resultsRolesServeur = employeeArr.filter((RolesServeur) => {
                    return RolesServeur.role == "Technicien IT" || RolesServeur.role == "Manager"
                });
                resultsRolesServeur.forEach(emp => {
                    sectionclicke.querySelector(".zone_liste").insertAdjacentHTML("beforeend",
                        `<img src="${emp.url}" class="img_serveur" id="${emp.id}" >`)
                });

                //tout array dans div zone list dans serveur
                Array.from(document.querySelectorAll(".img_serveur")).forEach(element => {
                    element.addEventListener("click", (imgserveur) => {
                        let imagechoosed = imgserveur.currentTarget.id;
                        let empClicked = employeeArr.find(employ => employ.id == imagechoosed);
                        if (empClicked) {
                            console.log(empClicked.location)
                            empClicked.location = "serveur";
                            localStorage.setItem("emplyeItem", JSON.stringify(employeeArr));
                            location.reload();
                        }
                    })
                });
            }
            //zone securite
            if (sectionclicke.id == "securite") {
                //vider div affichage
                sectionclicke.querySelector(".zone_liste").innerHTML = ""
                //tout array dans div zone list dans securite
                let resultsRolessecurite = employeeArr.filter((Rolessecurite) => {
                    return Rolessecurite.role == "Agent de securite" || Rolessecurite.role == "Manager"
                });
                resultsRolessecurite.forEach(emp => {
                    sectionclicke.querySelector(".zone_liste").insertAdjacentHTML("beforeend",
                        `<img src="${emp.url}" class="img_securite" id="${emp.id}" >`)
                });

                //tout array dans div zone list dans securite
                Array.from(document.querySelectorAll(".img_securite")).forEach(element => {
                    element.addEventListener("click", (imgsecurite) => {
                        let imagechoosed = imgsecurite.currentTarget.id;
                        let empClicked = employeeArr.find(employ => employ.id == imagechoosed);
                        if (empClicked) {
                            console.log(empClicked.location)
                            empClicked.location = "securite";
                            localStorage.setItem("emplyeItem", JSON.stringify(employeeArr));
                            location.reload();
                        }
                    })
                });
            }
            //zone reception
            if (sectionclicke.id == "reception") {
                //vider div affichage
                sectionclicke.querySelector(".zone_liste").innerHTML = ""
                //tout array dans div zone list dans reception
                let resultsRolesreception = employeeArr.filter((Rolesreception) => {
                    return Rolesreception.role == "Receptionniste" || Rolesreception.role == "Manager"
                });
                resultsRolesreception.forEach(emp => {
                    sectionclicke.querySelector(".zone_liste").insertAdjacentHTML("beforeend",
                        `<img src="${emp.url}" class="img_reception" id="${emp.id}" >`)
                });

                //tout array dans div zone list dans reception
                Array.from(document.querySelectorAll(".img_reception")).forEach(element => {
                    element.addEventListener("click", (imgreception) => {
                        let imagechoosed = imgreception.currentTarget.id;
                        let empClicked = employeeArr.find(employ => employ.id == imagechoosed);
                        if (empClicked) {
                            console.log(empClicked.location)
                            empClicked.location = "reception";
                            localStorage.setItem("emplyeItem", JSON.stringify(employeeArr));
                            location.reload();
                        }
                    })
                });
            }
            //zone archive
            if (sectionclicke.id == "archive") {
                //vider div affichage
                sectionclicke.querySelector(".zone_liste").innerHTML = ""
                //tout array dans div zone list dans archive
                let resultsRolesarchive = employeeArr.filter((Rolesarchive) => {
                    return Rolesarchive.role != "Nettoyage"
                });
                resultsRolesarchive.forEach(emp => {
                    sectionclicke.querySelector(".zone_liste").insertAdjacentHTML("beforeend",
                        `<img src="${emp.url}" class="img_archive" id="${emp.id}" >`)
                });

                //tout array dans div zone list dans archive
                Array.from(document.querySelectorAll(".img_archive")).forEach(element => {
                    element.addEventListener("click", (imgarchive) => {
                        let imagechoosed = imgarchive.currentTarget.id;
                        let empClicked = employeeArr.find(employ => employ.id == imagechoosed);
                        if (empClicked) {
                            console.log(empClicked.location)
                            empClicked.location = "archive";
                            localStorage.setItem("emplyeItem", JSON.stringify(employeeArr));
                            location.reload();
                        }
                    })
                });
            }

        })


    })
});
// ***** Modal *****
Add_New_Worker.addEventListener("click", () => {
    modal_ajouter.classList.remove("hidden");

    experienceNouveau.innerHTML = '';

});
modal_ferme.addEventListener("click", () => {
    modal_ajouter.classList.add("hidden");
    url = "";
    previs_img.innerHTML = "";
    employee_form.reset();
    experienceNouveau.innerHTML = '';
});

let urlphoto = document.getElementById("urlphoto");
let previs_img = document.getElementById("previs_img");
urlphoto.addEventListener("input", () => {

    let url = urlphoto.value;

    if (url === "") {
        previs_img.innerHTML = "";
        return;
    }

    previs_img.innerHTML = `
      <img src="${url}" alt="Photo" style="width:100px; height:100px; object-fit:cover; border-radius:8px;">
    `;
});

// ***** Afficher employes*****
employeeArr.forEach(emp => {
    //si experiences vide
    let expList = "";
    if (emp.experiences && emp.experiences.length > 0) {
        expList = emp.experiences.map(e => e.titre).join(" & ");
    } else {
        expList = "Aucune expérience";
    }
    if (emp.location == "unassigned") {

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
        //si ona fait ajoute a une zone (changement de location)
    } else if (emp.location == "conference") {
        let zoneConference = document.getElementById("conference");
        zoneConference.querySelector(".zone_liste_ajoutes").insertAdjacentHTML("beforeend",
            `<div><img src="${emp.url}"id="${emp.id}ed" style="width: 50px; height: 50px;  border-radius: 25px;"></div>`)

    }
    else if (emp.location == "personnel") {
        let zonepersonnel = document.getElementById("personnel");
        zonepersonnel.querySelector(".zone_liste_ajoutes").insertAdjacentHTML("beforeend",
            `<div><img src="${emp.url}" style="width: 50px; height: 50px;  border-radius: 25px;"></div>`)

    }
    else if (emp.location == "serveur") {
        let zoneserveur = document.getElementById("serveur");
        zoneserveur.querySelector(".zone_liste_ajoutes").insertAdjacentHTML("beforeend",
            `<div><img src="${emp.url}" style="width: 50px; height: 50px;  border-radius: 25px;"></div>`)
    }
    else if (emp.location == "securite") {
        let zonesecurite = document.getElementById("securite");
        zonesecurite.querySelector(".zone_liste_ajoutes").insertAdjacentHTML("beforeend",
            `<div><img src="${emp.url}" style="width: 50px; height: 50px;  border-radius: 25px;"></div>`)
    }
    else if (emp.location == "reception") {
        let zonereception = document.getElementById("reception");
        zonereception.querySelector(".zone_liste_ajoutes").insertAdjacentHTML("beforeend",
            `<div><img src="${emp.url}" style="width: 50px; height: 50px;  border-radius: 25px;"></div>`)
    }
    else if (emp.location == "archive") {
        let zonearchive = document.getElementById("archive");
        zonearchive.querySelector(".zone_liste_ajoutes").insertAdjacentHTML("beforeend",
            `<div><img src="${emp.url}" style="width: 50px; height: 50px;  border-radius: 25px;"></div>`)
    }
});

// ***** Ajouter expérience dynamiquement *****
let ajout_experience = document.getElementById("ajout_experience");
let experiencesContainer = document.getElementById("experiences");
let experienceNouveau = document.getElementById("experienceNouveau");
ajout_experience.addEventListener("click", () => {
    let experiences_divPlus = document.createElement("div");
    experiences_divPlus.className = "experiences_div";
    experiences_divPlus.innerHTML = `
        <input type="text" class="experience_titre" placeholder="Titre de poste">
        <input type="date" class="experience_debut">
        <input type="date" class="experience_fin">
    `;
    experienceNouveau.appendChild(experiences_divPlus);
});

employee_form.addEventListener("submit", e => {
    e.preventDefault();

    let name = document.getElementById("name").value;
    let role = document.getElementById("role").value;
    let url = document.getElementById("urlphoto").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;
    let id = 1;
    if (employeeArr.length > 0) {
        id = employeeArr[employeeArr.length - 1].id + 1;
    }

    if (url == "") {
        url = "images/imgDefault.png";
    }

    const experiences = [];
    document.querySelectorAll(".experiences_div").forEach(div => {
        let titre = div.querySelector(".experience_titre").value;
        let dateDebut = div.querySelector(".experience_debut").value;
        let dateFin = div.querySelector(".experience_fin").value;


        if (titre || dateDebut || dateFin) {
            experiences.push({ titre, dateDebut, dateFin });
        }
    });

    const employee = {
        id: id, name: name, role: role, url: url, email: email, phone: phone, experiences: experiences, location: "unassigned"
    };
    employeeArr.push(employee);
    localStorage.setItem("emplyeItem", JSON.stringify(employeeArr));

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
    url = "";
    employee_form.reset();

    // garder seulement 1 bloc d'experience
    document.querySelectorAll(".experiences_div").forEach((div, i) => {
        if (i > 0) div.remove();
    });

    modal_ajouter.classList.add("hidden");
});