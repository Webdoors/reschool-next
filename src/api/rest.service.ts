import axios from 'axios'

// const axiosInstance = axios.create({
//   withCredentials: true
// })

export class RestService {
    
 static   get(url: string, reqOptions?: any, args?: any) {
     

        let updatedUrl = url 
        if(reqOptions){
          // course id in param needs refactor
          updatedUrl += reqOptions
        }
       
        return axios.get(updatedUrl, args);
    }

  static  post(url: string, args?: any, reqOptions?: any) {
   
        return axios.post(url, args, reqOptions);
    }

    static  patch(url: string, args: any, reqOptions?: any) {
      let updatedUrl = url 
    
   
      if(reqOptions?.param){
        // course id in param needs refactor
        updatedUrl += reqOptions?.param
      }
    
      return axios.patch(updatedUrl, args, reqOptions);
  }

  static  delete(url: string, args: any,  reqOptions: any, ) {
    let updatedUrl = url 
    console.log(reqOptions.param)
    console.log(reqOptions)
    if(reqOptions?.param){


      console.log('here we go')
      updatedUrl += reqOptions?.param
    }
   console.log(updatedUrl)
    return axios.delete(updatedUrl, reqOptions );
    }

    static getCtoken (){
      getCSRFToken()
    }
}
const getCSRFToken = async () => {
  const response = await axios.get("http://localhost:4001/api/v1/sec/");
  console.log(response.data)
  axios.defaults.headers.post['X-CSRF-Token'] = response.data.token;
  console.log('token addded',response.data.token )
};