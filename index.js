import{
   auth,
createUserWithEmailAndPassword,
signInWithEmailAndPassword,
GoogleAuthProvider,
signInWithPopup,
signOut,
sendEmailVerification,
sendPasswordResetEmail,
 getFirestore,
 setDoc,
 doc,
 db,
 serverTimestamp,
 onAuthStateChanged,
   getDoc,
onSnapshot

} from "./firebase.confiq.js"

/////////////////////// sign up /////////////////////

let email = document.getElementById('email');
let password = document.getElementById('password');
  let name = document.getElementById('name');


const signup = async (e) => {
  e.preventDefault();


  if (!email.value || !password.value) {
    alert('All fields are required!');
    return; 
  }

  try {
    let userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);
    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {
       name: name?.value,
      email: email?.value,
      name: name.value,
      role: 'user',
      isActive: true,
      timestamp: serverTimestamp()
    });

    if (!user.emailVerified) {
      await sendEmailVerification(user);
      alert('Please check your inbox to verify your Email!');
    }

    window.location.replace('./login.html');



  } catch (error) {
    console.error("Signup Error:", error.message);
    alert(error.message);
  }
};


document.getElementById('signup')?.addEventListener('submit', signup);



// /////////////////////// forgot password /////////////////////


const handleforgetpass = async (e) =>{
  e.preventDefault();

  if(!email.value){
    alert('please enter this email!')
  }

  try{
  await  sendPasswordResetEmail(auth, email.value)
alert('Password reset link sent to your Gmail inbox/spam folder!');
  }catch(error){
  const errorCode = error.code;
    const errorMessage = error.message;
       console.log(errorMessage);
      console.log(error);
  }
}


document.getElementById('forgotBtn')?.addEventListener('click' , handleforgetpass)



// /////////////////////// sign in  /////////////////////


const signin = async (e) => {
  e.preventDefault();

  if (!email.value || !password.value) return alert('All fields are required');

  try {  
    let data = await signInWithEmailAndPassword(auth, email.value, password.value);
    console.log(data.user);

    if (!data.user.emailVerified) {
      await sendEmailVerification(auth.currentUser);
      alert('Please verify this email');
      await signOut(auth);
      return;
    }




 const userRef = doc(db, "users", data.user.uid);
    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {

const get = docSnap.data().isActive;

if(get === false || get === 'false'){
  alert('sorry do not access admin is blocked you ')
await signOut(auth);
window.location.replace('./index.html')
return;

}



      const userrole = docSnap.data().role;

      if (userrole === 'admin') {
        window.location.replace('./admin.html');
      } else {
        window.location.replace('./profile.html');
        
      }
    } else {
      console.log("User record not found in Firestore!");
    }

  } catch (error) {
    console.log("Error Code:", error.code);
    console.log("Error Message:", error.message);
  }
};


  document.getElementById('signin-form')?.addEventListener('submit' , signin);



// /////////////////////// continue with google  /////////////////////



const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: 'select_account'
});

const google = async (e) => {
  try {
    let login = await signInWithPopup(auth, provider); 
    const user = login.user;
    console.log(user);


const userRef = doc(db, "users", data.user.uid);
    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {
      const userrole = docSnap.data().role;

      if (userrole === 'admin') {
        window.location.replace('./admin.html');
      } else {
        window.location.replace('./profile.html');
      }
    } else {
      console.log("User record not found in Firestore!");
    }


  } catch (error) {
    console.log(error);
  }
};

document.getElementById('google')?.addEventListener('click', google);



// /////////////////////// sign out /////////////////////



const _signout = async () => {
  try {
    await signOut(auth);
    localStorage.removeItem('user');
    window.location.replace('./login.html');
  } catch (error) {
    console.error("Signout Error:", error.message);
  }
};

document.getElementById('logout')?.addEventListener('click', _signout);



// // ////////////////// update profile ////////////////////////


// let uploadimg = async (file)=> {

// let cloudname = 'bqdze181';
// let uploadpreset =   'abcd1234';


// let formdata = new FormData();
// formdata.append('file' , file);
// formdata.append('upload_preset' , uploadpreset);


// let res = await fetch(`https://api.cloudinary.com/v1_1/${cloudname}/image/upload`  , {
// method: 'POST',
// body: formdata
// })

