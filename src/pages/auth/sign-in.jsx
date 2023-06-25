import { Link,useNavigate,useLocation } from "react-router-dom";
import { React, useState, useEffect, useRef } from "react";
import axios from 'axios';
import { useCookies } from "react-cookie";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";

export function SignIn() {
  const navigate = useNavigate();
  const location = useLocation();
  const [cookies, setCookie, removeCookie] = useCookies(["default"]);
  function handleLoginSubmit(e) {
    console.log(e)
    e.preventDefault();
    console.log("id/pw",id,password)
    
    // 여기서 post하기
    
    let posturl = "http://dev-break-the-cycle.ap-northeast-2.elasticbeanstalk.com/api/v1/";
    let posturl_set = posturl + "auth/login";
    console.log("posturl:", posturl_set);
    let data_t={
      "loginId":id,
      "password":password
    }

    axios
      .post(posturl_set, data_t)
      .then((response) => {
        
        console.log("response.status",response.data.status);
        console.log("response",response.data.message);
        console.log("response",response.data);
        
        if(id == "admin123"){
          setCookie("cookie", {
            name : "admin",
            role : "admin",
            token : response.data.data.accessToken
          });
          // alert(response.data.data.accessToken)
          navigate("/dashboard/admin",{
            state:{
              name : "admin",
              role : "admin"
            }
          })
        }else{
          setCookie("cookie", {
            name : "경찰",
            id : response.data.data.userId,
            role : "police",
            token : response.data.data.accessToken
          });
          // alert(response.data.data.accessToken)
          navigate("/dashboard/main",{
            state:{
              name : "경찰",
              role : "police"
            }
          })
          
        }
       
        //window.location.replace("/Main");
      })
      
      .catch((error) => {
        alert("아이디와 비밀번호를 다시 확인하세요");
        console.log("re:", error.message);
        console.log("re:", error.body);
        console.log("re:", error.config);
        console.log("re:", error.requests);
        
      });



    // 임시 로그인
    // if(id == "root" & password == "1111"){
    //   setCookie("cookie", {
    //     name : "admin",
    //     role : "admin"
    //   });
    //   navigate("/dashboard/admin",{
    //     state:{
    //       name : "admin",
    //       role : "admin"
    //     }
    //   })
      

    // }else if(id == "police" & password == "1111"){
    //   setCookie("cookie", {
    //     name : "경찰",
    //     role : "police"
    //   });
    //   navigate("/dashboard/main",{
    //     state:{
    //       name : "경찰",
    //       role : "police"
    //     }
    //   })

      
    // }
    // else{
    //   alert("아이디와 비밀번호를 확인하세요")
    // }


  }
  function onChangeLogIn(e) {
    console.log("e_onchange",e)
    
    const value = e.target.value
    const name = e.target.name
    console.log("value",value)
    console.log("name",name)    
    setLogInInfo({...logInInfo,[name]:value}); // 이전 정보들은 넣어놓고, id면 id 만 pw면 pw만 바꿔서 갱신하기
    // 이렇게 전역 id/pw값을 계속 갱신하고, 제줄버튼을 누르게 되면 전역 id/pw를 post하기
  }
  // 초기 logininfo 선언
  const [logInInfo, setLogInInfo] = useState({
    id: "",
    password: "",
    role:"",
    name:""
  });
   
  const {id, password} = logInInfo; // 전역 id/pw 선언

  return (
    <>
      <img
        src="https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80"
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 z-0 h-full w-full bg-black/50" />
      <div className="container mx-auto p-4">
        <form 
          onSubmit={handleLoginSubmit}
        >
          <Card className="absolute top-2/4 left-2/4 w-full max-w-[24rem] -translate-y-2/4 -translate-x-2/4">
            <CardHeader
              variant="gradient"
              color="blue"
              className="mb-4 grid h-28 place-items-center"
            >
              <Typography variant="h3" color="white">
                Sign In
              </Typography>
            </CardHeader>
            <CardBody className="flex flex-col gap-4">
              
                <Input type="text" label="Id" name = "id" size="lg" onChange={onChangeLogIn} />
                <Input type="password" label="Password" name = "password" size="lg" onChange={onChangeLogIn}/>
                <div className="-ml-2.5">
                  <Checkbox label="Remember Me" />
                </div>
              
            </CardBody>
            <CardFooter className="pt-0">
              <Button variant="gradient" type = "submit" fullWidth>
                Sign In
              </Button>
              <Typography variant="small" className="mt-6 flex justify-center">
                Don't have an account?
                <Link to="/auth/sign-up">
                  <Typography
                    as="span"
                    variant="small"
                    color="blue"
                    className="ml-1 font-bold"
                  >
                    Sign up
                  </Typography>
                </Link>
              </Typography>
            </CardFooter>
          </Card>
        </form>
      </div>
    </>
  );
}

export default SignIn;
