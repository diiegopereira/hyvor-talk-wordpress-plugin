/*
	The Javascript handler for 
*/

var hyvorTalk = (function() {

	// helper
	var $ = hy.$;

	/*
		These variables are set at HyvorTalk\Admin -> addScripts()
	*/
	var options = talkAdminOptions,
		ajaxURL = options.ajaxURL,
		nonce = options.nonce; // for security checking

	function saveSettings() {

		var data = {};

		var websiteID = hy(":talk-website-id-input").value();
		if (websiteID) 
			data.websiteId = websiteID;

		var loadingModeSelect = document.getElementById("ht-loading-mode-select"),
			loadingMode = loadingModeSelect ?  loadingModeSelect.options[ loadingModeSelect.selectedIndex ].value : null;

		if (loadingMode)
			data.loadingMode = loadingMode;

		// nothing to update
		if (data === {})
			return;

		data.time = new Date().getTime();

		data.action = 'save_settings';
		data.security = nonce;

		$.ajax({
			file: ajaxURL,
			method: "POST",
			data: data,
			success: function() {
				
				var json = $.jsonDecode(this.responseText);
				if (json && json.status === true)
					location.reload();

			}
		})

	}

	return {
		saveSettings: saveSettings
	}

})();