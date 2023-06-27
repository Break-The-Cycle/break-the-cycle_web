import {
    Card,
    CardBody,
    CardHeader,
    CardFooter,
    Avatar,
    Typography,
    Tabs,
    TabsHeader,
    Tab,
    Switch,
    Tooltip,
    Button,
  } from "@material-tailwind/react";
  import {
    HomeIcon,
    ChatBubbleLeftEllipsisIcon,
    Cog6ToothIcon,
    PencilIcon,
  } from "@heroicons/react/24/solid";
  import { Link,useLocation } from "react-router-dom";
  import { ProfileInfoCard, MessageCard } from "@/widgets/cards";
  import { platformSettingsData, conversationsData, projectsData,victimData,AdminTableData } from "@/data";
  import {useState,useEffect} from 'react';
  export function RecordDetail(flag) {
    const location = useLocation();
    const [police, setPolice] = useState({
      name:"",
      mobile : "",
      email:"",
      location:"",
      information:""
    })
    const [victim, setVictim] = useState({
      image:"",
      name : "",
      id:"",
      reportDate:"",
      division:"",
      diary:"",
    })
    useEffect(() => {
      
      
      console.log("effect",location.state)
      setVictim(location.state)
      
      
    }, []);
  
  
    let applicantProfile = {
      name:"",
      mobile : "",
      email:"",
      location:"",
      information:""
    }
    const name = location.state.name; // 추가된 부분
    console.log("location",location)
    console.log("location",location.state.image)
    //setVictim(location.state)
    console.log("name",name,flag)
    console.log("AdminTableData",AdminTableData)
  
    AdminTableData.forEach((applicant,index,array)=>{
      
      if(applicant.name == name){
        console.log(name)
        
        applicantProfile.name = applicant.name
        applicantProfile.mobile = applicant.members
        applicantProfile.email = ""
        applicantProfile.location = ""
        applicantProfile.information = ""
        
        
      }
      console.log("applicantProfile",applicantProfile)
    })
  
  
    return (
      <>
        {/* 여기 뒤에 url 부분이 profile 위에 있는 이미지 */}
        <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-[url(https://yimgf-thinkzon.yesform.com/docimgs/public/1/65/64071/64070399.jpg)] bg-cover	bg-center">
          <div className="absolute inset-0 h-full w-full bg-blue-500/50" />
        </div>
        <Card className="mx-3 -mt-16 mb-6 lg:mx-4">
          <CardBody className="p-4">
            <div className="mb-10 flex items-center justify-between gap-6">
              <div className="flex items-center gap-6">
                {/* <Avatar
                  src="/img/bruce-mars.jpeg"
                  alt="bruce-mars"
                  size="xl"
                  className="rounded-lg shadow-lg shadow-blue-gray-500/40"
                /> */}
                <div>
                  <Typography variant="h5" color="blue-gray" className="mb-1">
                    {name}
                  </Typography>
                  <Typography
                    variant="small"
                    className="font-normal text-blue-gray-600"
                  >
                    
                  </Typography>
                </div>
              </div>
           
            </div>
            {/* <div className="gird-cols-1 mb-12 grid gap-12 px-4 lg:grid-cols-2 xl:grid-cols-3"> */}
            <div className="gird-cols-1 mb-12 grid gap-12 px-4 lg:grid-cols-2 xl:grid-cols-2">
             
                {victim.division == "PICTURE" ? 
                (
                <>
                <ProfileInfoCard
                  title="사진"
                  description="날짜: 2023년 6월 15일

                  오늘 그가 다시 화를 내고, 손놀림과 욕설로 나를 공격했다. 고통과 두려움으로 가슴이 아팠다. 나는 힘들지만, 나 자신을 버티기로 다짐한다. 이 일기는 나의 강함과 생존을 기록하는 증거가 될 것이다. 더 이상 피해자가 아닌, 생존자로서 앞으로 나아가려고 한다."
                 
                  
                  action={
                    <Tooltip content="Edit Profile">
                      <PencilIcon className="h-4 w-4 cursor-pointer text-blue-gray-500" />
                    </Tooltip>
                  }
                />

                {/* <img src = {`data:image/jpeg;base64,${victim.image}`}></img> */}
                <img src = "../../../public/img/scar.jpg"></img>
                
                </>
                
                ): victim.division == "DIARY"? 
                (
                  <>
                  <ProfileInfoCard
                    title="일기"
                    description="2020.01.01 ~~~~ 에서 ~~~에 ~~~ 한 일이 있었다"
                  
                    action={
                      <Tooltip content="Edit Profile">
                        <PencilIcon className="h-4 w-4 cursor-pointer text-blue-gray-500" />
                      </Tooltip>
                    }
                  />
                  
                  </>


                ):victim.division == "VIDIO"? (
                  <>
                     <ProfileInfoCard
                      title="영상"
                      description="2020.01.01 ~~~~ 에서 ~~~에 ~~~ 한 일이 있었다"

                      action={
                        <Tooltip content="Edit Profile">
                          <PencilIcon className="h-4 w-4 cursor-pointer text-blue-gray-500" />
                        </Tooltip>
                      }
                    />
                  </>
                ):"" }
               
                
             
                
             
              <div hidden>
                <Typography variant="h6" color="blue-gray" className="mb-3">
                  담당 피해자
                </Typography>
                <ul className="flex flex-col gap-6">
                  {victimData.map((props) => (
                    <MessageCard
                      key={props.name}
                      {...props}
                      action={
                        <Button variant="text" size="sm">
                          reply
                        </Button>
                      }
                    />
                  ))}
                </ul>
              </div>
            </div>
           
          </CardBody>
        </Card>
        
      </>
    );
  }
  
  export default RecordDetail;
  