var DWObject;

window.onload = function () {
	Dynamsoft.WebTwainEnv.AutoLoad = false;
	Dynamsoft.WebTwainEnv.Containers = [{ ContainerId: 'dwtcontrolContainer', Width: '100%', Height: '500px' }];
	Dynamsoft.WebTwainEnv.RegisterEvent('OnWebTwainReady', Dynamsoft_OnReady);
    /**
     * In order to use the full version, do the following
     * 1. Change Dynamsoft.WebTwainEnv.Trial to false
     * 2. Replace A-Valid-Product-Key with a full version key
     * 3. Change Dynamsoft.WebTwainEnv.ResourcesPath to point to the full version 
     *    resource files that you obtain after purchasing a key
     */
	Dynamsoft.WebTwainEnv.Trial = true;
	//Dynamsoft.WebTwainEnv.ProductKey = "A-Valid-Product-Key";
	//Dynamsoft.WebTwainEnv.ResourcesPath = "https://tst.dynamsoft.com/libs/dwt/15.0";

	Dynamsoft.WebTwainEnv.Load();
};

function Dynamsoft_OnReady() {
	DWObject = Dynamsoft.WebTwainEnv.GetWebTwain('dwtcontrolContainer');
}

function AcquireImage() {
	if (DWObject) {
		DWObject.SelectSource(function () {
			var OnAcquireImageSuccess, OnAcquireImageFailure;
			OnAcquireImageSuccess = OnAcquireImageFailure = function () {
				DWObject.CloseSource();
			};
			DWObject.OpenSource();
			DWObject.IfDisableSourceAfterAcquire = true;
			DWObject.AcquireImage(OnAcquireImageSuccess, OnAcquireImageFailure);
		}, function () {
			console.log('SelectSource failed!');
		});
	}
}

function LoadImages() {
	if (DWObject) {
		DWObject.LoadImageEx('', 5,
			function () {
			},
			function (errorCode, errorString) {
				alert('Load Image:' + errorString);
			}
		);
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
	var sFun = function () {
		console.log('Upload an image successfully!');
	}, fFun = function (errorCode, errorString, sHttpResponse) {
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