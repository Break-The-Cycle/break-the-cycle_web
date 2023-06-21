import React ,{ useEffect,useState,useReducer } from "react";
import { getRecordTableData } from "../../data/record-data";
import { useCookies } from "react-cookie";
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
import { Link, NavLink,useLocation,useNavigate } from "react-router-dom";
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
  RecordData
} from "@/data";
import "../../../public/css/cssRhw/common.css";

export function Record() {
  const [cookies, setCookie, removeCookie] = useCookies(["default"]);
  let token = cookies.cookie.token
  
  useEffect(() => {
      
    console.log("token",token)
    console.log("effect")
    
    
    getRecordTableData({"token":token}).then(()=>{
      console.log("donestart")
      forceUpdate(); // 강제 리랜더링
      console.log("done",RecordData)
      console.log("doneend")
    })
  }, []);
    const location = useLocation();
    const navigate = useNavigate();
    const [any, forceUpdate] = useReducer(num => num + 1, 0);
    
    
  const handleToRecordDetail=(item)=>{
    console.log("handleToRecordDetail",item)
    // 어드민 플로우인지 구분하는 flag와 해당 경찰의 id를 넘기고 해당 id로 profile page 에서 체크!
    navigate('/dashboard/recordDetail',{
      state:{
        image:`${item.image}`,
        id:`${item.id}`,
        division:`${item.division}`,
        reportDate:`${item.reportDate}`,
        diary:`${item.diary}`,
        

      }
    })
  }
    const name = location.state?.name; // 추가된 부분
    
    
  console.log("location",location)
  console.log("location",location.state)
  console.log("RecordData",RecordData)
  

  let recordArray = []
  // RecordData.forEach((record,index,array)=>{
    
  //   if(record.name == name){
  //     console.log(name)
  //     recordArray.push(
  //       {
  //       name : record.name,
  //       time : record.time,
  //       title : record.title,
  //       classification : record.classification,
        
  //     })
      
      
      
  //   }
  //   console.log("recordArray",recordArray)
  // })
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
                피해 기록
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
                  {["증거물", "종류", "피해자 이름", "시간"].map(
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
                
                {RecordData.map(
                  ({ image, name, reportDate, diary, time,id,division }, key) => {
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
                              {/* <div onClick = {()=>handleToRecordDetail(title)}>{title}</div> */}
                              <div onClick = {()=>handleToRecordDetail({'image':image,'id':id,'division':division,'reportDate':reportDate,'diary':diary})}>{id}a</div>
                               
                              
                            </Typography>
                          </div>
                        </td>
                        <td className={className}>
                          
                           <Typography
                            variant="small"
                            className="text-xs font-medium text-blue-gray-600"
                          >
                            {/* {classification} */}
                            {division}b
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography
                            variant="small"
                            className="text-xs font-medium text-blue-gray-600"
                          >
                            {/* {name} */}
                            {id}
                          </Typography>
                        </td>
                        <td className={className}>
                          <div className="w-10/12">
                            <Typography
                              variant="small"
                              className="mb-1 block text-xs font-medium text-blue-gray-600"
                            >
                              {time}
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
    </div>
  );
}

export default Record;
