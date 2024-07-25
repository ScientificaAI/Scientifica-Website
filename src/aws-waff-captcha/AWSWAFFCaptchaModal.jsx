import { createPortal } from "react-dom";
import { useEffect } from "react";

export const WAF_CONFIG = {
  JSAPI_URL:
    "https://10e19ff1aadb.us-east-1.captcha-sdk.awswaf.com/10e19ff1aadb/jsapi.js",
  CAPTCHA_API_KEY:
    "aUEEDYsPNj9CIYXxuV5jojr5qLKfLiH0ruC54uM69u408jzILg8fgFeS1lZ70hew0e3Q6kX3eLMrqPxVN9edGEG90Nixikjq3Ev/MoP0ivi9csTJwjkr/XM1UwEZkO12ORVXnGrsEeT7w3iRrfF65xf71qA4unbxVZ5vAZ3PmGlt24RvIGMuwp5OaJnWpjYuqnWzcyYxSeVy0Xwwg1Bh97jlb/m0KDeKVf6PrNZDqN+crRDvVNFpQOFRprMV1xxYW20nmV2vE6mIzoQ/7J2FvICE52i0BkaBy+Scvkm+vZeeQx9X6uwcdM2FG28v811tYfa8Rhb0d6GGCJ5t6otayxLfvruTK4a+n+l1fOikrpuV0n0JbN0nO8tODV9/JfFz5+0LRcO66jOmL5Dv8F/l+p0+DvMPUA0KDOI3PKZaW/2qUf8dnVNx2TBcN0sPnJE32lL+8R6WlCXCVmecAN2SsGNkBIVHHNF4pG5znWQ49TAtD7zDaJIrOJtNzSVuhQwFG4+++lABNWcAUir97xw8Xlc12oQOgn0mzLG3/G73MQRJNisf6R+Jqncer1mehvWR7Tv2UT+kT05CdQNMhC2m2QnUCQvciOn/fr64hOby0wuH3Eu5SsHoDmDV2QwrbeGbtmsBKfDzZ83bBIhq/0RMdaHIKXQS8ymCjSMt0qayQmM=_0_1",
};
/* 
export function loadScript() {
  if (document.getElementById("AwsWAFScript")) return;

  const AwsWafScript = document.createElement("script");
  AwsWafScript.id = "AwsWAFScript";
  AwsWafScript.async = false;
  AwsWafScript.src = WAF_CONFIG.JSAPI_URL;
  AwsWafScript.onload = () => console.log("AWS WAF Script loaded successfully");
  AwsWafScript.onerror = () => console.error("Error loading AWS WAF Script");
  document.head.appendChild(AwsWafScript);
} */

export function AWSWAFCaptchaModal() {
  /* useEffect(() => {
    loadScript();
  }, []); */

  return createPortal(
    <div className="overlay" id="modalOverlay">
      <div className="modal" id="modal">
        <div id="captchaForm" />
      </div>
    </div>,
    document.body
  );
}
