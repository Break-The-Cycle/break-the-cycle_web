import axios from "axios";

export let AdminTableData = [];
  




const AdminTableCallInitData = {
  token: "",
  
};



export const getAdminPermissionData = async (adminFormCall = AdminTableCallInitData) => {
  
 console.log("jscall")
  let geturl = "http://dev-break-the-cycle.ap-northeast-2.elasticbeanstalk.com/api/v1/";
  let geturl_set = geturl + "bo-manage-persons/permission";
    
  console.log("adminForm",adminFormCall);
  try {
    const { data } = await axios.get(geturl_set, {
      headers:{'Authorization': adminFormCall.token}
    });
    
    console.log("dataaaa:", data.data);

    AdminTableData = data.data
    console.log("AdminTableData",AdminTableData)
    // return data;
  } catch (error) {
    // return error;
    console.log("error",error)
  }
};

export default AdminTableData;