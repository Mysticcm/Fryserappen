async function sortBy(sort) {
    await fetch(`http://localhost:3000/sortert/${sort}`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        } /* ,
        body: JSON.stringify({
            sort: sort,
            type: type
        }) */ 
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

async function populateModal(vare) {
    console.log('vare', vare)
    const map = {
        modalid: vare._id,
        modalname: vare.name,
        modaltype: vare.type,
        modalweight: vare.weight,
        modaldate: vare.date,
        modalfridgeNumber: vare.fridgeNumber,
        modalcomment: vare.comment,
    };
    
    Object.entries(map).forEach(([id, val]) => {
        const input = document.getElementById(id);
        if (input) input.value = val ?? '';
    });
    const deleteButton = document.getElementById('modalSlettVare');
    deleteButton.addEventListener('click', () => {
        deleteWare(vare._id)
    });
}

async function deleteWare(id) {
    await fetch(`http://localhost:3000/delete`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        } , 
        body: JSON.stringify({
            id: id
        })
    }).then((response) => {
        if (response.ok) {
            const resData = `Vare slettet!`;
            location.reload()
            return Promise.resolve(resData);
        }
        return Promise.reject(response);
    })
      .catch((response) => {
        alert(response.statusText);
      });  
};