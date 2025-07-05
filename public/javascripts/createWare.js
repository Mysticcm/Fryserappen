async function createWare(url, [name, type, weight, date, fridgeNumber, comment]) {
    await fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            Name: name,
            Type: type, 
            Weight: weight,
            Date: date, 
            FridgeNumber: fridgeNumber,
            Comment: comment
        })
    }).then((response) => {
        if (response.ok) {
            const resData = 'Vare lagt til!';
            location.reload()
            return Promise.resolve(resData);
        }
        return Promise.reject(response);
    })
      .catch((response) => {
        alert(response.statusText);
      });
}