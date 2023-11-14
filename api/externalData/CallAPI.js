var myHeaders = new Headers();
myHeaders.append("x-rapidapi-key", "1835076bca70dce25b3140b61a996a98");
myHeaders.append("x-rapidapi-host", "v1.formula-1.api-sports.io");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

// Call API with whatever request is sent to backend

export default async function handler(request, response) {
    try {
        if (request.method === "POST") {
            const endPointRequest = request.body;
        
            fetch(`https://v1.formula-1.api-sports.io/${endPointRequest}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                response.status(200).json({ result })
            })
            .catch(error => console.log('error', error));
        }
    } catch (error) {
        console.error(error);
    }

}



