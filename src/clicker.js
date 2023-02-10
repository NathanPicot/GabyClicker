function delay(time) {
    return new Promise((resolve, reject) => {
        try {
            setTimeout(resolve, time);
        } catch (error) {
            reject(error);
        }
    });
}
function clicker() {
    let nb = localStorage.getItem("gaby");
    if (nb == null) {
        localStorage.setItem("gaby", 10);
    } else {
        localStorage.setItem("gaby", 10 + parseInt(nb));
    }

}
async function display(secon) {
    try {
        count = localStorage.getItem("gaby")
        if (parseInt(count) > 999999) {
            document.getElementById('gabycounter').innerHTML = (count / 1000000).toFixed(2) + " Mi Gaby Coins (revenue :" + secon + "/s)";
        } else {
            document.getElementById('gabycounter').innerHTML = count + " Gaby Coins (revenue :" + secon + "/s)";
        }
    } catch (err) {
        console.log(err);
    }
}
async function displayFarm(name) {
    try {
        document.getElementById(name + 'Nb').innerHTML = localStorage.getItem(name + "Farm");
    } catch (err) {
        console.log(err);
    }
}
function addFarm(name, Oneprice) {
    try {
        let nb = localStorage.getItem(name + 'Farm');
        localStorage.setItem(name + 'Revenue', Oneprice * 0.5);
        let nb1 = 1;
        if (nb < 1) {

             nb1 = 1;
        }else{
             nb1 = nb;
        }
        if (localStorage.getItem(name + "Factor") == null) {
            factor(1, name);
        }
        let fact = parseInt(localStorage.getItem(name + 'Factor'));
        let price = nb1 *15* Oneprice * fact;
        if (localStorage.getItem("gaby") >= price) {
            localStorage.setItem("gaby", parseInt(localStorage.getItem("gaby")) - price);
            if (nb1 == null) {
                localStorage.setItem(name + 'Farm', fact);
            } else {
                localStorage.setItem(name + 'Farm', fact + parseInt(nb1));
            }
        }
        document.getElementById(name).innerHTML = "Add " + name + " ( " + price + " gaby Coin) ";

    } catch (error) {
        console.log(error);
    }
}
function factor(factor, item) {
    try {
        localStorage.setItem(item + 'Factor', factor);
    } catch (error) {
        console.log(error);
    }
}
function btnSelect(id, factor) {
    try {
        document.getElementById(id + "1").classList.remove('active');
        document.getElementById(id + "10").classList.remove('active');
        document.getElementById(id + "100").classList.remove('active');
        document.getElementById(id + factor).classList.add('active');
    } catch (err) {
        console.log(err);
    }
}
async function farm() {

    try {
        while (true) {


            let keys = Object.keys(localStorage);
            let secon = 0
            for (let i = 0; i < keys.length; i++) {
                let nb = localStorage.getItem("gaby");
                let key = keys[i];
                if (key.includes("Farm")) {
                    let farm = localStorage.getItem(key);
                    let separator = 'Farm';
                    const substring = key.split(separator);
                    let price = parseInt(localStorage.getItem(substring[0] + 'Farm')) * parseInt(localStorage.getItem(substring[0] + 'Revenue')) *15* 2 * parseInt(localStorage.getItem(substring[0] + 'Factor'));
                    if (price > 999999) {
                        price = (price / 1000000).toFixed(2) + "Mi"
                    }
                    document.getElementById(substring[0]).innerHTML = "Add " + substring[0] + " ( " + price + " gaby Coin) ";
                    let revenue = localStorage.getItem(substring[0] + 'Revenue');
                    if (farm != null) {
                        localStorage.setItem("gaby", (parseInt(nb) + parseInt(farm) * parseInt(revenue)/100));
                         secon +=  parseInt(farm) * parseInt(revenue);
                    }
                    if(localStorage.getItem("gaby")>1000000){
                        document.getElementById('imgGaby').src = "img/gaby.jpeg";
                    }else{
                        document.getElementById('imgGaby').src = "img/gaby1.jpeg";
                    }

                    displayFarm(substring[0]);
                }
            }

            display(secon);
            await delay(10);
        }
    } catch (err) {
        console.log(err);
    }
}
