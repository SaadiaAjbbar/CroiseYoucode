let Add_New_Worker = document.getElementById("Add_New_Worker");
let modal_ajouter = document.getElementById("modal_ajouter");
let modal_ferme = document.getElementById("modal_ferme");
let capacitePresonnel = 8;
let capaciteConfiance = 8;
let capaciteSecurite = 3;
let capaciteArchive = 3;
let capaciteReception = 3;
let capaciteServeur = 3;
let clickedAJOUTExp = false;

// ***** LocalStorage *****
let employee_form = document.getElementById("employee_form");
let employeeArr = JSON.parse(localStorage.getItem("emplyeItem")) || [];

let unassigned_lists = document.getElementById("unassigned_lists");

let zone_ajoute = document.querySelectorAll(".zone_ajoute");

let ajout_experience = document.getElementById("ajout_experience");
let experiencesContainer = document.getElementById("experiences");
let experienceNouveau = document.getElementById("experienceNouveau");

const experiences = [];
ajout_experience.addEventListener("click", () => {
    if (clickedAJOUTExp == false) {
        if (document.querySelector(".experience_titre").value == "") {
            document.querySelector(".experience_titre").style.border = "2px solid red"
            document.querySelector(".experience_titre").placeholder = "vous devez creer l'experience"
        } else {
            clickedAJOUTExp = true;
            document.querySelector(".experience_debut").classList.remove("hidden")
            document.querySelector(".experience_fin").classList.remove("hidden")
        }
    } else {
        if (document.querySelector(".experience_fin").value <= document.querySelector(".experience_debut").value || (document.querySelector(".experience_fin").value == "" && document.querySelector(".experience_debut").value == "")) {
            document.querySelector(".MsjDateExp").classList.remove("hidden")
        } else {
            let titre = document.querySelector(".experience_titre").value;
            let dateDebut = document.querySelector(".experience_debut").value;
            let dateFin = document.querySelector(".experience_fin").value;
            experiences.push({ titre, dateDebut, dateFin });
            document.querySelector(".MsjDateExp").classList.add("hidden")
            document.querySelector("#PasExperience").classList.add("hidden");
            document.querySelector("#ExperiencesAjoutees").insertAdjacentHTML("beforeend", `
                <div style="display:flex;justify-content:center;"><p>${titre} :</p><p>${dateDebut}/${dateFin}</p></div>
                `)
            document.querySelector(".experience_titre").value = ""
            document.querySelector(".experience_titre").placeholder = "Titre de l'autre poste"
            document.querySelector(".experience_debut").value = "";
            document.querySelector(".experience_fin").value = "";
            document.querySelector(".experience_debut").classList.add("hidden")
            document.querySelector(".experience_fin").classList.add("hidden")
            clickedAJOUTExp = false

        }
    }
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
    } else {
        url = document.getElementById("imageInput").src;
    }

    //regex
      if (!/^[A-Za-z ]{3,24}$/.test(name)) {
        alert("Le nom doit contenir seulement des lettres !");
        return;
    }

    if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.(com|fr|net|org)$/.test(email)) {
        alert("Email invalide !");
        return;
    }

    if (!/^[0-9]+$/.test(phone)) {
        alert("Le numéro doit contenir seulement des chiffres !");
        return;
    }


    const employee = {
        id: id, name: name, role: role, url: url, email: email, phone: phone, experiences: experiences, location: "unassigned"
    };
    employeeArr.push(employee);
    localStorage.setItem("emplyeItem", JSON.stringify(employeeArr));
    url = "";
    employee_form.reset();

    modal_ajouter.classList.add("hidden");
    location.reload()
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
      <img id="imageInput" src="${url}" onerror="this.onerror=null; this.src='images/imgDefault.png'" alt="Photo" style="width:100px; height:100px; object-fit:cover; border-radius:8px;">
    `;
});


//***************************affichages des employes dans zones
zone_ajoute.forEach(btn_ajout => {
    btn_ajout.addEventListener("click", () => {


        let sectionclicke = btn_ajout.parentElement;
        employeeArr.forEach(emp => {

            //zone conferance
            if (sectionclicke.id == "conference") {

                //vider div affichage
                sectionclicke.querySelector(".zone_liste").innerHTML = ""
                sectionclicke.querySelector(".zone_liste").insertAdjacentHTML("beforeend",
                    ` <span id="zone_listeFerme" style="color: aliceblue;cursor:pointer;width: 20%;height: 20%;">&times;</span> 
                            `)

                //tout array dans div zone list dans conference
                employeeArr.forEach(emp => {
                    if (emp.location == "unassigned") {
                        sectionclicke.querySelector(".zone_liste").insertAdjacentHTML("beforeend",
                            `<img src="${emp.url}" class="img_confere" id="${emp.id}" >`)
                    }
                });
                sectionclicke.querySelector("#zone_listeFerme").addEventListener("click", () => {
                    sectionclicke.querySelector(".zone_liste").style.display = "none"
                })
                sectionclicke.querySelector(".zone_liste").style.display = "block"
                //modifier location de employer et push dans localstorage
                Array.from(document.querySelectorAll(".img_confere")).forEach(element => {
                    element.addEventListener("click", (imgConf) => {
                        let imagechoosed = imgConf.currentTarget.id;
                        let empClicked = employeeArr.find(employ => employ.id == imagechoosed);
                        if (empClicked && capaciteConfiance > 0) {
                            console.log(empClicked.location)
                            empClicked.location = "conference";
                            localStorage.setItem("emplyeItem", JSON.stringify(employeeArr));
                            location.reload();
                        } else {
                            alert("cette zone est pleine!!")
                        }
                    })

                });
            }

            //zone personnel
            if (sectionclicke.id == "personnel") {
                //vider div affichage
                sectionclicke.querySelector(".zone_liste").innerHTML = ""
                sectionclicke.querySelector(".zone_liste").insertAdjacentHTML("beforeend",
                    ` <span id="zone_listeFerme" style="color: aliceblue;cursor:pointer;width: 20%;height: 20%;">&times;</span> 
                            `)
                //tout array dans div zone list dans personnel
                employeeArr.forEach(emp => {
                    if (emp.location == "unassigned") {
                        sectionclicke.querySelector(".zone_liste").insertAdjacentHTML("beforeend",
                            `<img src="${emp.url}" class="img_personnel" id="${emp.id}" >`)
                    }
                });
                sectionclicke.querySelector("#zone_listeFerme").addEventListener("click", () => {
                    sectionclicke.querySelector(".zone_liste").style.display = "none"
                })
                sectionclicke.querySelector(".zone_liste").style.display = "block"

                //tout array dans div zone list dans personnel
                Array.from(document.querySelectorAll(".img_personnel")).forEach(element => {
                    element.addEventListener("click", (imgPersonnel) => {
                        let imagechoosed = imgPersonnel.currentTarget.id;
                        let empClicked = employeeArr.find(employ => employ.id == imagechoosed);
                        if (empClicked && capacitePresonnel > 0) {
                            console.log(empClicked.location)
                            empClicked.location = "personnel";
                            localStorage.setItem("emplyeItem", JSON.stringify(employeeArr));
                            location.reload();
                        } else {
                            alert("cette zone est pleine!!")
                        }
                    })
                });
            }
            //zone serveur
            if (sectionclicke.id == "serveur") {
                //vider div affichage
                sectionclicke.querySelector(".zone_liste").innerHTML = ""
                sectionclicke.querySelector(".zone_liste").insertAdjacentHTML("beforeend",
                    ` <span id="zone_listeFerme" style="color: aliceblue;cursor:pointer;width: 20%;height: 20%;">&times;</span> 
                            `)
                //tout array dans div zone list dans serveur
                let resultsRolesServeur = employeeArr.filter((RolesServeur) => {
                    return RolesServeur.role == "Technicien IT" || RolesServeur.role == "Manager"
                });
                resultsRolesServeur.forEach(emp => {
                    if (emp.location == "unassigned") {
                        sectionclicke.querySelector(".zone_liste").insertAdjacentHTML("beforeend",
                            `<img src="${emp.url}" class="img_serveur" id="${emp.id}" >`)
                    }
                });
                sectionclicke.querySelector("#zone_listeFerme").addEventListener("click", () => {
                    sectionclicke.querySelector(".zone_liste").style.display = "none"
                })
                sectionclicke.querySelector(".zone_liste").style.display = "block"

                //tout array dans div zone list dans serveur
                Array.from(document.querySelectorAll(".img_serveur")).forEach(element => {
                    element.addEventListener("click", (imgserveur) => {
                        let imagechoosed = imgserveur.currentTarget.id;
                        let empClicked = employeeArr.find(employ => employ.id == imagechoosed);
                        if (empClicked && capaciteServeur > 0) {
                            console.log(empClicked.location)
                            empClicked.location = "serveur";
                            localStorage.setItem("emplyeItem", JSON.stringify(employeeArr));
                            location.reload();
                        } else {
                            alert("cette zone est pleine!!")
                        }
                    })
                });
            }
            //zone securite
            if (sectionclicke.id == "securite") {
                //vider div affichage
                sectionclicke.querySelector(".zone_liste").innerHTML = ""
                sectionclicke.querySelector(".zone_liste").insertAdjacentHTML("beforeend",
                    ` <span id="zone_listeFerme" style="color: aliceblue;cursor:pointer;width: 20%;height: 20%;">&times;</span> 
                            `)
                //tout array dans div zone list dans securite
                let resultsRolessecurite = employeeArr.filter((Rolessecurite) => {
                    return Rolessecurite.role == "Agent de securite" || Rolessecurite.role == "Manager"
                });
                resultsRolessecurite.forEach(emp => {
                    if (emp.location == "unassigned") {
                        sectionclicke.querySelector(".zone_liste").insertAdjacentHTML("beforeend",
                            `<img src="${emp.url}" class="img_securite" id="${emp.id}" >`)
                    }
                });
                sectionclicke.querySelector("#zone_listeFerme").addEventListener("click", () => {
                    sectionclicke.querySelector(".zone_liste").style.display = "none"
                })
                sectionclicke.querySelector(".zone_liste").style.display = "block"

                //tout array dans div zone list dans securite
                Array.from(document.querySelectorAll(".img_securite")).forEach(element => {
                    element.addEventListener("click", (imgsecurite) => {
                        let imagechoosed = imgsecurite.currentTarget.id;
                        let empClicked = employeeArr.find(employ => employ.id == imagechoosed);
                        if (empClicked && capaciteSecurite > 0) {
                            console.log(empClicked.location)
                            empClicked.location = "securite";
                            localStorage.setItem("emplyeItem", JSON.stringify(employeeArr));
                            location.reload();
                        } else {
                            alert("cette zone est pleine!!")
                        }
                    })
                });
            }
            //zone reception
            if (sectionclicke.id == "reception") {
                //vider div affichage
                sectionclicke.querySelector(".zone_liste").innerHTML = ""
                sectionclicke.querySelector(".zone_liste").insertAdjacentHTML("beforeend",
                    ` <span id="zone_listeFerme" style="color: aliceblue;cursor:pointer;width: 20%;height: 20%;">&times;</span> 
                            `)
                //tout array dans div zone list dans reception
                let resultsRolesreception = employeeArr.filter((Rolesreception) => {
                    return Rolesreception.role == "Receptionniste" || Rolesreception.role == "Manager"
                });
                resultsRolesreception.forEach(emp => {
                    if (emp.location == "unassigned") {
                        sectionclicke.querySelector(".zone_liste").insertAdjacentHTML("beforeend",
                            `<img src="${emp.url}" class="img_reception" id="${emp.id}" >`)
                    }
                });
                sectionclicke.querySelector("#zone_listeFerme").addEventListener("click", () => {
                    sectionclicke.querySelector(".zone_liste").style.display = "none"
                })
                sectionclicke.querySelector(".zone_liste").style.display = "block"

                //tout array dans div zone list dans reception
                Array.from(document.querySelectorAll(".img_reception")).forEach(element => {
                    element.addEventListener("click", (imgreception) => {
                        let imagechoosed = imgreception.currentTarget.id;
                        let empClicked = employeeArr.find(employ => employ.id == imagechoosed);
                        if (empClicked && capaciteReception > 0) {
                            console.log(empClicked.location)
                            empClicked.location = "reception";
                            localStorage.setItem("emplyeItem", JSON.stringify(employeeArr));
                            location.reload();
                        } else {
                            alert("cette zone est pleine!!")
                        }
                    })
                });
            }
            //zone archive
            if (sectionclicke.id == "archive") {
                //vider div affichage
                sectionclicke.querySelector(".zone_liste").innerHTML = ""
                sectionclicke.querySelector(".zone_liste").insertAdjacentHTML("beforeend",
                    ` <span id="zone_listeFerme" style="color: aliceblue;cursor:pointer;width: 20%;height: 20%;">&times;</span> 
                            `)
                //tout array dans div zone list dans archive
                let resultsRolesarchive = employeeArr.filter((Rolesarchive) => {
                    return Rolesarchive.role != "Nettoyage"
                });
                resultsRolesarchive.forEach(emp => {
                    if (emp.location == "unassigned") {
                        sectionclicke.querySelector(".zone_liste").insertAdjacentHTML("beforeend",
                            `<img src="${emp.url}" class="img_archive" id="${emp.id}" >`)
                    }
                });
                sectionclicke.querySelector("#zone_listeFerme").addEventListener("click", () => {
                    sectionclicke.querySelector(".zone_liste").style.display = "none"
                })
                sectionclicke.querySelector(".zone_liste").style.display = "block"

                //tout array dans div zone list dans archive
                Array.from(document.querySelectorAll(".img_archive")).forEach(element => {
                    element.addEventListener("click", (imgarchive) => {
                        let imagechoosed = imgarchive.currentTarget.id;
                        let empClicked = employeeArr.find(employ => employ.id == imagechoosed);
                        if (empClicked && capaciteArchive > 0) {
                            console.log(empClicked.location)
                            empClicked.location = "archive";
                            localStorage.setItem("emplyeItem", JSON.stringify(employeeArr));
                            location.reload();
                        } else {
                            alert("cette zone est pleine!!")
                        }
                    })
                });
            }

        })


    })
});

// ***** Afficher employes*****
employeeArr.forEach(emp => {
    if (emp.location == "unassigned") {

        let unassigned_list = document.createElement("div");
        unassigned_list.className = "unassigned_list";
        unassigned_list.id = `${emp.id}uns`;

        unassigned_list.innerHTML = `
        <img src='${emp.url}'/>
        <p><strong>Nom:</strong> ${emp.name}</p>
        <p><strong>Role:</strong> ${emp.role}</p>

      `;

        unassigned_lists.appendChild(unassigned_list);

        //si ona fait ajoute a une zone (changement de location)
    } else if (emp.location == "conference") {
        let zoneConference = document.getElementById("conference");
        zoneConference.querySelector(".zone_liste_ajoutes").insertAdjacentHTML("beforeend",
            `<div><img src="${emp.url}" id="${emp.id}z" class="img_AjoutZone" ></div>`)
        capaciteConfiance--;
    }
    else if (emp.location == "personnel") {
        let zonepersonnel = document.getElementById("personnel");
        zonepersonnel.querySelector(".zone_liste_ajoutes").insertAdjacentHTML("beforeend",
            `<div><img src="${emp.url}" id="${emp.id}z" class="img_AjoutZone" ></div>`)
        capacitePresonnel--;
    }
    else if (emp.location == "serveur") {
        let zoneserveur = document.getElementById("serveur");
        zoneserveur.querySelector(".zone_liste_ajoutes").insertAdjacentHTML("beforeend",
            `<div><img src="${emp.url}" id="${emp.id}z" class="img_AjoutZone" ></div>`)
        document.querySelector("#serveur").style.backgroundColor = "#ff000000";
        capaciteServeur--;
    }
    else if (emp.location == "securite") {
        let zonesecurite = document.getElementById("securite");
        zonesecurite.querySelector(".zone_liste_ajoutes").insertAdjacentHTML("beforeend",
            `<div><img src="${emp.url}" id="${emp.id}z" class="img_AjoutZone" ></div>`)

        document.querySelector("#securite").style.backgroundColor = "#ff000000";
        capaciteSecurite--;
    }
    else if (emp.location == "reception") {
        let zonereception = document.getElementById("reception");
        zonereception.querySelector(".zone_liste_ajoutes").insertAdjacentHTML("beforeend",
            `<div><img src="${emp.url}" id="${emp.id}z" class="img_AjoutZone" ></div>`)
        document.querySelector("#reception").style.backgroundColor = "#ff000000";
        capaciteReception--;
    }
    else if (emp.location == "archive") {
        let zonearchive = document.getElementById("archive");
        zonearchive.querySelector(".zone_liste_ajoutes").insertAdjacentHTML("beforeend",
            `<div><img src="${emp.url}" id="${emp.id}z" class="img_AjoutZone" ></div>`)
        document.querySelector("#archive").style.backgroundColor = "#ff000000";
        capaciteArchive--;
    }
});

//affichage des profiles si clicke sur image dans une zone
Array.from(document.querySelectorAll(".img_AjoutZone")).forEach(imgEmpZone => {
    imgEmpZone.addEventListener("click", (imgZoneclicked) => {
        let modal_profile = document.querySelector("#modal_profile");
        modal_profile.classList.toggle("hidden")
        let imageZonechoosed = imgZoneclicked.currentTarget.id;
        let empZoneClicked = employeeArr.find(emploClicked => emploClicked.id + "z" == imageZonechoosed);
        if (empZoneClicked) {
            document.querySelector(".modalProfile_contenu").innerHTML = `
                <img id="profile_photo" src="${empZoneClicked.url}" alt="Photo de l'employe">
                <h2 id="profile_name">${empZoneClicked.name}</h2>
                <p id="profile_role">le role: ${empZoneClicked.role}</p>
                <p id="profile_email">l'email: ${empZoneClicked.email}</p>
                <p id="profile_phone">le telephone: ${empZoneClicked.phone}</p>
                <p id="profile_zone">zone actuelle:${empZoneClicked.location}</p>
                <div id="profile_experiences">
                    <h3>Expériences</h3>
                        <ul id="ulEmployeZone">
                         ${empZoneClicked.experiences.map(exp => `
                        <li>${exp.titre}: ${exp.dateDebut} / ${exp.dateFin}</li>
                         `).join("")}
                        </ul>
                </div>
                <button id="btn_sortirZone" style="margin-top: 15px; width: 150px; height: 35px; border-radius: 10px; background-color: #628141; border: none; color: white;">
                Sortir
                </button>
                
            `




        }

        document.querySelector("#btn_sortirZone").addEventListener("click", () => {
            let indexClickedEmp = employeeArr.findIndex((empIndexCloicked) => {
                return empIndexCloicked.id == empZoneClicked.id;
            });
            employeeArr[indexClickedEmp].location = "unassigned";
            localStorage.setItem("emplyeItem", JSON.stringify(employeeArr))
            location.reload();
        })

    })

});
document.querySelector("#profile_ferme").addEventListener("click", () => {
    document.querySelector("#modal_profile").classList.toggle("hidden")
})


//
Array.from(document.querySelectorAll(".unassigned_list")).forEach((unassigned) => {
    unassigned.addEventListener("click", () => {
        employeeArr.forEach((empll) => {
            if (unassigned.id == empll.id + "uns") {
                let modal_profileUnassigned = document.querySelector("#modal_profileUnassigned");
                modal_profileUnassigned.classList.toggle("hidden");
                document.querySelector("#profileUnassigned_photo").src = `${empll.url}`;
                document.querySelector("#profileUnassigned_name").textContent = `${empll.name}`;
                document.querySelector("#profileUnassigned_role").textContent = `le role:${empll.role}`;
                document.querySelector("#profileUnassigned_email").textContent = `l'email:${empll.email}`;
                document.querySelector("#profileUnassigned_phone").textContent = `le telephone:${empll.phone}`;
                document.querySelector("#profileUnassigned_zone").textContent = `zone actuelle:${empll.location}`;
                document.querySelector("#ulEmployeUnassi").innerHTML = "";
                for (let i = 0; i < empll.experiences.length; i++) {
                    
                    let li = document.createElement("li");
                    li.textContent = `${empll.experiences[i].titre}: ${empll.experiences[i].dateDebut}/${empll.experiences[i].dateFin}`
                    document.querySelector("#ulEmployeUnassi").appendChild(li)
                }

            }
        })

    })

})

document.querySelector("#profileUnassigned_ferme").addEventListener("click", () => {
    document.querySelector("#modal_profileUnassigned").classList.toggle("hidden")
})
