import axios from "axios"
import {create} from "zustand"
import {toast} from "react-hot-toast"


export const userstore=create((set,get)=>({
    user:null,
    loading:false,
    checkingAuth:true,
    posts:[],
    specificomment:null,
    specificpost:null,

signup:async({name,email,password})=>{
     set({loading:true})
    //console.log(name,email,password,confirmpassword);
    try {
        const res=await axios.post('https://posthub-knik.onrender.com/api/auth/signup',{name,email,password},{withCredentials:true});
       // console.log(res.data)
        //console.log(res.data.user)
        set({user:res.data,loading:false});
    } catch (error) {
        set({loading:false})
        return toast.error(error?.response?.data?.message || "Server error")
    }
 },
 login: async ({email, password}) => {
  set({ loading: true });
  console.log(email, password);
  try {
    const res = await axios.post(
      "https://posthub-knik.onrender.com/api/auth/login",
      { email, password },
      { withCredentials: true }
    );

    set({ user: res.data, loading: false });

  } catch (error) {
    set({ loading: false });

    console.log(error); 

    return toast.error(
      error?.response?.data?.message || "Server error"
    );
  }
},
 checkAuth:async()=>{
    set({checkingAuth:true})
     try {
        const res=await axios.get("https://posthub-knik.onrender.com/api/auth/refresh-token",{withCredentials:true});
        //console.log(res)
        const profile=await axios.get("https://posthub-knik.onrender.com/api/auth/profile",{withCredentials:true});
        // console.log(profile)
        set({user:profile.data,checkingAuth:false});
     } catch (error) {
        set({user:null,checkingAuth:false});
     }
 },
 logout:async()=>{
     try{
        await axios.post("https://posthub-knik.onrender.com/api/auth/logout",{},{withCredentials:true});
        set({user:null})
     }
     catch(error){
       toast.error(error?.response?.data?.message||"error in logout")
     
     }
 },
 createpost: async ({text,image}) => {
  set({ loading: true });

  try {
    const formData = new FormData();
    formData.append("text", text);

    if (image) {
      formData.append("image", image);
    }

    const res = await axios.post(
      "https://posthub-knik.onrender.com/api/post/posts",formData,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    );
    
    set((state) => ({
      posts: [res.data.post, ...state.posts],
      loading: false
    }));

    toast.success("Post created");

  } catch (error) {
    set({ loading: false });
    toast.error(error?.response?.data?.message);
  }
},
allpost:async()=>{
    try {
        const res=await axios.get("https://posthub-knik.onrender.com/api/post/allposts",{withCredentials:true});
         console.log(res.data)
        set({posts:res.data})
        //console.log(event[0])
    } catch (error) {
        console.log("error in getall")
    }
},
like:async(postid)=>{
    // console.log(eventid)
    try {
        const res=await axios.put(`https://posthub-knik.onrender.com/api/post/${postid}/like`,{},{withCredentials:true})
     
    set((state) => ({
      posts: state.posts.map((post) => {
        if (post._id !== postid) return post;

        const alreadyLiked = post.likes.includes(state.user._id);

        return {
          ...post,
          likes: alreadyLiked
            ? post.likes.filter((id) => id !== state.user._id) // unlike
            : [...post.likes, state.user._id] // like
        };
      })
    }));
       // console.log(res)
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
},
comment: async (postid, text) => {
  try {

    const res = await axios.post(
      `https://posthub-knik.onrender.com/api/post/${postid}/comment`,
      { text },
      { withCredentials: true }
    );
    set((state) => ({
      specificpost: {
        ...state.specificpost,
        comments: [
          ...state.specificpost.comments,
          {
            _id: Date.now(), // temp id
            user: state.user.name || "You",
            text,
          }
        ]
      }
    }));
    toast.success(res.data.message);

  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
},
commentbyid:async(postid)=>{
     try {
        const res=await axios.get(`https://posthub-knik.onrender.com/api/post/${postid}/commentbyid`,{withCredentials:true});
        console.log(res.data)
        set({specificpost:res.data})
     } catch (error) {
         toast.error(error.response.data.message)
     }
},


}))

//refresh token -so that whenever access token expire
// then refresh token itself from frontend loged in user and give new refresh token