class BlockeePlugin__audio {

    static info(){
        return {
            name: 'Audio',
            title: "Audio",
            settings:  true
        }
    }

    static insert() {
        let contents = `<audio src="" controls preload="auto" class="blockee-editor-block-element">Your browser does not support the audio element.</audio>`;
        blockeeEditor.blockInsert('audio', contents, true);
    }

    static settingsRender()
    {
        const $node = blockeeEditor.blockGetNode();

        let src = $node.attr('src');
        if(typeof src === "undefined")src = "";

        let controls = $node.attr('controls');
        if(typeof controls === "undefined")controls = false;

        let autoplay = $node.attr('autoplay');
        if(typeof autoplay === "undefined")autoplay = false;

        let preload = $node.attr('preload');
        if(typeof preload === "undefined")preload = "";

        let loop = $node.attr('loop');
        if(typeof loop === "undefined")loop = false;

        let o_muted = $node.attr('muted');
        if(typeof o_muted === "undefined")o_muted = false;

        let id = $node.attr('id');
        if(typeof id === "undefined")id = "";

        let o_class = $node.attr('class');
        if(typeof o_class === "undefined" || o_class === false)o_class = "";

        let style = $node.attr('style');
        if(typeof style === "undefined" || style === false)style = "";

        // remove class begins blockee-
        let classes = o_class.split(' ');
        let filtered_classes = [];
        for (var i = 0; i < classes.length; i++) {
            if (!classes[i].startsWith('blockee')) {
                filtered_classes.push(classes[i]);
            }
        }
        let result = filtered_classes.join(' ');
        o_class = $.trim(result);

        // checkbox
        let controls_checked = '';
        if(controls !== '')controls_checked = 'checked';

        let preload_auto = '';
        if(preload === 'auto')preload_auto = 'selected';

        let preload_metadata = '';
        if(preload === 'metadata')preload_metadata = 'selected';

        let preload_none = '';
        if(preload === 'none')preload_none = 'selected';

        let autoplay_checked = '';
        if(autoplay !== '')autoplay_checked = 'checked';

        let loop_checked = '';
        if(loop !== false)loop_checked = 'checked';



        let muted_checked = '';
        if(o_muted !== false)muted_checked = 'checked';

        let form = `<ul class="blockee-editor-tabs">
                                <li><a href="" class="active">GENERAL</a></li>
                                <li><a href="">ADVANCED</a></li>
                            </ul>
                            <div id="tab_general" class="blockee-editor-tab--content active">
                            
                                <div class="blockee-editor-form-row">                                                            
                                    <div class="blockee-editor-form-label">Src</div>                                
                                    <input type="text" name="src" value="${src}" class="input-file">
                                    <input type="button" value="..." class="input-file-manager" onclick="blockeeEditor.fileManagerOpen(this)">                                                                                                                                                                    
                                </div>    
                                                                  
                               <div class="blockee-editor-form-row">                                
                                    <div class="blockee-editor-form-label">Preload</div>
                                    <select name="preload">
                                        <option value="auto" ${preload_auto}>auto</option>
                                        <option value="metadata" ${preload_metadata}>metadata</option>                                    
                                        <option value="none"  ${preload_none}>none</option>
                                    </select>
                               </div>                                                     
                               
                               <div class="blockee-editor-form-row">                                
                                    <div class="blockee-editor-form-label">Loop</div>
                                    <input type="checkbox" name="loop" value="1" ${loop_checked}>
                               </div>
                               
                               <div class="blockee-editor-form-row">                                
                                    <div class="blockee-editor-form-label">Muted</div>
                                    <input type="checkbox" name="muted" value="1" ${muted_checked}>
                               </div>
                               
                            </div>
                            
                            <div id="tab_advanced" class="blockee-editor-tab--content">
                                <div class="blockee-editor-form-row">                                
                                    <div class="blockee-editor-form-label">Id</div>
                                    <input type="text" name="id" value="${id}">
                               </div>
                               
                               <div class="blockee-editor-form-row">
                                    <div class="blockee-editor-form-label">Class</div>
                                    <input type="text" name="class" value="${o_class}">
                               </div>
                               
                               <div class="blockee-editor-form-row">                                
                                    <div class="blockee-editor-form-label">Style</div>
                                    <input type="text" name="style" value="${style}">
                               </div>
                            </div>
                            



                           
                           
`;

        return form;
    }

    static settingsValidate()
    {
        let $node = blockeeEditor.blockGetNode();

        let src =  $('.blockee-editor-window input[name="src"]').val();
        // let controls =  $('.blockee-editor-window input[name="controls"]').is(':checked');
        let preload =  $('.blockee-editor-window select[name="preload"]').val();
        // let autoplay =  $('.blockee-editor-window input[name="autoplay"]').is(':checked');
        let loop =  $('.blockee-editor-window input[name="loop"]').is(':checked');
        let muted =  $('.blockee-editor-window input[name="muted"]').is(':checked');
        let id =  $('.blockee-editor-window input[name="id"]').val();
        let o_class =  $('.blockee-editor-window input[name="class"]').val();
        let style =  $('.blockee-editor-window input[name="style"]').val();


        $node.attr("src", src);
        $node.attr("preload", preload);


        if(!muted)
            $node.removeAttr("muted");
        else
            $node.attr("muted", "muted");

        if(!loop)
            $node.removeAttr("loop");
        else
            $node.attr("loop", true);

        if(id === '')
            $node.removeAttr("id");
        else
            $node.attr("id", id);

        o_class = "blockee-editor-block-element "+o_class;
        o_class = $.trim(o_class);
        $node.attr("class", o_class);


        if(style === '')
            $node.removeAttr("style");
        else
            $node.attr("style", style);

    }


}