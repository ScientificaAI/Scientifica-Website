import { WAF_CONFIG } from "./AWSWAFFCaptchaModal";

export function loadWAFEnv() {
  window.AWS_WAF_ENV = WAF_CONFIG;
}

export function getWAFEnv() {
  return window.AWS_WAF_ENV;
}

export function loadScript() {
  if (document.getElementById("AwsWAFScript")) return;

  const wafEnv = getWAFEnv();
  if (!wafEnv || !wafEnv.JSAPI_URL) {
    console.error("WAF environment is not loaded properly");
    return;
  }

  const AwsWafScript = document.createElement("script");
  AwsWafScript.id = "AwsWAFScript";
  AwsWafScript.async = false;
  AwsWafScript.src =
    "https://10e19ff1aadb.us-east-1.captcha-sdk.awswaf.com/10e19ff1aadb/jsapi.js";
  AwsWafScript.onload = () => console.log("AWS WAF Script loaded successfully");
  AwsWafScript.onerror = () => console.error("Error loading AWS WAF Script");
  document.head.appendChild(AwsWafScript);
}
