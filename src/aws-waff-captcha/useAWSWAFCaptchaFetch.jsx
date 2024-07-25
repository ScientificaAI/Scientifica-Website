import { getWAFEnv } from "./util";

export function useAWSWAFCaptchaFetch() {
  function captchaFetch(input, init) {
    document.body.style.cursor = "wait";
    document.getElementById("modalOverlay").style.display = "block";
    document.getElementById("modal").style.display = "block";

    return new Promise((resolve) => {
      const wafEnv = getWAFEnv();
      if (!wafEnv || !wafEnv.CAPTCHA_API_KEY) {
        console.error("WAF environment is not loaded properly");
        document.getElementById("modalOverlay").style.display = "none";
        document.getElementById("modal").style.display = "none";
        return resolve();
      }

      window.AwsWafCaptcha.renderCaptcha(
        document.getElementById("captchaForm"),
        {
          onSuccess: () => {
            document.getElementById("modalOverlay").style.display = "none";
            document.getElementById("modal").style.display = "none";
            resolve(window.AwsWafIntegration.fetch(input, init));
          },
          onLoad: () => {
            document.body.style.cursor = "default";
          },
          apiKey: wafEnv.CAPTCHA_API_KEY,
        }
      );
    });
  }

  return captchaFetch;
}
