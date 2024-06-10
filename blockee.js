var blockeeEditorUrl = "";
var blockeeEditorFileManagerUrl = false;

var blockeeEditorInstances = [];
var blockeeEditorPlugins = {
    'heading': ['h1', 'h2', 'h3', 'h4', 'h5'],
    'text': ['p', 'list', 'hr', 'blockquote', 'html', 'code', 'pre'],
    'media' : ['img', 'audio', 'embed', 'iframe']
};

var blockeeEditorPluginsLoaded = []

var blockeeEditorMouseX = 0;
var blockeeEditorMouseY = 0;


class blockeeEditor {

    constructor(name, node) {

        this.name = name;
        this.node = node;
        let contents = $.trim($(this.node).html());

        let render = `
<div class="blockee-editor blockee-editor-container-__${this.name}" data-source="${this.name}" spellcheck="false">
    <div class="blockee-editor__toolbar">        
        <button type="button" class="blockee-editor__button-add" onclick="blockeeEditor.actionMenuShow('toolbar')"></button>
        <button type="button" class="blockee-editor__button-fullscreen" onclick="blockeeEditor.actionFullscreen(this)"></button>
    </div>
    <div class="blockee-editor__content"></div>
</div>`;

        $(this.node).after(render);


        // add element
        const canvas = `<div class="blockee-editor-canvas" onclick="blockeeEditor.actionMenuHide()"></div>`;
        $('div.blockee-editor').append(canvas);

        // init menu
        render = `<div class="blockee-editor__menu blockee-editor__menu-plugin">`;
        render += `<input type="search" placeholder="Search...">`;

        Object.keys(blockeeEditorPlugins).forEach(function(group) {

            let groupX = group.charAt(0).toUpperCase() + group.slice(1);
            render += `<div class="blockee-editor__menu-group">${groupX}</div>`;
            render += `<ul>`;

            Object.keys(blockeeEditorPlugins[group]).forEach(function(plugin) {

                let plugin_name = blockeeEditorPlugins[group][plugin];
                let plugin_path = "/plugin/"+group+"/"+plugin_name;

                const signature = 'BlockeePlugin__'+plugin_name;
                let info = eval(signature+".info()");

                render += `<li data-blockee-group="${group}" data-blockee-plugin="${plugin_name}" onclick="BlockeePlugin__${plugin_name}.insert()"><img src="${plugin_path}/icon.svg"> ${info.title}</li>`;

            });

            render += `</ul>`;
        });

        render += `</div>`;

        // init block menu
        render += `
                    <div class="blockee-editor__menu blockee-editor__menu-block">
                        <ul>
                            <li class="blockee-editor__menu-block--li-add" onclick="blockeeEditor.blockAdd()">Add</li>
                            <li class="blockee-editor__menu-block--li-duplicate" onclick="blockeeEditor.blockDuplicate()">Duplicate</li>
                            <li class="divider"></li>
                            <li class="blockee-editor__menu-block--li-configure" onclick="blockeeEditor.blockSettingsOpen()">Configure</li>
                            <li class="divider"></li>
                            <li class="blockee-editor__menu-block--li-up"  onclick="blockeeEditor.blockUp()">Up</li>
                            <li class="blockee-editor__menu-block--li-down"  onclick="blockeeEditor.blockDown()">Down</li>
                            <li class="divider"></li>                            
                            <li class="blockee-editor__menu-block--li-delete" onclick="blockeeEditor.blockDelete()">Delete</li>
                        </ul>
                    </div>`;

        // init window
        render += `<div class="blockee-editor-window-canvas"></div>
        <div class="blockee-editor-window">
            <div class="blockee-editor-window-header">Configuration</div>
            <div class="blockee-editor-window-body">
            </div>
            <div class="blockee-editor-window-footer">
                <input type="button" value="Cancel" onclick="blockeeEditor.blockSettingsClose()">
                <input type="submit" value="Save" onsubmit="return blockeeEditor.blockSettingsValidate()">
            </div>
        </div>`;

        // int toolbar
        render += `    <div class="blockeditor-text-toolbar">
                            <button data-command="bold" type="button"></button>
                            <button data-command="italic" type="button"></button>
                            <button data-command="underline" type="button"></button>
                            <div class="divider"></div>
                            <button data-command="strikeThrough" type="button"></button>
                            <button data-command="hiliteColor" type="button"></button>
                            <div class="divider"></div>
                            <button data-command="indent" type="button"></button>
                            <button data-command="outdent" type="button"></button>
                            <div class="divider"></div>
                            <button data-command="createLink" type="button"></button>
                            <button data-command="unlink" type="button"></button>
                            <div class="divider"></div>
                            <button data-command="removeFormat" type="button"></button>
                        </div>`;

        $('div.blockee-editor').append(render);

        if(contents !== '')
        {
            contents = contents.replaceAll('&lt;', '<');
            contents = contents.replaceAll('&gt;', '>');
            let $html = $('<div></div>').html(contents);

            $html.find('.blockee-editor-block-element').each(function(index, element){

                let block = $(element)[0].outerHTML;
                let block_type = $(element).data('blockee-type');

                if(block_type === undefined)
                {
                    block_type = $(element).prop('tagName').toLowerCase();
                }

                blockeeEditor.blockInsert(block_type, block);
            });
        }
    }

