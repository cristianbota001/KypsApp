class Middleware{
    static SendFormData = async (data, method) => {
        let response = await fetch("http://192.168.1.66:8000/" + method, {method:"POST", body:data, credentials:"include"})
        return response.json()
    }
}

export default Middleware