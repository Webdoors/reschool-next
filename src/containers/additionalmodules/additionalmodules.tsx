import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { AppDispatch } from '../../store/reducer'; // Replace with your actual import
import { useDispatch } from 'react-redux';
import { ApiService } from '../../api/api.service';
import * as EndPoints from "../../api/endPoints";
import arrowup from "../../img/chevron-up.svg";
import arrowdown from "../../img/chevron-down.svg";

const AdditionalModulesContainer: React.FC = () => {
  const params: {id: string} = useParams()
  const [AdditinalInfo, setAdditinalInfo] = useState<any>(null); // Replace 'any' with the actual type of your certificate information
  const dispatch: AppDispatch = useDispatch();
  const history = useHistory();

    useEffect(() => {
        ApiService.apiCall(EndPoints.GET_ADDITIONAL, params.id)
            .then((res: any) => {

                setAdditinalInfo(res?.data?.data); // Assuming this is an array
            })
            .catch((err: any) => {
                console.log(err?.response?.data?.message);
                if (history) {
                    // history.push('/notfound');
                }
            });
    }, [params.id]);
    console.log(AdditinalInfo);

    const [openItemId, setOpenItemId] = useState<number | null>(null);

    const toggleItem = (id: number) => {
        // If the item is already open, close it, otherwise open the clicked item
        setOpenItemId(openItemId === id ? null : id);
    };

  return <div className="main-content" style={{marginTop: '88px', overflow: 'hidden'}}>
      <div className="container my-5">
          <h2 style={{fontFamily: 'Helvetica_Neue_LT_GEO_55, serif',fontSize:"16px",color:"#FFF",fontFeatureSettings: "'case' on",}}>თქვენს მიერ არჩეულ მიმართულებას მოჰყვება შემდეგი ბონუს მოდულები</h2>
          {AdditinalInfo?.map((module: any) => (
              <div style={{background:"#222",padding:"30px 30px",marginBottom:"8px",borderRadius:"10px",color:"#FFF"}} key={module.id}>
                  <div
                      style={{ cursor: 'pointer' }}
                      onClick={() => toggleItem(module.id)} // Toggle the accordion item on click
                  >
                      <h3 className="mb-0" style={{color:"#FFF"}}>{module.title}
                          {openItemId === module.id ? (
                              <img style={{width:"30px",float:"right"}} src={arrowup} alt="Collapse" />
                          ) : (
                              <img style={{width:"30px",float:"right"}} src={arrowdown} alt="Expand" />
                          )}
                      </h3>
                  </div>
                  {openItemId === module.id && <p className="mb-0" style={{fontFamily: 'Helvetica_Neue_LT_GEO_55, serif'}}>{module.text}</p>} {/* Show the text if the item is open */}
              </div>
          ))}
      </div>
  </div>
}


export default AdditionalModulesContainer