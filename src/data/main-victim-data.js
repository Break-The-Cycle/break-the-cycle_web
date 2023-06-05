
import axios from "axios";


export let MainTableData = [
    // {
    //   img: "/img/girl1.png",
    //   name: "도안 티 낌 찌",
    //   members: "010-0000-0000",
    //   budget: "베트남",
    //   completion: "34",
    // },
    // {
    //   img: "/img/girl1.png",
    //   name: "실라완 인타미",
    //   members: "010-1111-1111",
    //   budget: "태국",
    //   completion: "23",
    // },
    // {
    //   img: "/img/girl1.png",
    //   name: "자오리나",
    //   members: "010-2222-2222",
    //   budget: "중국",
    //   completion: 40,
    // },
    // {
    //   img: "/img/girl1.png",
    //   name: "올리비아 맥다니엘",
    //   members: "010-3333-3333",
    //   budget: "필리핀",
    //   completion: 22,
    // },
    // {
    //   img: "/img/girl1.png",
    //   name: "사와 호마레 ",
    //   members:"010-4444-4444",
    //   budget: "일본",
    //   completion: 19,
    // },
    
  ];
  


    
  
  
  
  
    const mainTableCallInitData = {
      token: "",
      
    };
    
    
    
    export const getMainTableData = async (mainFormCall = mainTableCallInitData) => {
      
      await axios({
        url: "http://dev-break-the-cycle.ap-northeast-2.elasticbeanstalk.com/api/v1/manage-persons/2/violent-records",
        method: 'get',
        
        headers: { 
          'Authorization': mainFormCall.token,
          'Submission': "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ2aW9sZW50IHJlY29yZCBzdWJtaXNzaW9uIHRva2VuIiwiZXhwIjoxNjg2MTk2NTMwLCJzdWJtaXNzaW9uUmVjb3JkSWQiOjF9.i-zc7l48oNnX7wrxZUsHIEOyBN1-BsEg0LdUd4_13A_Gkg28XymVZUkOoEnG_T1JGN3YysG0EkkaVzDbzcMUgg" 
          
      
        },
        params:{
          'usePerson':true,
          'record':false
        }
        
      }).then((response) => {
        console.log(response.status);
        console.log(response.data);
        console.log("data.data",response.data.data);
        console.log("response1",response)
        
        // setMainTableData()
        
        MainTableData= [response.data.data.usePerson]
        console.log("MainTableData",MainTableData)
        
      }).catch((error) => {
        
        console.log("re:", error.message);
        console.log("re:", error.body);
        console.log("re:", error.config);
        console.log("re:", error.requests);
        
      });
     
    
    
    };
  
  
    export default MainTableData;
    