// const data =  await res.json();
// console.log(data.secure_url);

// return data.secure_url;

// }




const updateProf = async () => {
  let name = document.getElementById('name');
  let image = document.getElementById('img');


  try {


const currentUser = JSON.parse(localStorage.getItem('user')) || {};

let url = currentUser.profileImg || '';

if (image && image.files && image.files.length > 0) {
  url = await uploadimg(image.files[0]);
}


  

 const data = {
    name: name?.value,
    profileImg: url

  }


  const uid = JSON.parse(localStorage.getItem('user')).uid;


    const userRef = doc(db, "users", uid);
    await updateDoc(userRef, data);

    location.reload();

  } catch (error) {
    console.log(error.message);
  }

}


// function toggleEdit() {
//   const inputs = document.querySelectorAll('.info-input');
//   const btn = document.getElementById('toggleBtn');
//   const isDisabled = inputs[0].disabled;
//   console.log(isDisabled);

//   inputs.forEach(input => {
//     input.disabled = !isDisabled;
//   });

//   if (isDisabled) {
//     btn.textContent = 'Save Profile';
//     btn.style.backgroundColor = '#10b981'; // Green color for Save
//     inputs[0].focus();
//   } else {
//     updateProf();
//     btn.textContent = 'Edit Profile';
//     btn.style.backgroundColor = '#4f46e5'; // Blue color for Edit
//   }
// }

// document.getElementById('toggleBtn')?.addEventListener('click', toggleEdit)



// // /////////// update-email ////////////////////


// // const update_email = async () => {
// //   let newEmail = document.getElementById('email').value.trim();
// //   let user = auth.currentUser;

// //   if (!user) {
// //     alert("User logged in nahi hai! Pehle Login karein.");
// //     return;
// //   }

// //   if (!newEmail || newEmail === user.email) {
// //     alert("Meharbani karke ek nayi valid email likhein!");
// //     return;
// //   }

// //   try {
// //     await verifyBeforeUpdateEmail(user, newEmail);
// //     alert("Verification link aap ki nayi email par bhej diya gaya hai! Gmail khol kar link verify karein, uske baad hi email badle gi.");

// //   } catch (error) {
// //     console.log("Error Code:", error.code);

// //     if (error.code === 'auth/requires-recent-login') {
// //       alert("Security Error: Aap kafi der se logged in hain. Logout karke dobara Login karein aur phir request bhejein.");
// //     } else {
// //       alert("Error: " + error.message);
// //     }
// //   }
// // };

// // document.getElementById('updateEmailBtn')?.addEventListener('click', update_email);


// // /////////////////    get user //////////////


onAuthStateChanged(auth, async (_user) => {
  let currentPath = window.location.pathname;

  if (_user) {
    const userRef = doc(db, "users", _user.uid);
    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {
      let user = docSnap.data();


const guard = onSnapshot(doc(db, "users", _user.uid), (doc) => {
  const get = doc.data().isActive;

 if(get === false || get === 'false'){
 signOut(auth);
window.location.replace('./index.html')
return;
 }
});



      const userRole = user.role;

      if (userRole === "admin" && currentPath.includes("profile.html")) {
        window.location.replace("/404.html");
        return; 
      }

      if (userRole === "user" && currentPath.includes("admin.html")) {
        window.location.replace("/404.html");
        return; 
      }

      if (_user.email !== user.email) {
        console.log("Nayi email mili hai! Firestore mein update kar rahe hain...");
        await updateDoc(userRef, { email: _user.email });
        user.email = _user.email; 
      }

      let image = document.getElementById('dp');
      let name = document.getElementById('name');
      let email = document.getElementById('email');

      if (image) image.src = user.profileImg || '';
      if (name) name.value = user.name || '';
      if (email) email.value = _user.email;

      localStorage.setItem('user', JSON.stringify({ ...user, email: _user.email, uid: _user.uid }));

      document.body.classList.remove('loading-body');
      document.body.classList.add('loaded-body');

    } else {
      console.log("User document nahi mila!");
    }
  } else {
    if (currentPath.includes("profile.html") || currentPath.includes("admin.html")) {
      window.location.replace("/login.html");
    }
    console.log("No user is signed in.");
  }
});


