
async function changeTheme(themeColor, baseUrl) {
    try {
        const path = "/settings/theme"
        const response = await fetch(baseUrl + path, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            }, 
            body: JSON.stringify({
                theme: themeColor
            })
        })
        await response.json();
        return window.location.reload();
    } catch (err) {
        alert(err.message);
    }
};







// const themeButtons = document.getElementsByClassName("themeBtn");
// themeButtons.addEventListener('click', () => {
//     changeTheme(this.InnerHTML);
    
// })