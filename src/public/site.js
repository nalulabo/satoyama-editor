$().ready(function(){
    /** ========================
     * definitions
     */

    /**
     * auto save timer === 5sec
     */
    var saveInterval = 5 * 1000;

    /**
     * chime timer === 10min
     */
    var chimeInterval = 10 * 60 * 1000;


    var readableCount = 600;
    var editorname = 'myeditor';
    var chimeMp3 = 'chime.mp3';
    
    /**
     * initialize text
     */
    var initText = "# はじめましょう、書きまくりましょう。\n\nあなたの本能の赴くままに、書きなぐってください。";

    /**
     * for chime audio
     */
    window.AudioContext = window.AudioContext || window.webkitAudioContext;

    /** ========================
     * initialization
     */
    var context = new AudioContext();
    var buffer;
    loadChime();
    var editor = document.getElementById(editorname);
    var backup = localStorage.getItem(editorname);
    if(backup){
        // editor.value = backup;
        $('#' + editorname).val(backup).trigger('autoresize');
    } else {
        // editor.value = initText;
        $('#' + editorname).val(initText).trigger('autoresize');
    }
    
    setInfomation(editor);

    /**
     * add events
     */
    document.getElementById('clear-button').addEventListener("click", clearEditor);
    editor.addEventListener("keyup", counter);
    setInterval(autoSave, saveInterval);
    setInterval(playChime, chimeInterval);

    /** ========================
     * functions
     */
    function counter(ev) {
        setInfomation(this);
    }

    function charcount(str) {
        var val = removeMark(str);
        return val.length === 0 ? 0: val.length;
    }

    function wordcount(str) {
        var val = removeMarkForWords(str);
        var words = val.split(/[\s\n]/);
        return val.length === 0 ? 0: words.length;
    }

    function autoSave() {
        var val = document.getElementById(editorname).value;
        localStorage.setItem(editorname, val);
    }

    function loadChime(){
        var req = new XMLHttpRequest();
        req.open('GET', chimeMp3, true);
        req.responseType = 'arraybuffer';
        req.onload = function() {
            context.decodeAudioData(req.response, function(buf){
                buffer = buf;
            }, function(e){ console.log(e); });
        }
        req.send();
    }

    function playChime() {
        var source = context.createBufferSource();
        source.buffer = buffer;
        source.connect(context.destination);
        source.start(0);
        console.log("chime.");
        alert('10min.');
    }

    /**
     * readable charctors per min === 600
     */
    function getTimeReqired(str){
        var val = removeMark(str);
        if(val.length === 0){ return "0 sec"; }
        var h = parseInt(val.length / (60 * 600));
        var m = parseInt(val.length / 600);
        var s = parseInt((val.length % 600) / 10);
        var result = h + "h" + m + "m" + s + "s";
        return result;
    }

    function clearEditor(ev) {
        $('#' + editorname).val("").trigger('autoresize');
        setInfomation(editor);
        editor.focus();
    }

    function setInfomation(ed) {
        document.getElementById('timerequired').innerText = getTimeReqired(ed.value);
        document.getElementById('wordcount').innerText = wordcount(ed.value);
        document.getElementById('charcount').innerText = charcount(ed.value);
    }

    function removeMark(str) {
        return str.trim().replace(/([\t\s\n\#\-\*\.\|\:]|<[^<>]*>)/g, "");
    }

    function removeMarkForWords(str) {
        return str.trim().replace(/([\t\#\-\*\.\|\:]|\n+|<[^<>]*>)/g, "");
    }
});