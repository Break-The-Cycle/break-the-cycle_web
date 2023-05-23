import React, { useEffect,useState } from "react";
import axios from 'axios';
import { Link, NavLink,useNavigate,useLocation } from "react-router-dom";
import DaumPostcode from 'react-daum-postcode';
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
import { useCookies } from "react-cookie";
import { StatisticsCard } from "@/widgets/cards";
import { StatisticsChart } from "@/widgets/charts";
import {
  statisticsCardsData,
  statisticsChartsData,
  projectsTableData,
  ordersOverviewData,
  AdminTableData,
  //IntutionData
} from "@/data";
import "../../../public/css/cssRhw/common.css";
// import "@/data/intution-data.js";



export function Official() {
  const [cookies, setCookie, removeCookie] = useCookies(["default"]);
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [address, setAddress] = useState(''); // 주소
  const [addressDetail, setAddressDetail] = useState(''); // 상세주소
  const [isOpenPost, setIsOpenPost] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  console.log("location",location)
  console.log("location",location.state)
  const [IntutionData, setIntutionData] = useState([]);
  useEffect(() => {
    getOfficialInstitution()
  }, []);
  const onChangeOpenPost = () => {
    setShowModal2(true)
    console.log(isOpenPost)
    setIsOpenPost(!isOpenPost);
    console.log(isOpenPost)
  };

  const onCompletePost = (data) => {
    let fullAddr = data.address;
    let extraAddr = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddr += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddr += extraAddr !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddr += extraAddr !== '' ? ` (${extraAddr})` : '';
    }

    setAddress(data.zonecode);
    setAddressDetail(fullAddress);
    setIsOpenPost(false);
  };
  const postCodeStyle = {
    display: 'block',
    position: 'relative',
    top: '0%',
    width: '400px',
    height: '400px',
    padding: '7px',
  };
function addinstiuition(event){
  event.preventDefalut();
  console.log("e:",event)
  let posturl = "http://dev-break-the-cycle.ap-northeast-2.elasticbeanstalk.com/api/v1/";
  let posturl_set = posturl + "official-institutions";
  console.log("!!!!!",cookies.cookie)
  let token = cookies.cookie.token
  console.log("token",token)
  const data_t = {
    name: e.target[0].value,
    phoneNumber: e.target[1].value,
    code: e.target[2].value,
    startTime: "19:00:00",
    endTime: "19:00:00",
    address: {
      division:"KOREA_GYEONGGID",
      postalNumber:"12345",
      sido:"",
      sigungu:"",
      eupmyeondong:"",
      li:"",
      island:"",
      bungee:"",
      detail:"",
    }
    
  };
  axios
    .post(posturl_set,{
      headers:{Authorization: token}
    },data_t)
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
  

}
  function getOfficialInstitution(){
    let posturl = "http://dev-break-the-cycle.ap-northeast-2.elasticbeanstalk.com/api/v1/";
    let posturl_set = posturl + "official-institutions";
    console.log("!!!!!",cookies.cookie)
    let token = cookies.cookie.token
    console.log("token",token)
    axios
      .get(posturl_set,{
        headers:{Authorization: token}
      })
      .then((response) => {
        console.log(response.status);
        console.log(response.data);
        console.log("response",response)
        
        setIntutionData(response.data.data)
        console.log("IntutionData",IntutionData)
  
        
      })
      
      .catch((error) => {
        
        console.log("re:", error.message);
        console.log("re:", error.body);
        console.log("re:", error.config);
        console.log("re:", error.requests);
        
      });
    



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
                <MenuItem 
                className=" text-black  "
                  type="button"
                  onClick={() => setShowModal(true)}>
                
                
                  
                
                  기관추가
                
                </MenuItem>
             
                
              </MenuList>
            </Menu>
          </CardHeader>
          
          {/* {IntutionData.map((name, code) => (
                                      <div>{name}</div>
                                    ))} */}
                                    
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-32">
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  {["이름", "전화번호", "코드", "time"].map(
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
                {IntutionData.map(
                  ({ code, name, phoneNumber, startTime, endTime }, key) => {
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
                              <div >{name}</div>
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
                            {code}
                          </Typography>
                        </td>
                        <td className={className}>
                          <div className="w-10/12">
                            <Typography
                              variant="small"
                              className="mb-1 block text-xs font-medium text-blue-gray-600"
                            >
                              {startTime}/{endTime}
                            </Typography>
                          
                           
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
                 alert("1")
                 console.log("ee",event)
                 addinstiuition(event)
                }}>
                  <div className="relative p-6 flex-auto">
                    <p className="my-4 text-slate-500 text-lg leading-relaxed">
                      기관 추가? 설명입니다
                    </p>
                  </div>
                  <div className="relative p-6 flex-auto">
                          <label for="text" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">기관명</label>
                          <input type="text" name="intutionName" id="intutionName" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" />
                  </div>
                  <div className="relative p-6 flex-auto">
                          <label for="text" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">전화번호</label>
                          <input type="text" name="intutionPhone" id="intutionPhone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" />
                  </div>
                  <div className="relative p-6 flex-auto">
                          <label for="text" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">코드</label>
                          <input type="text" name="intutionCode" id="intutionCode" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" />
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
                      onClick={() => setShowModal(false)}
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
      
      {showModal2 ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none min-w-500"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl ">
              {/*content*/}
              <div className="min-w-[600px] border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {isOpenPost  ? (
                   <DaumPostcode style={postCodeStyle} autoClose onComplete={onCompletePost } />
                ) : null
              }
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}




    </div>
  );
}

export default Official;
