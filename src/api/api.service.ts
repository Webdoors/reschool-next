
import { Endpoint } from './endPoints';
import {RestService} from './rest.service'
import { API_METHOD } from './method';

export class ApiService {
    static apiCall(endpoint: Endpoint, args?: any, config?: any): Promise<any>{
       
      

        switch(endpoint.method){
            case API_METHOD.GET:
            return RestService.get(endpoint.api, args, config);
            case API_METHOD.POST: 
            return RestService.post(endpoint.api, args, config)
            case API_METHOD.DELETE: 
          
            return RestService.delete(endpoint.api, args, config)
            case API_METHOD.PATCH: 
            return RestService.patch(endpoint.api, args, config)
            default: 
          
            return new Promise((resolve, _reject)=> resolve('no endpoint found'))
        }
    }


    static addCToken() {
      RestService.getCtoken()
    }   
}


