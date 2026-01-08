// import { useEffect } from "react";
// import { loadGoogleScript } from "../../utils/loadGoogleScript";

// const GoogleLoginButton = ({ onSuccess }) => {
//   useEffect(() => {
//     const init = async () => {
//       await loadGoogleScript();

//       if (!window.google) return;

//       google.accounts.id.initialize({
//         client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
//         callback: onSuccess,
//       });

//       google.accounts.id.renderButton(
//         document.getElementById("google-btn"),
//         { theme: "outline", size: "large", width: 200 }
//       );
//     };

//     init();
//   }, [onSuccess]);

//   return <div id="google-btn"></div>;
// };

// export default GoogleLoginButton;



import { useEffect, useRef } from "react";
import { loadGoogleScript } from "../../utils/loadGoogleScript";

const GoogleLoginButton = ({ onSuccess, buttonId = "google-btn" }) => {
  const buttonRef = useRef(null);

  useEffect(() => {
    const init = async () => {
      try {
        await loadGoogleScript();

        if (!window.google) {
           return;
        }

        // Clear any existing content
        if (buttonRef.current) {
          buttonRef.current.innerHTML = "";
        }

        window.google.accounts.id.initialize({
          client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
          callback: onSuccess,
        });

        window.google.accounts.id.renderButton(
          buttonRef.current,
          {
            theme: "outline",
            size: "large",
            width: 280,
            text: "continue_with",
            shape: "rectangular",
          }
        );
      } catch (error) {
        console.error("Error initializing Google Login:", error);
      }
    };

    init();
  }, [onSuccess]);

  return (
    <div 
      ref={buttonRef} 
      className="w-full flex justify-center items-center min-h-[44px]"
    />
  );
};

export default GoogleLoginButton;