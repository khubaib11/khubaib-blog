import { Label, TextInput,Button, Alert, Spinner } from "flowbite-react";
import React from "react";
import { Link,useNavigate } from "react-router-dom";
import { signInStart,signInSuccess,signInFailure } from "../redux/user/userSlice";
import { useDispatch,useSelector } from "react-redux";
import OAuth from "../components/OAuth";
export default function SignIn() {
  
    const [formData, setFormData] = React.useState({});
    const {loding,error:errorMessage} = useSelector((state) => state.user);
    const navigate=useNavigate();
    const dispatch = useDispatch();
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
      
    }
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      if( !formData.email || !formData.password){
        return dispatch(signInFailure('Please fill all the fields'));        
      }
      try {
        dispatch(signInStart());
  
        const response = await fetch('/api/auth/signin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        const data = await response.json();
        if(data.success===false){
           dispatch(signInFailure(data.message));
          
        }
        if(response.ok){
          dispatch(signInSuccess(data));
          navigate('/');
        }
      }
      catch (error) {
         dispatch(signInFailure(error.message));
      }
    }
  
  
    return (
      <div className="min-h-screen mt-20">
        <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
          {/* <!-- Left side*/}
          <div className="flex-1">
            <Link to="/" className="font-bold dark:text-white text-4xl">
              <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white ">
                Khubaib's
              </span>
              Blog
            </Link>
  
            <p className="text-sm mt-5 ">
              This is demo blog website and you can sign in with your email and
              password or you can sign in with google account to read the blog
            </p>
          </div>
  
          {/* <!-- right side*/}
  
          <div className="flex-1">
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              
              <div>
                <Label value="Your Email" />
                <TextInput type="email" placeholder="name@company.com" id="email"  onChange={handleChange}/>
              </div>
              <div>
                <Label value="Your Password" />
                <TextInput type="password" placeholder="*********" id="password" onChange={handleChange} />
              </div>
              <Button  gradientDuoTone='purpleToPink' type="submit" disabled={loding} >{
                  loding ? (
                    <>
                    <Spinner size='sm' />
                    <span className="pl-3">loding.....</span>
                    </>
                  ):'Sign In'
  
                }</Button>
                <OAuth />
            </form>
            <div className="flex gap-2 text-sm mt-5">
              <span>
               Don't Have an account?
              </span>
              <Link to='/sign-up' className="text-blue-500">Sign Up</Link>
            </div>
            {
              errorMessage && (
                <Alert className="mt-5 " color='failure'>{errorMessage}</Alert>
              )
            }
          </div>
        </div>
      </div>  
    )
}
