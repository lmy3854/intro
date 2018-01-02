var lang = urlParam("lang");
var env = urlParam("env");

var lang_data = lang_j;
var notice_json = notice_json_j;
var agreement_txt = agreement_txt_j;
if(lang == "ko-KR"){
	lang_data = lang_k;
	notice_json = notice_json_k;
	agreement_txt = agreement_txt_k;
}
var api_url = env_dev;
if (env == "prd"){
	api_url = env_prd;
}
