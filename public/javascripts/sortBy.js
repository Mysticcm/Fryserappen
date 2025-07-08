async function sortBy(sort, type) {
    await fetch(`http://localhost:3000/sortert/${sort}`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        } ,
        body: JSON.stringify({
            sort: sort,
            type: type
        }) 
    }).then((response) => {
        if (response.ok) {
            const resData = `Sortert etter ${sort}!`;
            location.reload()
            return Promise.resolve(resData);
        }
        return Promise.reject(response);
    })
      .catch((response) => {
        alert(response.statusText);
      });  
};

async function logoClicked(condition) {
    await fetch(`http://localhost:3000/logoClicked`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        } ,
        body: JSON.stringify({
            sort: condition
        }) 
    }).then((response) => {
        if (response.ok) {
            const resData = `Standard sortering!`;
            location.reload()
            return Promise.resolve(resData);
        }
        return Promise.reject(response);
    })
      .catch((response) => {
        alert(response.statusText);
      }); 
}