    static loadPlugin(pluginPath) {

        return new Promise((resolve, reject) => {

            const extension = pluginPath.split('.').pop().toLowerCase();

            if (extension === 'css') {
                const link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = pluginPath;
                link.onload = () => {
                    // console.log(`${pluginPath} loaded`);
                    resolve();
                };
                link.onerror = () => {
                    console.error(`Failed to load ${pluginPath}`);
                    reject(new Error(`Failed to load ${pluginPath}`));
                };
                document.head.appendChild(link);
            }
            else
            {
                const script = document.createElement('script');
                script.src = pluginPath;
                script.async = false;
                document.head.appendChild(script);

                script.onload = () => {
                    // console.log(`${pluginPath} loaded`);
                    resolve();
                };
                script.onerror = () => {
                    console.error(`Failed to load ${pluginPath}`);
                    reject(new Error(`Failed to load ${pluginPath}`));
                };
            }

        });
    }

    static init(){

        // init textarea
        $('textarea.blockee-editor').each(function(){
            name = $(this).attr('name');
            blockeeEditorInstances[blockeeEditorInstances.length] = new blockeeEditor(name, $(this));
        });


    }

    static blockAdd(){
        blockeeEditor.actionMenuShow('block');
    }

    static blockDuplicate(){

        let html = $(".blockee-editor-block.active")[0].outerHTML;
        html = html.replace('active', 'pre-active');

        $(".blockee-editor-block.active").after(html);
        blockeeEditor.actionMenuHide();
    }

    static blockDelete(){
        $(".blockee-editor-block.active").remove();
        blockeeEditor.actionMenuHide();
    }

    static blockUp(){

        let $block = $(".blockee-editor-block.active");
        let $prevChild = $block.prev('.blockee-editor-block');

        if($(".blockee-editor-block.active").index() === 0)
        {
            blockeeEditor.actionMenuHide();
            return;
        }

        $block.insertBefore($prevChild);
        blockeeEditor.actionMenuHide();

    }

    static blockDown()
    {
        let $block = $(".blockee-editor-block.active");
        let $nextChild = $block.next('.blockee-editor-block');


        $block.insertAfter($nextChild);
        blockeeEditor.actionMenuHide();

    }

    static update(){

        let v = "";
        $('.blockee-editor-block-element').each(function(){
            v += $(this)[0].outerHTML+"\n";
        });


        $('textarea.blockee-editor').val(v);

    }

    static insertHtmlAtCaret(html)
    {
        let selection = window.getSelection();
        if (!selection.rangeCount) return false;
        let range = selection.getRangeAt(0);
        range.deleteContents();

        let div = document.createElement('div');
        div.innerHTML = html;
        let frag = document.createDocumentFragment(), node, last_node;
        while ((node = div.firstChild)) {
            last_node = frag.appendChild(node);
        }
        range.insertNode(frag);

        if (last_node) {
            range = range.cloneRange();
            range.setStartAfter(last_node);
            range.collapse(true);
            selection.removeAllRanges();
            selection.addRange(range);
        }

        blockeeEditor.update();
    }


