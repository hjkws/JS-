window.EventUtil = {
    addHandler :function(element,type,handler){
        if(element.addEventListener) {
            element.addEventListener(type,handler,false);
        }else if(elemnet.attachEvent) {
            element.attachEvent("on"+type,handler)
        }else{
            element["on"+type] = handler;
        }
    },
    getEvent : function(event) {
        return event ||window.event;
    },
    getTarget : function(event) {
        return event.target || event.srcElement;
    },
    preventDefault : function (event) {
        if(event.preventDefault){
            event.preventDefault();
        }else {
            event.returnValue = false;
        }
    },
    stopPropagation : function(event){
        if(event.stopPropagation) {
            event.stopPropagation();
        }else {
            event.cancelBubble = true;
        }
    },

    removeHandler : function(element,type,handler){
        if(element.removeEventListener){
            removeEventListener("type",handler)
        }else if(element.detachEvent) {
            detachEvent("on"+type,handler)
        }else {
            element["on" + type] = null;
        }
    }
};