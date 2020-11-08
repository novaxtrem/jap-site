function guardoDatosLocalStorange(data) {
    var dataParsed = JSON.parse(data);
    if (!dataParsed.email == "" || !dataParsed.email == undefined || !dataParsed.email == null) {
        localStorage.setItem('NOMBRE', dataParsed.name);
        localStorage.setItem('APELLIDO', dataParsed.last_name);
        localStorage.setItem('USER_EMAIL', dataParsed.email);
        localStorage.setItem('TELEFONO', dataParsed.phone_num);
        localStorage.setItem('EDAD', dataParsed.age);
        localStorage.setItem('CONTRASENIA', dataParsed.password);
        localStorage.setItem("USER_PROFILE_IMG", (dataParsed.image_profile));
        return true;
    } else {
        return false;
    }
}