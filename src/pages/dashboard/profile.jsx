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
export function Profile(flag) {
  const location = useLocation();
  const [police, setPolice] = useState({
    name:"",
    mobile : "",
    email:"",
    location:"",
    information:""
  })


  let applicantProfile = {
    name:"",
    mobile : "",
    email:"",
    location:"",
    information:""
  }
  const name = location.state?.name; // 추가된 부분
  console.log("location",location)
  console.log("location",location.state)
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
              <Avatar
                src="/img/bruce-mars.jpeg"
                alt="bruce-mars"
                size="xl"
                className="rounded-lg shadow-lg shadow-blue-gray-500/40"
              />
              <div>
                <Typography variant="h5" color="blue-gray" className="mb-1">
                  {name}
                </Typography>
                <Typography
                  variant="small"
                  className="font-normal text-blue-gray-600"
                >
                  경기도 고양시 화전 경찰서 / 경감
                </Typography>
              </div>
            </div>
            {/* <div className="w-96">
              <Tabs value="app">
                <TabsHeader>
                  <Tab value="app">
                    <HomeIcon className="-mt-1 mr-2 inline-block h-5 w-5" />
                    App
                  </Tab>
                  <Tab value="message">
                    <ChatBubbleLeftEllipsisIcon className="-mt-0.5 mr-2 inline-block h-5 w-5" />
                    Message
                  </Tab>
                  <Tab value="settings">
                    <Cog6ToothIcon className="-mt-1 mr-2 inline-block h-5 w-5" />
                    Settings
                  </Tab>
                </TabsHeader>
              </Tabs>
            </div> */}
          </div>
          {/* <div className="gird-cols-1 mb-12 grid gap-12 px-4 lg:grid-cols-2 xl:grid-cols-3"> */}
          <div className="gird-cols-1 mb-12 grid gap-12 px-4 lg:grid-cols-2 xl:grid-cols-2">
            {/* <div>
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Platform Settings
              </Typography>
              <div className="flex flex-col gap-12">
                {platformSettingsData.map(({ title, options }) => (
                  <div key={title}>
                    <Typography className="mb-4 block text-xs font-semibold uppercase text-blue-gray-500">
                      {title}
                    </Typography>
                    <div className="flex flex-col gap-6">
                      {options.map(({ checked, label }) => (
                        <Switch
                          key={label}
                          id={label}
                          label={label}
                          defaultChecked={checked}
                          labelProps={{
                            className: "text-sm font-normal text-blue-gray-500",
                          }}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div> */}
              {/* <div>
              {AdminTableData.map((props) => (
                  <div>
                    {props.name==name?
                      (
                        <ProfileInfoCard
                          title="Profile 정보"
                          description="안녕하세요. 화전경찰서 외사계 ~~~ 입니다. 국민의 자유와 권리의 보호 및 사회공공의 질서유지를 위한 경찰관의 직무수행에 필요한 사항을 규정함을 목적으로 하고 있습니다."
                          details={{
                            "last name": `${props.name}`.substr(0,1),
                            "first name":`${props.name}`.substr(1,3),
                            mobile: `${props.members}`,
                            email: "테이블에 추가해야할 정보",
                            location: "테이블에 추가해야할 정보",
                            social: (
                              <div className="flex items-center gap-4">
                                <i className="fa-brands fa-facebook text-blue-700" />
                                <i className="fa-brands fa-twitter text-blue-400" />
                                <i className="fa-brands fa-instagram text-purple-500" />
                              </div>
                            ),
                          }}
                          action={
                            <Tooltip content="Edit Profile">
                              <PencilIcon className="h-4 w-4 cursor-pointer text-blue-gray-500" />
                            </Tooltip>
                          }
                        />
                      )
                      :
                      ""
                    }
                  </div>
                ))}
              </div> */}

              <ProfileInfoCard
                title="Profile 정보"
                description="안녕하세요. 화전경찰서 외사계 ~~~ 입니다. 국민의 자유와 권리의 보호 및 사회공공의 질서유지를 위한 경찰관의 직무수행에 필요한 사항을 규정함을 목적으로 하고 있습니다."
                details={{
                  "last name": applicantProfile.name.substr(0,1),
                  "first name":applicantProfile.name.substr(1,3),
                  mobile: applicantProfile.mobile,
                  email: "테이블에 추가해야할 정보",
                  location: "테이블에 추가해야할 정보",
                  social: (
                    <div className="flex items-center gap-4">
                      <i className="fa-brands fa-facebook text-blue-700" />
                      <i className="fa-brands fa-twitter text-blue-400" />
                      <i className="fa-brands fa-instagram text-purple-500" />
                    </div>
                  ),
                }}
                action={
                  <Tooltip content="Edit Profile">
                    <PencilIcon className="h-4 w-4 cursor-pointer text-blue-gray-500" />
                  </Tooltip>
                }
              />
           
            <div>
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
          {/* <div className="px-4 pb-4">
            <Typography variant="h6" color="blue-gray" className="mb-2">
              Projects
            </Typography>
            <Typography
              variant="small"
              className="font-normal text-blue-gray-500"
            >
              Architects design houses
            </Typography>
            <div className="mt-6 grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-4">
              {projectsData.map(
                ({ img, title, description, tag, route, members }) => (
                  <Card key={title} color="transparent" shadow={false}>
                    <CardHeader
                      floated={false}
                      color="gray"
                      className="mx-0 mt-0 mb-4 h-64 xl:h-40"
                    >
                      <img
                        src={img}
                        alt={title}
                        className="h-full w-full object-cover"
                      />
                    </CardHeader>
                    <CardBody className="py-0 px-1">
                      <Typography
                        variant="small"
                        className="font-normal text-blue-gray-500"
                      >
                        {tag}
                      </Typography>
                      <Typography
                        variant="h5"
                        color="blue-gray"
                        className="mt-1 mb-2"
                      >
                        {title}
                      </Typography>
                      <Typography
                        variant="small"
                        className="font-normal text-blue-gray-500"
                      >
                        {description}
                      </Typography>
                    </CardBody>
                    <CardFooter className="mt-6 flex items-center justify-between py-0 px-1">
                      <Link to={route}>
                        <Button variant="outlined" size="sm">
                          view project
                        </Button>
                      </Link>
                      <div>
                        {members.map(({ img, name }, key) => (
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
                        ))}
                      </div>
                    </CardFooter>
                  </Card>
                )
              )}
            </div>
          </div> */}
        </CardBody>
      </Card>
      
    </>
  );
}

export default Profile;
