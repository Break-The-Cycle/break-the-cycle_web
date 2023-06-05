import React, { useEffect,useState,useReducer  } from "react";
import { useCookies } from "react-cookie";
import { getMainTableData } from "../../data/main-victim-data";
import axios from 'axios';
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Tooltip,
  Progress,
} from "@material-tailwind/react";
import { Link, NavLink,useNavigate } from "react-router-dom";
import {
  ClockIcon,
  CheckIcon,
  EllipsisVerticalIcon,
  ArrowUpIcon,
} from "@heroicons/react/24/outline";
import { StatisticsCard } from "@/widgets/cards";
import { StatisticsChart } from "@/widgets/charts";
import {
  statisticsCardsData,
  statisticsChartsData,
  projectsTableData,
  ordersOverviewData,
  MainTableData,
} from "@/data";
import "../../../public/css/cssRhw/common.css";

export function Main() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["default"]);
  let token = cookies.cookie.token
  const [any, forceUpdate] = useReducer(num => num + 1, 0);
  useEffect(() => {
    let token = cookies.cookie.token
    console.log("tokeneffect",token)
    
    getMainTableData({"token":token}).then(()=>{
      console.log("done")
      forceUpdate(); // 강제 리랜더링
    })
    
  }, []);
  console.log("MainTableData!!",MainTableData)
    console.log("token",token)
  const handleToRecord=(item)=>{
    console.log("handleToRecord",item)
    // 어드민 플로우인지 구분하는 flag와 해당 경찰의 id를 넘기고 해당 id로 profile page 에서 체크!
    navigate('/dashboard/record',{
      state:{
        name:`${item}`
      }
    })
  }
  const addTokenData = async(event)=>{
  
  
    console.log("e:",event)
    console.log("!!!!!",cookies.cookie)
    let userId = cookies.cookie.id
    let geturl = "http://dev-break-the-cycle.ap-northeast-2.elasticbeanstalk.com/api/v1/";
    let geturl_set = geturl + "manage-persons/"+userId+"/violent-records";
    
    let token = cookies.cookie.token
    
    console.log("token",token)
    console.log("userId",userId)
    const data_t = {
      managePersonId: userId,
      Submission: event.target[0].value,
      
      
    };
  
   const headers = {
    
    Authorization: token
   }
  
  
    console.log("data",data_t)
    // axios
    // .get(geturl_set,{
    //   headers:{Authorization: token}
    // })
    // .then((response) => {
    //   console.log(response.status);
    //   console.log(response.data);
    //   console.log("response1",response)
      
    //   setIntutionData(response.data.data)
    //   console.log("IntutionData",IntutionData)

      
    // })
    
    // .catch((error) => {
      
    //   console.log("re:", error.message);
    //   console.log("re:", error.body);
    //   console.log("re:", error.config);
    //   console.log("re:", error.requests);
      
    // });
    axios({
      url: "http://dev-break-the-cycle.ap-northeast-2.elasticbeanstalk.com/api/v1/manage-persons/2/violent-records",
      method: 'get',
      
      headers: { 'Authorization': token,'Submission': event.target[0].value },
      
    }).then((response) => {
      console.log(response.status);
      console.log(response.data);
      console.log("response1",response)
      
      // setMainTableData()
      

      
    }).catch((error) => {
      
      console.log("re:", error.message);
      console.log("re:", error.body);
      console.log("re:", error.config);
      console.log("re:", error.requests);
      
    });
   
    
  
  }
  return (
    <div className="mt-12">
        
      
      
      <div className="mb-4 grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* span-4 로 바꾸면서 가로길이 전체로! */}
        <Card className="overflow-hidden xl:col-span-4">
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 flex items-center justify-between p-6"
          >
            <div>
              <Typography variant="h6" color="blue-gray" className="mb-1">
                연결된 피해자 리스트
              </Typography>
              <Typography
                variant="small"
                className="flex items-center gap-1 font-normal text-blue-gray-600"
              >
                {/* <CheckIcon strokeWidth={3} className="h-4 w-4 text-blue-500" /> */}
                {/* <strong>30 일</strong> this month */}
              </Typography>
            </div>
            <Menu placement="left-start">
              <MenuHandler>
                <IconButton size="sm" variant="text" color="blue-gray">
                  <EllipsisVerticalIcon
                    strokeWidth={3}
                    fill="currenColor"
                    className="h-6 w-6"
                  />
                </IconButton>
              </MenuHandler>
              <MenuList>
                <MenuItem
                className=" text-black  "
                type="button"
                onClick={() => setShowModal(true)}
                
                
                >피해자 연결</MenuItem>
                
              </MenuList>
            </Menu>
          </CardHeader>
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  {["이름", "전화번호", "국적", "나이"].map(
                    (el) => (
                      <th
                        key={el}
                        className="border-b border-blue-gray-50 py-3 px-6 text-left"
                      >
                        <Typography
                          variant="small"
                          className="text-[11px] font-medium uppercase text-blue-gray-400"
                        >
                          {el}
                        </Typography>
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {/* projects-table-data.js 에 데이터 리스트가 있음 아마 이 테이블을 사용하지 않을까? */}
                {MainTableData.map(
                  ({ id,name, phoneNumber}, key) => {
                    const className = `py-3 px-5 ${
                      key === projectsTableData.length - 1
                        ? ""
                        : "border-b border-blue-gray-50"
                    }`;

                    return (
                      <tr key={name}>
                        <td className={className}>
                          <div className="flex items-center gap-4">
                            
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-bold"
                            >
                              <div onClick={()=>handleToRecord(name)}>{name}</div>
                              
                              
                            </Typography>
                          </div>
                        </td>
                        <td className={className}>
                          {/* {members.map(({ img, name }, key) => (
                            <Tooltip key={name} content={name}>
                              <Avatar
                                src={img}
                                alt={name}
                                size="xs"
                                variant="circular"
                                className={`cursor-pointer border-2 border-white ${
                                  key === 0 ? "" : "-ml-2.5"
                                }`}
                              />
                            </Tooltip>
                          ))} */}
                           <Typography
                            variant="small"
                            className="text-xs font-medium text-blue-gray-600"
                          >
                            {phoneNumber}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography
                            variant="small"
                            className="text-xs font-medium text-blue-gray-600"
                          >
                            {phoneNumber}
                          </Typography>
                        </td>
                        <td className={className}>
                          <div className="w-10/12">
                            <Typography
                              variant="small"
                              className="mb-1 block text-xs font-medium text-blue-gray-600"
                            >
                              {phoneNumber}세
                            </Typography>
                            {/* <Progress
                              value={completion}
                              variant="gradient"
                              color={completion === 100 ? "green" : "blue"}
                              className="h-1"
                            /> */}
                          </div>
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          </CardBody>
        </Card>
        
      </div>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none min-w-500"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl ">
              {/*content*/}
              
              <div className="min-w-[600px] border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    institution 추가
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <form onSubmit = {function(event){
                 
                 event.preventDefault()
                 console.log("ee",event)
                 addTokenData(event)
                 setShowModal(false)
                }}>
                  <div className="relative p-6 flex-auto">
                    <p className="my-4 text-slate-500 text-lg leading-relaxed">
                      피해자로부터 받은 토큰을 입력해 주세요
                    </p>
                  </div>
                  <div className="relative p-6 flex-auto">
                          <label for="text" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">토큰</label>
                          <input type="text" name="intutionName" id="intutionName" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" />
                  </div>
                  
                  {/* <div>
                    <button onClick ={() => onChangeOpenPost()} >주소찾기</button>

        
                  </div> */}
                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    {/* <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Close
                    </button> */}
                    <button
                      className="bg-emerald-500 text-black active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="submit"
                      // onClick={() => setShowModal(false)}
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
              
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </div>
  );
}

export default Main;
