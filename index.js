//la solution de chaque exercise est une fonction dans la fin du code.
//decommentez l'exo que vous voulez executer

const axios = require("axios");

const login = async () => {
    //login
    const login_url = " https://login.salesforce.com/services/oauth2/token";
    const login_form = {
        grant_type: "password",
        client_id:
            "3MVG9I9urWjeUW051PumYX1mbS5HkS3kpZsbCEzYWjgivRyDno1MjvM08EfVf2be52s0vrthHamsgMpQCrm5Z",
        client_secret:
            "EC97DAFBF9F6F2399DE5E7BADA2E9BBEF6B3B6E832DC435668AA452940AD9501",
        username: "soljit_algeria2@soljit.com",
        password: "entretient_1235zoLmTaUDLiouUaOAN6WhOQPi",
    };
    const response = await axios.post(
        login_url,
        new URLSearchParams(login_form)
    );
    access_token = response.data.access_token;
    instance_url = response.data.instance_url;
    return { access_token, instance_url };
};

const exo1 = async (searchTerm) => {
    console.log("solution de l'exercise 1");

    // valeur par defaut
    const id = searchTerm || "a004L000002gCJK";
    const { access_token, instance_url } = await login();
    const url = `${instance_url}/services/data/v55.0/sobjects/Candidature__c/${id}`;

    const config = {
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    };
    //envoi de la requette
    axios
        .get(url, config)
        .then((one) => {
            const data = one.data;
            console.log(data);
            console.log("First_Name__c: ", data.First_Name__c);
            console.log("Last_Name__c: ", data.Last_Name__c);
            console.log("Year__c: ", data.Year__c);
            console.log("Year_Of_Experience__c: ", data.Year_Of_Experience__c);
        })
        .catch((error) => {
            console.log(error.message);
        });
};

const exo2 = async () => {
    console.log("solution de l'exercise 2");

    //preparation de la requette
    const { access_token, instance_url } = await login();

    const url = `${instance_url}/services/data/v55.0/sobjects/Candidature__c`;
    const config = {
        "Content-Type": "application/JSON",
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    };
    const nouvelleCondidature = {
        First_Name__c: "Mehdi",
        Last_Name__c: "Soltane",
        Year_Of_Experience__c: "0",
    };
    //envoi de la requette
    const response = await axios.post(url, nouvelleCondidature, config);
    id2 = response.id;
    if (response.data.success) {
        console.log("success");
        console.log("le nouvel id est: ", response.data.id);
    }
};

const exo3 = async () => {
    console.log("solution de l'exercise 3");

    //preparation de la requette
    const { access_token, instance_url } = await login();
    const id = "a004L000002gCJK";
    const url = `${instance_url}/services/data/v55.0/sobjects/Candidature__c/${id}`;
    const config = {
        "Content-Type": "application/JSON",
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    };
    const body = {
        Last_Name__c: "Soltane",
    };
    //envoi de la requette
    const response = await axios.patch(url, body, config);
    if ((response.status = 201)) {
        console.log("modified successfully!");
    }
};

const exo4 = async () => {
    console.log("solution de l'exercise 4");

    //preparation de la requette
    const { access_token, instance_url } = await login();
    const url = `${instance_url}/services/data/v55.0/sobjects/Candidature__c`;

    const config = {
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    };
    //envoi de la requette
    const response = await axios.get(url, config);
    console.log(response.data);
    return response.data;
};

exo5 = async (searchParam, searchTerm) => {
    console.log("solution de l'exercise 5");
    //preparation de la requette
    const { access_token, instance_url } = await login();
    const url = `${instance_url}/services/data/v55.0//query/?q=SELECT+*+FROM+Candidature__c+WHERE+${searchParam}='${searchTerm}'`;
    const config = {
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    };
    //sending the request
    const response = await axios.get(url, config);
    console.log(response.status);
};



exo1();
// exo2();
// exo3();
// exo4();

//pour l'exo5 j'ai choisis de faire la recherche par le parametre first_name__c
const searchParam = "First_Name__c";
const searchTerm = "USERNAME1";
// exo5(searchParam, searchTerm);
