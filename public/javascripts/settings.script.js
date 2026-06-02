// baseUrl = window.location.origin;

async function changeTheme(themeColor) {
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

