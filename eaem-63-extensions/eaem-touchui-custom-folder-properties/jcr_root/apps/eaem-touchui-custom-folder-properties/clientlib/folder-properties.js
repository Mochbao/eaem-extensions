(function($, $document) {
    var FOLDER_SHARE_WIZARD = "/mnt/overlay/dam/gui/content/assets/foldersharewizard.html",
        CUSTOM_DIALOG = "/apps/eaem-touchui-custom-folder-properties/dialog.html",
        url = document.location.pathname;

    if( url.indexOf(FOLDER_SHARE_WIZARD) == 0 ){
        handleAssetsConsole();
    }else if(url.indexOf(CUSTOM_DIALOG) == 0){
        handlePropertiesDialog();
    }

    function handleAssetsConsole(){
        $document.on("foundation-contentloaded", addProperties);
    }

    function addProperties(){
        var cuiTabView = $("coral-tabview");

        if(_.isEmpty(cuiTabView)){
            return;
        }

        cuiTabView = cuiTabView[0];

        var customTab = $(getCustomTab()).appendTo(cuiTabView.$.children("coral-tablist").append());

        cuiTabView.$.children("coral-panelstack").append(getCustomPanel());

        customTab.on("click",function(){
            var panel = $("#" + $(this).attr("aria-controls")),
                $iframe = panel.find("iframe");

            if(!_.isEmpty($iframe.attr("src"))){
                return;
            }

            $iframe.attr("src", CUSTOM_DIALOG);
        })
    }

    function handlePropertiesDialog(){
        $(function(){
            _.defer(styleCustomDialogIFrame);
        });
    }

    function getCustomTab(){
        return  '<coral-tab>' +
                    '<coral-tab-label>Custom</coral-tab-label>' +
                '</coral-tab>';
    }

    function getCustomPanel(){
        var iFrame = '<iframe width="750px" height="750px" frameborder="0" />';

        return  '<coral-panel>' +
                    '<div style="margin-top: 5px">' +  iFrame + '</div>' +
                '</coral-panel>';
    }

    function registerReceiveDataListener(handler) {
        if (window.addEventListener) {
            window.addEventListener("message", handler, false);
        } else if (window.attachEvent) {
            window.attachEvent("onmessage", handler);
        }
    }

    function styleCustomDialogIFrame(){
        var $dialog = $("coral-dialog");

        if(_.isEmpty($dialog)){
            return;
        }

        $dialog.css("overflow", "hidden");

        $dialog[0].open = true;

        $dialog.find(".coral-Dialog-header").remove();

        Coral.commons.ready(function() {
            var top = ($(window).width() - 1140) + "px",
                left = ($(window).height() - 1155) + "px";

            $dialog.find(".coral-Dialog-wrapper").css("margin", top + " 0 0 " + left)
                    .css("background-color", "#f5f5f5");
        });
    }
})(jQuery, jQuery(document));