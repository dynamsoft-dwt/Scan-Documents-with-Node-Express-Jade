Dynamsoft.WebTwainEnv.RegisterEvent('OnWebTwainReady', Dynamsoft_OnReady);
var DWObject;
function Dynamsoft_OnReady() {
	DWObject = Dynamsoft.WebTwainEnv.GetWebTwain('dwtcontrolContainer');
}

function btnLoad_onclick() {
	var OnSuccess = function() {};
	var OnFailure = function(errorCode, errorString) {};
	DWObject.IfShowFileDialog = true;
	DWObject.LoadImageEx("", EnumDWT_ImageType.IT_ALL, OnSuccess, OnFailure);
}

function AcquireImage() {
	if (DWObject) {
		var bSelected = DWObject.SelectSource();
		if (bSelected) {
			var OnAcquireImageSuccess, OnAcquireImageFailure;
			OnAcquireImageSuccess = OnAcquireImageFailure = function () {
				DWObject.CloseSource();
			};

			DWObject.OpenSource();
			DWObject.IfDisableSourceAfterAcquire = true;  //Scanner source will be disabled/closed automatically after the scan.
			DWObject.AcquireImage(OnAcquireImageSuccess, OnAcquireImageFailure);
		}
	}
}

function btnUpload_onclick() {
	var strHTTPServer = location.hostname;
	DWObject.IfSSL = Dynamsoft.Lib.detect.ssl;
	var _strPort = location.port == "" ? 80 : location.port;
	if (Dynamsoft.Lib.detect.ssl == true)
		_strPort = location.port == "" ? 443 : location.port;
	DWObject.HTTPPort = _strPort;
	var CurrentPathName = unescape(location.pathname); // get current PathName in plain ASCII
	var CurrentPath = CurrentPathName.substring(0, CurrentPathName.lastIndexOf("/") + 1);
	var strActionPage = CurrentPath + "upload";
	var sFun = function(){
		console.log('success');
	}, fFun = function(errorCode, errorString, sHttpResponse){
		console.log(errorCode);
	};
	var Digital = new Date();
	var uploadfilename = Digital.getMilliseconds();
	DWObject.HTTPUploadThroughPost(
		strHTTPServer,
		DWObject.CurrentImageIndexInBuffer,
		strActionPage,
		uploadfilename + ".jpg",
		sFun, fFun
	);
}