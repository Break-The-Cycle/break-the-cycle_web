import axios from "axios";

export let RecordData = [
    // {
    //   title: "injury picture",
    //   img : "",
    //   classification : "picture",
    //   name: "도안 티 낌 찌",
    //   time: "2023-04-16",
    // },
    // {
      
    //   title: "injury picture",
    //   img : "",
    //   classification : "picture",
    //   name: "실라완 인타미",
    //   time: "2023-04-16",
    // },
    // {

    //   title: "injury picture",
    //   img : "",
    //   classification : "picture",
    //   name: "자오리나",
    //   time: "2023-04-16",
      
    // },
    // {
      

    //   title: "injury picture",
    //   img : "",
    //   classification : "picture",
    //   name: "올리비아 맥다니엘",
    //   time: "2023-04-16",
    // },
    // {
      

    //   title: "injury picture",
    //   img : "",
    //   classification : "picture",
    //   name: "사와 호마레",
    //   time: "2023-04-16",
    // },
    // {
    //     title: "voice record 1",
    //     img : "",
    //     classification : "voice record",
    //     name: "도안 티 낌 찌",
    //     time: "2023-04-16",
    //   },
    //   {
        
    //     title: "voice record 1",
    //     img : "",
    //     classification : "voice record",
    //     name: "실라완 인타미",
    //     time: "2023-04-16",
    //   },
    //   {
  
    //     title: "voice record 1",
    //     img : "",
    //     classification : "voice record",
    //     name: "자오리나",
    //     time: "2023-04-16",
        
    //   },
    //   {
        
  
    //     title: "voice record 1",
    //     img : "",
    //     classification : "voice record",
    //     name: "올리비아 맥다니엘",
    //     time: "2023-04-16",
    //   },
    //   {
        
  
    //     title: "voice record 1",
    //     img : "",
    //     classification : "voice record",
    //     name: "사와 호마레",
    //     time: "2023-04-16",
    //   },
    //   {
    //     title: "diary 1",
    //     img : "",
    //     classification : "diary",
    //     name: "도안 티 낌 찌",
    //     time: "2023-04-16",
    //   },
    //   {
        
    //     title: "diary 1",
    //     img : "",
    //     classification : "diary",
    //     name: "실라완 인타미",
    //     time: "2023-04-16",
    //   },
    //   {
  
    //     title: "diary 1",
    //     img : "",
    //     classification : "diary",
    //     name: "자오리나",
    //     time: "2023-04-16",
        
    //   },
    //   {
        
  
    //     title: "diary 1",
    //     img : "",
    //     classification : "diary",
    //     name: "올리비아 맥다니엘",
    //     time: "2023-04-16",
    //   },
    //   {
        
  
    //     title: "diary 1",
    //     img : "",
    //     classification : "diary",
    //     name: "사와 호마레",
    //     time: "2023-04-16",
    //   },
  ];
  




  const recordTableCallInitData = {
    token: "",
    
  };
  
  
  
  export const getRecordTableData = async (recordFormCall = recordTableCallInitData) => {
    
    await axios({
      url: "http://dev-break-the-cycle.ap-northeast-2.elasticbeanstalk.com/api/v1/manage-persons/2/violent-records",
      method: 'get',
      
      headers: { 
        'Authorization': recordFormCall.token,
      // 'Submission': "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ2aW9sZW50IHJlY29yZCBzdWJtaXNzaW9uIHRva2VuIiwiZXhwIjoxNjg2MTk2NTMwLCJzdWJtaXNzaW9uUmVjb3JkSWQiOjF9.i-zc7l48oNnX7wrxZUsHIEOyBN1-BsEg0LdUd4_13A_Gkg28XymVZUkOoEnG_T1JGN3YysG0EkkaVzDbzcMUgg",
      'Submission': "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ2aW9sZW50IHJlY29yZCBzdWJtaXNzaW9uIHRva2VuIiwiZXhwIjoxNjg3OTI2Nzc4LCJzdWJtaXNzaW9uUmVjb3JkSWQiOjZ9.cPfMyusqkGjxPddelRAA3mzAC7KML6G5PAdlGr_iTf77TXotZYv5v-e0Ce3anbq3LrfzxZt0MEFAyO0ycIt0rQ", 
    
    
    },
    params:{
      'usePerson':false, 
      'record':true
    }
      
    }).then((response) => {
      console.log(response.status);
      console.log(response.data);
      console.log("data.data",response.data.data);
      console.log("response1",response)
      
      // setMainTableData()
      
      RecordData = response.data.data.record
      console.log("RecordData",RecordData)
      
    }).catch((error) => {
      
      console.log("re:", error.message);
      console.log("re:", error.body);
      console.log("re:", error.config);
      console.log("re:", error.requests);
      
    });
   
  
  
  };


  export default RecordData;
  