    static blockInsert(type, contents, settings_open=false)
    {
        let contents2 = `<div class="blockee-editor-block" data-type="${type}">
                                        <div class="blockee-editor-block__option" onclick="blockeeEditor.actionBlockMenuShow(this)"></div>
                                        <div class="blockee-editor-block__contents">${contents}</div>
                                 </div>`;

        if(!$('.blockee-editor-block.active').length)
        {
            $('.blockee-editor__content').append(contents2);

            if($('.blockee-editor__content .blockee-editor-block:last [contenteditable]').length)
            {
                $('.blockee-editor__content .blockee-editor-block:last [contenteditable]:eq(0)').focus().select();
            }

            if(settings_open)
            {
                $('.blockee-editor-block').removeClass('active');


                setTimeout(function(){

                    $('.blockee-editor-block:last').addClass('active');
                    $('.blockee-editor__menu-block').data('blockee-type', type);
                    blockeeEditor.blockSettingsOpen();

                } , 500);

            }

        }
        else
        {
            contents2 = contents2.replace("class='blockee-editor-block'", "class='blockee-editor-block pre-active'");
            $('.blockee-editor-block.active').after(contents2).removeClass('active');
            blockeeEditor.actionMenuHide();

            $('.blockee-editor__content .blockee-editor-block.pre-active').removeClass('pre-active').addClass('active');

            if($('.blockee-editor__content .blockee-editor-block.active [contenteditable]').length)
                $('.blockee-editor__content .blockee-editor-block.active [contenteditable]:eq(0)').focus().select();

        }

        blockeeEditor.update();



    }

    static actionFullscreen(node)
    {
        if(!document.fullscreenElement)
        {
            $(node).parents('.blockee-editor')[0].requestFullscreen();
            $('body').addClass('fullscreen');
        }
        else
        {
            document.exitFullscreen();
            $('body').removeClass('fullscreen');
        }
    }

    static actionMenuShow(source="")
    {
        let pos;
        let top = '50%';
        let left = '50%';

        if(source.toLowerCase() === "toolbar")
        {
            pos = $('.blockee-editor__button-add').offset();
            top = pos.top + 180;
            left = pos.left - 100;
        }

        if(source.toLowerCase() === "block")
        {
            pos = $('.blockee-editor__menu-block').offset();
            top = pos.top + 150;
            left = pos.left + 120;

            $('.blockee-editor__menu-block').hide();
        }

        $('.blockee-editor__menu-plugin').css({top: top, left:left}).show();
        $('.blockee-editor-canvas').show();

        $('.blockee-editor__menu-plugin')[0].scrollTop = 0;
        $('.blockee-editor__menu-plugin input[type=search]').val('').change().focus();

    }

    static actionMenuHide()
    {
        $('.blockee-editor-block').removeClass('active');

        $('.blockee-editor__menu').hide();
        $('.blockee-editor-canvas').hide();

        blockeeEditor.update();

        event.stopImmediatePropagation();

    }

    static actionBlockMenuShow(node)
    {
        let top = blockeeEditorMouseY + 60;
        let left = blockeeEditorMouseX + 75;

        $('.blockee-editor__menu-block').css({top: top, left:left}).show();
        $('.blockee-editor-canvas').show();

        let current_block_type = $(node).parent('.blockee-editor-block').data('type');
        const signature = 'BlockeePlugin__'+current_block_type;
        let info = eval(signature+".info()");

        if(info.settings === true)
            $('.blockee-editor__menu-block--li-configure').removeClass('disabled');
        else
            $('.blockee-editor__menu-block--li-configure').addClass('disabled');


        $('.blockee-editor__menu-block').data('blockee-type', current_block_type);

        $('.blockee-editor-block.active').removeClass('active');
        $(node).parent('.blockee-editor-block').addClass('active');
    }

