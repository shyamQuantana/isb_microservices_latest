
function shareBadgeLinkedin(id){
    let shareurl=location.origin+'/backend/credentials/'+id
  window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${shareurl}`)
}

function experienceFreeLesson()
{
  let nav_storefront_url='';
  if(window.location.hostname === "hippolearn.isb.edu"){
      nav_storefront_url = 'https://watsonlock.isb.edu/';
  }else if(window.location.hostname === "learn.isb.edu"){
      nav_storefront_url = 'https://online.isb.edu/';
  }else{
      nav_storefront_url = 'https://isbstorefront.quantana.top/';
  }
  window.open(nav_storefront_url, '_self')  
}
function copyLink(url)
{
    navigator.clipboard
    .writeText(url) // Use the id directly as the URL to be copied
    .then(() => {
      alert("Link copied!");
      // Alert the user that the link has been copied
    //   toast.success("Link copied!",{toastId:random_number});
    })
    .catch((error) => {
      // Handle the error
      console.error('Failed to copy link:', error);
    });
}
function navtoDashboard()
{
    
    window.location.href=location.origin+'/dashboard'
}
function navtoLearingTrack()
{
    let nav_storefront_url='';
    if(location.origin === "hippolearn.isb.edu"){
        nav_storefront_url = 'https://watsonlock.isb.edu/';
    }else if(location.origin=== "learn.isb.edu"){
        nav_storefront_url = 'https://online.isb.edu/';
    }else{
        nav_storefront_url = 'https://isbstorefront.quantana.top/';
    }
}

function logoClick() {
    let online_url = "";
    if (location.origin === "hippolearn.isb.edu") {
      if (
        window.location.pathname.includes("/freeLessonpage") ||
        window.location.pathname === "/onlineapplication" ||
        window.location.pathname === "/applicationrecvd" ||
        window.location.pathname === "/freelessonlogin"
      ) {
        online_url = "https://watsonlock.isb.edu/";
      } else {
        online_url = "https://hippolearn.isb.edu/";
      }
    } else if (location.origin === "learn.isb.edu") {
      if (
        window.location.pathname.includes("/freeLessonpage") ||
        window.location.pathname === "/onlineapplication" ||
        window.location.pathname === "/applicationrecvd" ||
        window.location.pathname === "/freelessonlogin"
      ) {
        online_url = "https://online.isb.edu/";
      } else {
        online_url = "https://learn.isb.edu/";
      }
    } else {
      if (
        window.location.pathname.includes("/freeLessonpage") ||
        window.location.pathname === "/onlineapplication" ||
        window.location.pathname === "/applicationrecvd" ||
        window.location.pathname === "/freelessonlogin"
      ) {
        online_url = "https://isbstorefront.quantana.top/";
      } else {
        online_url = "https://isbdev2.quantana.top/";
      }
    }
  
    window.open(online_url, "_self");
  }
  

function navToHome()
{  
    window.location.href='https://online.isb.edu/'
}
