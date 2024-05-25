import axios from 'axios';

const apiUrl = 'http://localhost:5000/api';

const api = {
    uploadImage: async (image) =>{
        await axios.post(`${apiUrl}/extract-image-data`, image)
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.log("Erreur dans api.js ", error);
            });
    }
}

export default api;