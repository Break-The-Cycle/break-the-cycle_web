
import axios from 'axios';




let posturl = "http://dev-break-the-cycle.ap-northeast-2.elasticbeanstalk.com/api/v1/";
    let posturl_set = posturl + "/official-institutions";
    
    axios
      .post(posturl_set)
      .then((response) => {
        console.log(response.status);
        console.log(response.data);
        console.log("response",response)
        
        

        
      })
      
      .catch((error) => {
        
        console.log("re:", error.message);
        console.log("re:", error.body);
        console.log("re:", error.config);
        console.log("re:", error.requests);
        
      });


export const IntutionData = [
    // {
    //   img: "/img/pngegg.png",
    //   name: "강경찰",
    //   members: "010-0000-0000",
    //   budget: "2023-04-13",
    //   completion: "permit",
    // },
    
    
  ];
  
export default IntutionData;
  