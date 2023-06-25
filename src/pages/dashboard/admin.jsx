
import React, { useEffect,useState,useReducer }  from "react";



import { Link, NavLink,useNavigate,useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from 'axios';
import { getAdminPermissionData } from "../../data/admin-token-data";

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
  Button
} from "@material-tailwind/react";
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
  AdminTableData,
} from "@/data";
import "../../../public/css/cssRhw/common.css";

export function Admin() {
  const [permissionData, setPermissionData] = useState([]);
  const [cookies, setCookie, removeCookie] = useCookies(["default"]);
  useEffect(() => {
    getAdminPermissionTable()
   
    
  }, []);
  const [any, forceUpdate] = useReducer(num => num + 1, 0);
  const navigate = useNavigate();

  const location = useLocation();
  let [click, setClick] = useState('')
  function postPermission(id){
    console.log("2",id)
    let puturl = "http://dev-break-the-cycle.ap-northeast-2.elasticbeanstalk.com/api/v1/";
    let puturl_set = puturl + "bo-manage-persons/permission/"+id;
    console.log("!!!!!",cookies.cookie)
    let token = cookies.cookie.token
    console.log("token",token)
    let putData = {
      managePersonId:id
    }
    axios
      .put(puturl_set,putData,{
        headers:{'Authorization': token}
      })
      
      .then((response) => {
        console.log(response.status);
        console.log("putData",putData)
        console.log("response",response)
        console.log("response.data",response.data)
        
        // getAdminPermissionTable()
        setClick("clickclick"+id)
        alert("활성화가 완료되었습니다.")
      })
      
      .catch((error) => {
        console.log("error:",error);
        console.log("re:", error.message);
        console.log("re:", error.body);
        console.log("re:", error.config);
        console.log("re:", error.requests);
        
      });
  }


  console.log("location",location)
  console.log("location",location.state)
  function getAdminPermissionTable(){
    let geturl = "http://dev-break-the-cycle.ap-northeast-2.elasticbeanstalk.com/api/v1/";
    let geturl_set = geturl + "bo-manage-persons/permission";
    console.log("!!!!!",cookies.cookie)
    let token = cookies.cookie.token
    console.log("token",token)
    getAdminPermissionData({"token":token}).then(()=>{
      forceUpdate()
    })
    
    // axios
    //   .get(geturl_set,{
    //     headers:{'Authorization': token}
    //   })
      
    //   .then((response) => {
    //     console.log(response.status);
    //     console.log(response.data);
    //     console.log("response",response)
    //     console.log("permissionData",response.data.data)
    //     setPermissionData(response.data.data)
    //     console.log("permissionData",permissionData)
  
        
    //   })
      
    //   .catch((error) => {
        
    //     console.log("re:", error.message);
    //     console.log("re:", error.body);
    //     console.log("re:", error.config);
    //     console.log("re:", error.requests);
        
    //   });
    



  }


  const handleToProfile=(item)=>{
    console.log("handleToProfile",item)
    // 어드민 플로우인지 구분하는 flag와 해당 경찰의 id를 넘기고 해당 id로 profile page 에서 체크!
    navigate('/dashboard/profile',{
      state:{
        name:`${item}`
      }
    })
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
                토큰 신청 리스트
              </Typography>
              <Typography
                variant="small"
                className="flex items-center gap-1 font-normal text-blue-gray-600"
              >
                <CheckIcon strokeWidth={3} className="h-4 w-4 text-blue-500" />
                <strong>30 일</strong> 이내
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
                <MenuItem>Action</MenuItem>
                <MenuItem>Another Action</MenuItem>
                <MenuItem>Something else here</MenuItem>
              </MenuList>
            </Menu>
          </CardHeader>
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  {["이름", "전화번호", "요청날짜", "permission"].map(
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
                {AdminTableData.map(
                  ({ img, name, phoneNumber, createdAt, id }, key) => {
                    const className = `py-3 px-5 ${
                      key === projectsTableData.length - 1
                        ? ""
                        : "border-b border-blue-gray-50"
                    }`;

                    return (
                      <tr key={name}>
                        <td className={className}>
                          <div className="flex items-center gap-4">
                            <Avatar src={"/img/pngegg.png"} alt={name} size="sm" />
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-bold"
                              
                            >
                              <div onClick={()=>handleToProfile(name)}>{name}</div>
                              {/* <Link to="/dashboard/profile"
                                state={{"name":name}}
                               >{name}</Link> */}
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
                            {createdAt}
                          </Typography>
                        </td>
                        <td className={className}>
                          <div className="w-10/12">
                            {/* <Typography
                              variant="small"
                              className="mb-1 block text-xs font-medium text-blue-gray-600"
                            >
                              {completion}%
                            </Typography>
                            <Progress
                              value={completion}
                              variant="gradient"
                              color={completion === 100 ? "green" : "blue"}
                              className="h-1"
                            /> */}
                            <Button
                              color = "pink"
                              className = {click === 'clickclick'+id ? 'clickclick':''}
                              onClick = {()=>{
                                console.log("1")
                                postPermission(id)
                              }}
                            >
                              OK
                            </Button>
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
        {/* <div class = "text-SUB2">asdf</div> */}
      </div>
    </div>
  );
}

export default Admin;
