var lang = urlParam("lang");
var env = urlParam("env");

var lang_data = lang_j;
var notice_json = notice_json_j;
var agreement_txt = agreement_txt_j;
var accept_lang = "ja-JP";
if(lang == "ko"){
	lang_data = lang_k;
	notice_json = notice_json_k;
	agreement_txt = agreement_txt_k;
    accept_lang = "ko-KR";
}
var api_url = env_prd;
if (env == "dev"){
	api_url = env_dev;
}