    static blockSettingsOpen(){

        $('.blockee-editor__menu').hide();
        $('.blockee-editor-canvas').hide();

        let current_block_type = $('.blockee-editor__menu-block').data('blockee-type');
        const signature = 'BlockeePlugin__'+current_block_type;
        let render = eval(signature+".settingsRender()");

        $('.blockee-editor-window-body').html(render);

        $('.blockee-editor-window-canvas').show();
        $('.blockee-editor-window').show();

    }

    static blockSettingsClose()
    {
        $('.blockee-editor-window-canvas').hide();
        $('.blockee-editor-window').hide();

    }

    static blockGetNode()
    {
        return $(".blockee-editor-block.active .blockee-editor-block-element");
    }

    static blockSettingsValidate()
    {
        let current_block_type = $(".blockee-editor-block.active").data('type');
        const signature = 'BlockeePlugin__'+current_block_type;
        let render = eval(signature+".settingsValidate()");


        blockeeEditor.update();
        blockeeEditor.blockSettingsClose();

        return false;
    }

    static fileManagerOpen(node){

        if(!blockeeEditorFileManagerUrl)
        {
            let msg = `Please enter \`data-blockee-filemanager-url\` to open your file manager`;
            alert(msg);
        }


    }

}

$(function(){

    // blockee url
    const scripts = document.getElementsByTagName('script');
    for (let script of scripts) {
        if (script.src.endsWith('blockee.js')) {
            blockeeEditorUrl = script.src;
            blockeeEditorUrl = blockeeEditorUrl.replace('/blockee.js', '');
        }
    }

    // register mouse position
    document.addEventListener('mousemove', function(event) {
        blockeeEditorMouseX = event.clientX;
        blockeeEditorMouseY = event.clientY;
    });


    // load plugins files
    let blockee_plugins_dirs = [];
    Object.keys(blockeeEditorPlugins).forEach(function(group) {
        Object.keys(blockeeEditorPlugins[group]).forEach(function(plugin_name) {
            blockee_plugins_dirs[blockee_plugins_dirs.length] = `${blockeeEditorUrl}/plugin/${group}/${blockeeEditorPlugins[group][plugin_name]}/style.css`;
            blockee_plugins_dirs[blockee_plugins_dirs.length] = `${blockeeEditorUrl}/plugin/${group}/${blockeeEditorPlugins[group][plugin_name]}/${blockeeEditorPlugins[group][plugin_name]}.js`;
            blockeeEditorPluginsLoaded[blockeeEditorPluginsLoaded.length] = blockeeEditorPlugins[group][plugin_name];
        });
    });

    // load all plugins
    Promise.all(blockee_plugins_dirs.map(blockeeEditor.loadPlugin))
        .then(() => {
            blockeeEditor.init();
        })
        .catch(error => {
            console.error('Error loading plugins:', error);
    });

    // detect enter
    $('body').on('keydown', '.blockee-editor-block-element[contenteditable]', function(e){
        if(e.which === 13)
        {
            e.preventDefault();

            const parentListItem = window.getSelection().focusNode.parentNode;
            if(parentListItem.tagName === 'LI')
            {
                let $cur_li = $(parentListItem);
                let $new_li = $("<li>Item</li>");

                $new_li.insertAfter($cur_li);
                $new_li.focus();

                // Move the selection cursor to the beginning of the newly created list item
                let selection = window.getSelection();
                let range = document.createRange();
                range.selectNodeContents($new_li[0]);
                selection.removeAllRanges();
                selection.addRange(range);

            }
            else
            {
                blockeeEditor.insertHtmlAtCaret("<br>");
            }

        }
    });

    // change
    $('body').on('input', '.blockee-editor-block-element', function(e){
        blockeeEditor.update();
    });

    // paste cleaner
    $('body').on('paste', '.blockee-editor-block-element', function(e){

        e.preventDefault();
        let text = (e.originalEvent || e).clipboardData.getData('text/plain');
        text = $.trim(text);
        text = text.replaceAll("\r", "");
        text = text.replaceAll("\n", "<br>");

        const parentListItem = window.getSelection().focusNode.parentNode;
        if(parentListItem.tagName === 'LI')
        {
            text = text.replaceAll('<br><br>', '<br>');
            text = text.replaceAll("<br>", "</li><li>");
            text = "<li>"+text+"</li>";
        }


        // document.execCommand('insertText', true, text);
        blockeeEditor.insertHtmlAtCaret(text);

    });

    // register text-toolbar
    $('body').on('mouseup', '[contenteditable]', function(e){

        e.stopImmediatePropagation();

        const $toolbar = $('.blockeditor-text-toolbar');

        let selection = window.getSelection();
        if(selection.rangeCount > 0 && !selection.isCollapsed) {
            let range = selection.getRangeAt(0);
            let rect = range.getBoundingClientRect();

            $toolbar.css({
                top: rect.top + window.scrollY - $toolbar.outerHeight() - 10 + 'px',
                left: rect.left + window.scrollX - 60 + 'px',
                display: 'block'
            });

        } else {
            $toolbar.hide();
        }

    });

    $('body').on('mouseup', function(){
        const $toolbar = $('.blockeditor-text-toolbar');
        $toolbar.hide();
    });

    $('body').on('click', '.blockeditor-text-toolbar button', function(e){

        const $toolbar = $('.blockeditor-text-toolbar');
        const command = $(this).data('command');

        if(command === 'createLink') {

            const selection = window.getSelection();
            const selectedNode = selection.anchorNode.parentNode;
            let uri = "https://";

            if (selectedNode && selectedNode.tagName === 'A') {
                uri = selectedNode.href;
            }

            const url = prompt("Enter the link URL", uri);
            document.execCommand(command, false, url);
        }
        else if (command === 'hiliteColor')
        {
            document.execCommand(command, false, 'yellow');
        }
        else
        {
            document.execCommand(command, false, null);
        }

    });


    $('body').on('keydown', function(e){

        // escape
        if(e.key === "Escape" || e.keyCode === 27)
        {
            if($(e.target).is('input'))return;

            blockeeEditor.actionMenuHide();
            blockeeEditor.blockSettingsClose();
        }

        // touch /
        if ((e.key === "/" || e.keyCode === 191) && !$(e.target).is('input, textarea, select') && !$(event.target).attr('contenteditable'))
        {
            blockeeEditor.actionMenuShow('shortcut');
            e.preventDefault();
        }





    });


    $('body').on('mouseover', '.blockee-editor__menu li', function(){
        $('.blockee-editor__menu li').removeClass('active');
        $(this).addClass('active')
    });

    $('body').on('mouseout', '.blockee-editor__menu li', function(){
        $(this).removeClass('active');
    });


    // tabs
    $('body').on('click', '.blockee-editor-tabs a', function(e){
        e.preventDefault();
        $(this).parents('.blockee-editor-tabs').find('a').removeClass('active');
        $(this).addClass('active');

        let index = $(this).parents('li').index();
        $('.blockee-editor-tab--content').removeClass('active');
        $('.blockee-editor-tab--content').eq(index).addClass('active');
    });

    // attach menu event
    $('body').on('click', '.blockee-editor__menu-plugin li', function(e){
        blockeeEditor.actionMenuHide();
    });

    $('body').on('input change', '.blockee-editor__menu-plugin input[type="search"]', function(e){

        $('.blockee-editor__menu-plugin li').removeClass('active');

        let v = $(this).val().toLowerCase();
        v = $.trim(v);

        if($(this).val() == '')
        {
            $(this).parent().find('li').show();
        }
        else
        {
            $(this).parent().find('li').hide();

            let lis = $(this).parent().find('li');
            lis.each(function(){

                let li_text = $(this).text();
                li_text = $.trim(li_text.toLowerCase());

                if(li_text.indexOf(v) != -1 || $(this).data('blockee-plugin').indexOf(v) != -1)
                    $(this).show();

            });

        }
    });


});
