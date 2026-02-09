async function sortBy(sort) {
    await fetch(`http://localhost:3000/sortert/${sort}`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        }
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


async function logoClicked() {
    let loc = window.location.href;
    // Normalize URL
    if (!loc.endsWith("/")) {
        loc += "/";
    }

    try {
        await fetch(loc + "logoClicked", {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            }
        });

        if (loc === "http://localhost:3000/") {
            window.location.reload();
        } else {
            window.location.href = "http://localhost:3000/";
        }
    } catch (err) {
        alert(err.message);
    }
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
        }, 
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

async function deleteToast(id, name) {

    const deleteToast = document.getElementById("deleteToast");
    document.getElementById("toastmsg").innerHTML = name;
    const deleteButton = document.getElementById('toastDelete');
    deleteButton.addEventListener('click', () => {
        deleteWare(id)
    });

    new bootstrap.Toast(deleteToast, {delay: 7000}).show()
}


// SEARCH
let wareList;
if(this.location.href == "http://localhost:3000/") {

    const search = document.getElementById("search");
    
    search.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        wareList = document.querySelectorAll(".vareNavn");
        wareSearch(searchTerm);
    });
}

function wareSearch (searchTerm) {
    wareList.forEach(item => {
        if(searchTerm == "") {
            item.parentElement.classList.remove('hide');
        } else {
            if(!item.innerHTML.toLowerCase().includes(searchTerm)) {
                item.parentElement.classList.add('hide');
            } else {
                item.parentElement.classList.remove('hide');
            }
        }
    })
}

