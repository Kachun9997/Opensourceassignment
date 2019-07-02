(function ( $ ) {
 
    $.fn.richText = function( options ) {

        // set default options
        // and merge them with the parameter options
        var settings = $.extend({
            
            // text formatting
            bold: true,
            italic: true,
            underline: true,

            // text alignment
            leftAlign: true,
            centerAlign: true,
            rightAlign: true,
            justify: true,

            // lists
            ol: true,
            ul: true,

            // title
            heading: true,

            // fonts
            fonts: true,
            fontList: ["Arial", 
                    "Arial Black", 
                    "Comic Sans MS", 
                    "Courier New", 
                    "Geneva", 
                    "Georgia", 
                    "Helvetica", 
                    "Impact", 
                    "Lucida Console", 
                    "Tahoma", 
                    "Times New Roman",
                    "Verdana"
                    ],
            fontColor: true,
            fontSize: true,

            // uploads
            imageUpload: true,
            fileUpload: true,

            // media
            videoEmbed: true,

            // link
            urls: true,

            // tables
            table: true,

            // code
            removeStyles: true,
            code: true,

            // colors
            colors: [],

            // dropdowns
            fileHTML: '',
            imageHTML: '',

            // translations
            translations: {
                'title': 'Title',
                'white': 'White',
                'black': 'Black',
                'brown': 'Brown',
                'beige': 'Beige',
                'darkBlue': 'Dark Blue',
                'blue': 'Blue',
                'lightBlue': 'Light Blue',
                'darkRed': 'Dark Red',
                'red': 'Red',
                'darkGreen': 'Dark Green',
                'green': 'Green',
                'purple': 'Purple',
                'darkTurquois': 'Dark Turquois',
                'turquois': 'Turquois',
                'darkOrange': 'Dark Orange',
                'orange': 'Orange',
                'yellow': 'Yellow',
                'imageURL': 'Image URL',
                'fileURL': 'File URL',
                'linkText': 'Link text',
                'url': 'URL',
                'size': 'Size',
                'responsive': 'Responsive',
                'text': 'Text',
                'openIn': 'Open in',
                'sameTab': 'Same tab',
                'newTab': 'New tab',
                'align': 'Align',
                'left': 'Left',
                'justify': 'Justify',
                'center': 'Center',
                'right': 'Right',
                'rows': 'Rows',
                'columns': 'Columns',
                'add': 'Add',
                'pleaseEnterURL': 'Please enter an URL',
                'videoURLnotSupported': 'Video URL not supported',
                'pleaseSelectImage': 'Please select an image',
                'pleaseSelectFile': 'Please select a file',
                'bold': 'Bold',
                'italic': 'Italic',
                'underline': 'Underline',
                'alignLeft': 'Align left',
                'alignCenter': 'Align centered',
                'alignRight': 'Align right',
                'addOrderedList': 'Add ordered list',
                'addUnorderedList': 'Add unordered list',
                'addHeading': 'Add Heading/title',
                'addFont': 'Add font',
                'addFontColor': 'Add font color',
                'addFontSize' : 'Add font size',
                'addImage': 'Add image',
                'addVideo': 'Add video',
                'addFile': 'Add file',
                'addURL': 'Add URL',
                'addTable': 'Add table',
                'removeStyles': 'Remove styles',
                'code': 'Show HTML code',
                'undo': 'Undo',
                'redo': 'Redo',
                'close': 'Close'
            },

            // privacy
            youtubeCookies: false,

            // dev settings
            useSingleQuotes: false,
            height: 0,
            heightPercentage: 0,
            id: "",
            class: "",
            useParagraph: false,
            maxlength: 0

        }, options );


        /* prepare toolbar */
        var $inputElement = $(this);
        $inputElement.addClass("richText-initial");
        var $editor,
            $toolbarList = $('<ul />'),
            $toolbarElement = $('<li />'),
            $btnBold = $('<a />', {class: "richText-btn", "data-command": "bold", "title": settings.translations.bold, html: '<span class="fa fa-bold"></span>'}), // bold
            $btnItalic = $('<a />', {class: "richText-btn", "data-command": "italic", "title": settings.translations.italic, html: '<span class="fa fa-italic"></span>'}), // italic
            $btnUnderline = $('<a />', {class: "richText-btn", "data-command": "underline", "title": settings.translations.underline, html: '<span class="fa fa-underline"></span>'}), // underline
            $btnJustify = $('<a />', {class: "richText-btn", "data-command": "justifyFull", "title": settings.translations.justify, html: '<span class="fa fa-align-justify"></span>'}), // left align
            $btnLeftAlign = $('<a />', {class: "richText-btn", "data-command": "justifyLeft", "title": settings.translations.alignLeft, html: '<span class="fa fa-align-left"></span>'}), // left align
            $btnCenterAlign = $('<a />', {class: "richText-btn", "data-command": "justifyCenter", "title": settings.translations.alignCenter, html: '<span class="fa fa-align-center"></span>'}), // centered
            $btnRightAlign = $('<a />', {class: "richText-btn", "data-command": "justifyRight", "title": settings.translations.alignRight, html: '<span class="fa fa-align-right"></span>'}), // right align
            $btnOL = $('<a />', {class: "richText-btn", "data-command": "insertOrderedList", "title": settings.translations.addOrderedList, html: '<span class="fa fa-list-ol"></span>'}), // ordered list
            $btnUL = $('<a />', {class: "richText-btn", "data-command": "insertUnorderedList", "title": settings.translations.addUnorderedList, html: '<span class="fa fa-list"></span>'}), // unordered list
            $btnHeading = $('<a />', {class: "richText-btn", "title": settings.translations.addHeading, html: '<span class="fa fa-header fa-heading"></span>'}), // title/header
            $btnFont = $('<a />', {class: "richText-btn", "title": settings.translations.addFont, html: '<span class="fa fa-font"></span>'}), // font color
            $btnFontColor = $('<a />', {class: "richText-btn", "title": settings.translations.addFontColor, html: '<span class="fa fa-paint-brush"></span>'}), // font color
            $btnFontSize = $('<a />', {class: "richText-btn", "title": settings.translations.addFontSize, html: '<span class="fa fa-text-height"></span>'}), // font color
            $btnImageUpload = $('<a />', {class: "richText-btn", "title": settings.translations.addImage, html: '<span class="fa fa-image"></span>'}), // image
            $btnVideoEmbed = $('<a />', {class: "richText-btn", "title": settings.translations.addVideo, html: '<span class="fa fa-video-camera fa-video"></span>'}), // video
            $btnFileUpload = $('<a />', {class: "richText-btn", "title": settings.translations.addFile, html: '<span class="fa fa-file-text-o far fa-file-alt"></span>'}), // file
            $btnURLs = $('<a />', {class: "richText-btn", "title": settings.translations.addURL, html: '<span class="fa fa-link"></span>'}), // urls/links
            $btnTable = $('<a />', {class: "richText-btn", "title": settings.translations.addTable, html: '<span class="fa fa-table"></span>'}), // table
            $btnRemoveStyles = $('<a />', {class: "richText-btn", "data-command": "removeFormat", "title": settings.translations.removeStyles, html: '<span class="fa fa-recycle"></span>'}), // clean up styles
            $btnCode = $('<a />', {class: "richText-btn", "data-command": "toggleCode", "title": settings.translations.code, html: '<span class="fa fa-code"></span>'}); // code

        
        /* prepare toolbar dropdowns */
        var $dropdownOuter = $('<div />', {class: "richText-dropdown-outer"});
        var $dropdownClose = $('<span />', {class: "richText-dropdown-close", html: '<span title="' + settings.translations.close + '"><span class="fa fa-times"></span></span>'});
        var $dropdownList = $('<ul />', {class: "richText-dropdown"}), // dropdown lists
            $dropdownBox = $('<div />', {class: "richText-dropdown"}), // dropdown boxes / custom dropdowns
            $form = $('<div />', {class: "richText-form"}), // symbolic form
            $formItem = $('<div />', {class: 'richText-form-item'}), // form item
            $formLabel = $('<label />'), // form label
            $formInput = $('<input />', {type: "text"}), //form input field
            $formInputFile = $('<input />', {type: "file"}), // form file input field
            $formInputSelect = $('<select />'),
            $formButton = $('<button />', {text: settings.translations.add, class: "btn"}); // button

        /* internal settings */
        var savedSelection; // caret position/selection
        var editorID = "richText-" + Math.random().toString(36).substring(7);
        var ignoreSave = false, $resizeImage = null;

        /* prepare editor history */
        var history = [];
        history[editorID] = [];
        var historyPosition = [];
        historyPosition[editorID] = 0;

        /* list dropdown for titles */
        var $titles = $dropdownList.clone();
        $titles.append($('<li />', {html: '<a data-command="formatBlock" data-option="h1">' + settings.translations.title + ' #1</a>'}));
        $titles.append($('<li />', {html: '<a data-command="formatBlock" data-option="h2">' + settings.translations.title + ' #2</a>'}));
        $titles.append($('<li />', {html: '<a data-command="formatBlock" data-option="h3">' + settings.translations.title + ' #3</a>'}));
        $titles.append($('<li />', {html: '<a data-command="formatBlock" data-option="h4">' + settings.translations.title + ' #4</a>'}));
        $btnHeading.append($dropdownOuter.clone().append($titles.prepend($dropdownClose.clone())));

        /* list dropdown for fonts */
        var fonts = settings.fontList;
        var $fonts = $dropdownList.clone();
        for(var i = 0; i < fonts.length; i++) {
            $fonts.append($('<li />', {html: '<a style="font-family:' + fonts[i] + ';" data-command="fontName" data-option="' + fonts[i] + '">' + fonts[i] + '</a>'}));
        }
        $btnFont.append($dropdownOuter.clone().append($fonts.prepend($dropdownClose.clone())));

        /* list dropdown for font sizes */
        var fontSizes = [24,18,16,14,12];
        var $fontSizes = $dropdownList.clone();
        for(var i = 0; i < fontSizes.length; i++) {
            $fontSizes.append($('<li />', {html: '<a style="font-size:' + fontSizes[i] + 'px;" data-command="fontSize" data-option="' + fontSizes[i] + '">Text '  + fontSizes[i] + 'px</a>'}));
        }
        $btnFontSize.append($dropdownOuter.clone().append($fontSizes.prepend($dropdownClose.clone())));

        /* font colors */
        var $fontColors = $dropdownList.clone();
        $fontColors.html(loadColors("forecolor"));
        $btnFontColor.append($dropdownOuter.clone().append($fontColors.prepend($dropdownClose.clone())));


        /* background colors */
        //var $bgColors = $dropdownList.clone();
        //$bgColors.html(loadColors("hiliteColor"));
        //$btnBGColor.append($dropdownOuter.clone().append($bgColors));

        /* box dropdown for links */
        var $linksDropdown = $dropdownBox.clone();
        var $linksForm = $form.clone().attr("id", "richText-URL").attr("data-editor", editorID);
        $linksForm.append(
            $formItem.clone()
                .append($formLabel.clone().text(settings.translations.url).attr("for", "url"))
                .append($formInput.clone().attr("id", "url"))
               );
        $linksForm.append(
            $formItem.clone()
                .append($formLabel.clone().text(settings.translations.text).attr("for", "urlText"))
                .append($formInput.clone().attr("id", "urlText"))
               );
        $linksForm.append(
            $formItem.clone()
                .append($formLabel.clone().text(settings.translations.openIn).attr("for", "openIn"))
                .append(
                    $formInputSelect
                        .clone().attr("id", "openIn")
                        .append($("<option />", {value: '_self', text: settings.translations.sameTab}))
                        .append($("<option />", {value: '_blank', text: settings.translations.newTab}))
                    )
               );
        $linksForm.append( $formItem.clone().append($formButton.clone()) );
        $linksDropdown.append($linksForm);
        $btnURLs.append($dropdownOuter.clone().append($linksDropdown.prepend($dropdownClose.clone())));

        /* box dropdown for video embedding */
        var $videoDropdown = $dropdownBox.clone();
        var $videoForm = $form.clone().attr("id", "richText-Video").attr("data-editor", editorID);
        $videoForm.append(
            $formItem.clone()
                .append($formLabel.clone().text(settings.translations.url).attr("for", "videoURL"))
                .append($formInput.clone().attr("id", "videoURL"))
            );
        $videoForm.append(
            $formItem.clone()
                .append($formLabel.clone().text(settings.translations.size).attr("for", "size"))
                .append(
                        $formInputSelect
                            .clone().attr("id", "size")
                            .append($("<option />", {value: 'responsive', text: settings.translations.responsive}))
                            .append($("<option />", {value: '640x360', text: '640x360'}))
                            .append($("<option />", {value: '560x315', text: '560x315'}))
                            .append($("<option />", {value: '480x270', text: '480x270'}))
                            .append($("<option />", {value: '320x180', text: '320x180'}))
                        )
                   );
        $videoForm.append( $formItem.clone().append($formButton.clone()) );
        $videoDropdown.append($videoForm);
        $btnVideoEmbed.append($dropdownOuter.clone().append($videoDropdown.prepend($dropdownClose.clone())));

        /* box dropdown for image upload/image selection */
        var $imageDropdown = $dropdownBox.clone();
        var $imageForm = $form.clone().attr("id", "richText-Image").attr("data-editor", editorID);

        if(settings.imageHTML 
            && ($(settings.imageHTML).find('#imageURL').length > 0 || $(settings.imageHTML).attr("id") === "imageURL")) {
            // custom image form
            $imageForm.html(settings.imageHTML);
        } else {
            // default image form
            $imageForm.append(
                $formItem.clone()
                    .append($formLabel.clone().text(settings.translations.imageURL).attr("for", "imageURL"))
                    .append($formInput.clone().attr("id", "imageURL"))
                   );
            $imageForm.append(
                $formItem.clone()
                    .append($formLabel.clone().text(settings.translations.align).attr("for", "align"))
                    .append(
                        $formInputSelect
                            .clone().attr("id", "align")
                            .append($("<option />", {value: 'left', text: settings.translations.left}))
                            .append($("<option />", {value: 'center', text: settings.translations.center}))
                            .append($("<option />", {value: 'right', text: settings.translations.right}))
                        )
                   );
        }
        $imageForm.append( $formItem.clone().append($formButton.clone()) );
        $imageDropdown.append($imageForm);
        $btnImageUpload.append($dropdownOuter.clone().append($imageDropdown.prepend($dropdownClose.clone())));

        /* box dropdown for file upload/file selection */
        var $fileDropdown = $dropdownBox.clone();
        var $fileForm = $form.clone().attr("id", "richText-File").attr("data-editor", editorID);

        if(settings.fileHTML 
            && ($(settings.fileHTML).find('#fileURL').length > 0 || $(settings.fileHTML).attr("id") === "fileURL")) {
            // custom file form
            $fileForm.html(settings.fileHTML);
        } else {
            // default file form
            $fileForm.append(
                $formItem.clone()
                    .append($formLabel.clone().text(settings.translations.fileURL).attr("for", "fileURL"))
                    .append($formInput.clone().attr("id", "fileURL"))
                );
            $fileForm.append(
                $formItem.clone()
                    .append($formLabel.clone().text(settings.translations.linkText).attr("for", "fileText"))
                    .append($formInput.clone().attr("id", "fileText"))
                );
        }
        $fileForm.append( $formItem.clone().append($formButton.clone()) );
        $fileDropdown.append($fileForm);
        $btnFileUpload.append($dropdownOuter.clone().append($fileDropdown.prepend($dropdownClose.clone())));

        /* box dropdown for tables */
        var $tableDropdown = $dropdownBox.clone();
        var $tableForm = $form.clone().attr("id", "richText-Table").attr("data-editor", editorID);
        $tableForm.append(
            $formItem.clone()
                .append($formLabel.clone().text(settings.translations.rows).attr("for", "tableRows"))
                .append($formInput.clone().attr("id", "tableRows").attr("type", "number"))
            );
        $tableForm.append(
            $formItem.clone()
                .append($formLabel.clone().text(settings.translations.columns).attr("for", "tableColumns"))
                .append($formInput.clone().attr("id", "tableColumns").attr("type", "number"))
            );
        $tableForm.append( $formItem.clone().append($formButton.clone()) );
        $tableDropdown.append($tableForm);
        $btnTable.append($dropdownOuter.clone().append($tableDropdown.prepend($dropdownClose.clone())));


        /* initizalize editor */
        function init() {
            var value, attributes, attributes_html = '';

            if(settings.useParagraph !== false) {
                // set default tag when pressing ENTER to <p> instead of <div>
                document.execCommand("DefaultParagraphSeparator", false, 'p');
            }


            // reformat $inputElement to textarea
            if($inputElement.prop("tagName") === "TEXTAREA") {
                // everything perfect
            } else if($inputElement.val()) {
                value = $inputElement.val();
                attributes = $inputElement.prop("attributes");
                // loop through <select> attributes and apply them on <div>
                $.each(attributes, function() {
                    if(this.name) {
                        attributes_html += ' ' + this.name + '="' + this.value + '"';
                    }
                });
                $inputElement.replaceWith($('<textarea' + attributes_html + ' data-richtext="init">' + value + '</textarea>'));
                $inputElement = $('[data-richtext="init"]');
                $inputElement.removeAttr("data-richtext");
            } else if($inputElement.html()) {
                value = $inputElement.html();
                attributes = $inputElement.prop("attributes");
                // loop through <select> attributes and apply them on <div>
                $.each(attributes, function() {
                    if(this.name) {
                        attributes_html += ' ' + this.name + '="' + this.value + '"';
                    }
                });
                $inputElement.replaceWith($('<textarea' + attributes_html + ' data-richtext="init">' + value + '</textarea>'));
                $inputElement = $('[data-richtext="init"]');
                $inputElement.removeAttr("data-richtext");
            } else {
                attributes = $inputElement.prop("attributes");
                // loop through <select> attributes and apply them on <div>
                $.each(attributes, function() {
                    if(this.name) {
                        attributes_html += ' ' + this.name + '="' + this.value + '"';
                    }
                });
                $inputElement.replaceWith($('<textarea' + attributes_html + ' data-richtext="init"></textarea>'));
                $inputElement = $('[data-richtext="init"]');
                $inputElement.removeAttr("data-richtext");
            }

            $editor = $('<div />', {class: "richText"});
            var $toolbar = $('<div />', {class: "richText-toolbar"});
            var $editorView = $('<div />', {class: "richText-editor", id: editorID, contenteditable: true});
            $toolbar.append($toolbarList);

            /* text formatting */
            if(settings.bold === true) {
                $toolbarList.append($toolbarElement.clone().append($btnBold));
            }
            if(settings.italic === true) {
                $toolbarList.append($toolbarElement.clone().append($btnItalic));
            }
            if(settings.underline === true) {
                $toolbarList.append($toolbarElement.clone().append($btnUnderline));
            }

            /* align */
            if(settings.leftAlign === true) {
                $toolbarList.append($toolbarElement.clone().append($btnLeftAlign));
            }
            if(settings.centerAlign === true) {
                $toolbarList.append($toolbarElement.clone().append($btnCenterAlign));
            }
            if(settings.rightAlign === true) {
                $toolbarList.append($toolbarElement.clone().append($btnRightAlign));
            }
            if(settings.justify === true) {
                $toolbarList.append($toolbarElement.clone().append($btnJustify));
            }

            /* lists */
            if(settings.ol === true) {
                $toolbarList.append($toolbarElement.clone().append($btnOL));
            }
            if(settings.ul === true) {
                $toolbarList.append($toolbarElement.clone().append($btnUL));
            }

            /* fonts */
            if(settings.fonts === true && settings.fontList.length > 0) {
                $toolbarList.append($toolbarElement.clone().append($btnFont));
            }
            if(settings.fontSize === true) {
                $toolbarList.append($toolbarElement.clone().append($btnFontSize));
            }

            /* heading */
            if(settings.heading === true) {
                $toolbarList.append($toolbarElement.clone().append($btnHeading));
            }

            /* colors */
            if(settings.fontColor === true) {
                $toolbarList.append($toolbarElement.clone().append($btnFontColor));
            }

            /* uploads */
            if(settings.imageUpload === true) {
                $toolbarList.append($toolbarElement.clone().append($btnImageUpload));
            }
            if(settings.fileUpload === true) {
                $toolbarList.append($toolbarElement.clone().append($btnFileUpload));
            }

            /* media */
            if(settings.videoEmbed === true) {
                $toolbarList.append($toolbarElement.clone().append($btnVideoEmbed));
            }

            /* urls */
            if(settings.urls === true) {
                $toolbarList.append($toolbarElement.clone().append($btnURLs));
            }

            if(settings.table === true) {
                $toolbarList.append($toolbarElement.clone().append($btnTable));
            }

            /* code */
            if(settings.removeStyles === true) {
                $toolbarList.append($toolbarElement.clone().append($btnRemoveStyles));
            }
            if(settings.code === true) {
                $toolbarList.append($toolbarElement.clone().append($btnCode));
            }

            // set current textarea value to editor
            $editorView.html($inputElement.val());

            $editor.append($toolbar);
            $editor.append($editorView);
            $editor.append($inputElement.clone().hide());
            $inputElement.replaceWith($editor);

            // append bottom toolbar
            $editor.append(
                $('<div />', {class: 'richText-toolbar'})
                    .append($('<a />', {class: 'richText-undo is-disabled', html: '<span class="fa fa-undo"></span>', 'title': settings.translations.undo}))
                    .append($('<a />', {class: 'richText-redo is-disabled', html: '<span class="fa fa-repeat fa-redo"></span>', 'title': settings.translations.redo}))
                    .append($('<a />', {class: 'richText-help', html: '<span class="fa fa-question-circle"></span>'}))
            );

            if(settings.maxlength > 0) {
                // display max length in editor toolbar
                $editor.data('maxlength', settings.maxlength);
                $editor.children('.richText-toolbar').children('.richText-help').before($('<a />', {class: 'richText-length', text: '0/' + settings.maxlength}));
            }

            if(settings.height && settings.height > 0) {
                // set custom editor height
                $editor.children(".richText-editor, .richText-initial").css({'min-height' : settings.height + 'px', 'height' : settings.height + 'px'});
            } else if(settings.heightPercentage && settings.heightPercentage > 0) {
                // set custom editor height in percentage
                var parentHeight = $editor.parent().innerHeight(); // get editor parent height
                var height = (settings.heightPercentage/100) * parentHeight; // calculate pixel value from percentage
                height -= $toolbar.outerHeight()*2; // remove toolbar size
                height -= parseInt($editor.css("margin-top")); // remove margins
                height -= parseInt($editor.css("margin-bottom")); // remove margins
                height -= parseInt($editor.find(".richText-editor").css("padding-top")); // remove paddings
                height -= parseInt($editor.find(".richText-editor").css("padding-bottom")); // remove paddings
                $editor.children(".richText-editor, .richText-initial").css({'min-height' : height + 'px', 'height' : height + 'px'});
            }

            // add custom class
            if(settings.class) {
                $editor.addClass(settings.class);
            }
            if(settings.id) {
                $editor.attr("id", settings.id);
            }

            // fix the first line
            fixFirstLine();

            // save history
            history[editorID].push($editor.find("textarea").val());
        }

        // initialize editor
        init();


        /** EVENT HANDLERS */

        // Help popup
        $editor.find(".richText-help").on("click", function() {
            var $editor = $(this).parents(".richText");
            if($editor) {
                var $outer = $('<div />', {class: 'richText-help-popup', style: 'position:absolute;top:0;right:0;bottom:0;left:0;background-color: rgba(0,0,0,0.3);'});
                var $inner = $('<div />', {style: 'position:relative;margin:60px auto;padding:20px;background-color:#FAFAFA;width:70%;font-family:Calibri,Verdana,Helvetica,sans-serif;font-size:small;'});
                var $content = $('<div />', {html: '<span id="closeHelp" style="display:block;position:absolute;top:0;right:0;padding:10px;cursor:pointer;" title="' + settings.translations.close + '"><span class="fa fa-times"></span></span>'});
                $content.append('<h3 style="margin:0;">RichText</h3>');
                $content.append('<hr><br>Powered by <a href="https://github.com/webfashionist/RichText" target="_blank">webfashionist/RichText</a> (Github) <br>License: <a href="https://github.com/webfashionist/RichText/blob/master/LICENSE" target="_blank">AGPL-3.0</a>');

                $outer.append($inner.append($content));
                $editor.append($outer);

                $outer.on("click", "#closeHelp", function() {
                    $(this).parents('.richText-help-popup').remove();
                });
            }
        });

        // undo / redo
        $(document).on("click", ".richText-undo, .richText-redo", function(e) {
             var $this = $(this);
             var $editor = $this.parents('.richText');
             if($this.hasClass("richText-undo") && !$this.hasClass("is-disabled")) {
                 undo($editor);
             } else if($this.hasClass("richText-redo") && !$this.hasClass("is-disabled")) {
                 redo($editor);
             }
        });


        // Saving changes from editor to textarea
        $(document).on("input change blur keydown keyup", ".richText-editor", function(e) {
            if((e.keyCode === 9 || e.keyCode === "9") && e.type === "keydown") {
                // tab through table cells
                e.preventDefault();
                tabifyEditableTable(window, e);
                return false;
            }
            fixFirstLine();
            updateTextarea();
            doSave($(this).attr("id"));
            updateMaxLength($(this).attr('id'));
        });


        // add context menu to several Node elements
        $(document).on('contextmenu', '.richText-editor', function(e) {

            var $list = $('<ul />', {'class': 'list-rightclick richText-list'});
            var $li = $('<li />');
            // remove Node selection
            $('.richText-editor').find('.richText-editNode').removeClass('richText-editNode');

            var $target = $(e.target);
            var $richText = $target.parents('.richText');
            var $toolbar = $richText.find('.richText-toolbar');

            var positionX = e.pageX - $richText.offset().left;
            var positionY = e.pageY - $richText.offset().top;

            $list.css({
                'top': positionY,
                'left': positionX
            });


            if($target.prop("tagName") === "A") {
                // edit URL
                e.preventDefault();

                $list.append($li.clone().html('<span class="fa fa-link"></span>'));
                $target.parents('.richText').append($list);
                $list.find('.fa-link').on('click', function() {
                    $('.list-rightclick.richText-list').remove();
                    $target.addClass('richText-editNode');
                    var $popup = $toolbar.find('#richText-URL');
                    $popup.find('input#url').val($target.attr('href'));
                    $popup.find('input#urlText').val($target.text());
                    $popup.find('select#openIn').val($target.attr('target'));
                    $toolbar.find('.richText-btn').children('.fa-link').parents('li').addClass('is-selected');
                });

                return false;
            } else if($target.prop("tagName") === "IMG") {
                // edit image
                e.preventDefault();

                $list.append($li.clone().html('<span class="fa fa-image"></span>'));
                $target.parents('.richText').append($list);
                $list.find('.fa-image').on('click', function() {
                    var align;
                    if($target.parent('div').length > 0 && $target.parent('div').attr('style') === 'text-align:center;') {
                        align = 'center';
                    } else {
                        align = $target.attr('align');
                    }
                    $('.list-rightclick.richText-list').remove();
                    $target.addClass('richText-editNode');
                    var $popup = $toolbar.find('#richText-Image');
                    $popup.find('input#imageURL').val($target.attr('src'));
                    $popup.find('select#align').val(align);
                    $toolbar.find('.richText-btn').children('.fa-image').parents('li').addClass('is-selected');
                });

                return false;
            }

        });
      // Saving changes from textarea to editor
        $(document).on("input change blur", ".richText-initial", function() {
            if(settings.useSingleQuotes === true) {
                $(this).val(changeAttributeQuotes($(this).val()));
            }
            var editorID = $(this).siblings('.richText-editor').attr("id");
            updateEditor(editorID);
            doSave(editorID);
            updateMaxLength(editorID);
        });

        // Save selection seperately (mainly needed for Safari)
        $(document).on("dblclick mouseup", ".richText-editor", function() {
            var editorID = $(this).attr("id");
            doSave(editorID);
        });

        // embedding video
        $(document).on("click", "#richText-Video button.btn", function(event) {
            event.preventDefault();
            var $button = $(this);
            var $form = $button.parent('.richText-form-item').parent('.richText-form');
            if($form.attr("data-editor") === editorID) {
                // only for the currently selected editor
                var url = $form.find('input#videoURL').val();
                var size = $form.find('select#size').val();

                if(!url) {
                    // no url set
                    $form.prepend($('<div />', {style: 'color:red;display:none;', class: 'form-item is-error', text: settings.translations.pleaseEnterURL}));
                    $form.children('.form-item.is-error').slideDown();
                    setTimeout(function() {
                        $form.children('.form-item.is-error').slideUp(function () {
                            $(this).remove();
                        });
                    }, 5000);
                } else {
                    // write html in editor
                    var html = '';
                    html = getVideoCode(url, size);
                    if(!html) {
                        $form.prepend($('<div />', {style: 'color:red;display:none;', class: 'form-item is-error', text: settings.translations.videoURLnotSupported}));
                        $form.children('.form-item.is-error').slideDown();
                        setTimeout(function() {
                            $form.children('.form-item.is-error').slideUp(function () {
                                $(this).remove();
                            });
                        }, 5000);
                    } else {
                        if(settings.useSingleQuotes === true) {

                        } else {

                        }
                        restoreSelection(editorID, true);
                        pasteHTMLAtCaret(html);
                        updateTextarea();
                        // reset input values
                        $form.find('input#videoURL').val('');
                        $('.richText-toolbar li.is-selected').removeClass("is-selected");
                    }
                }
            }
        });

        // Resize images
        $(document).on('mousedown', function(e) {
            var $target = $(e.target);
            if(!$target.hasClass('richText-list') && $target.parents('.richText-list').length === 0) {
                // remove context menu
                $('.richText-list.list-rightclick').remove();
                if(!$target.hasClass('richText-form') && $target.parents('.richText-form').length === 0) {
                    $('.richText-editNode').each(function () {
                        var $this = $(this);
                        $this.removeClass('richText-editNode');
                        if ($this.attr('class') === '') {
                            $this.removeAttr('class');
                        }
                    });
                }
            }
            if($target.prop("tagName") === "IMG" && $target.parents("#" + editorID)) {
                startX = e.pageX;
                startY = e.pageY;
                startW = $target.innerWidth();
                startH = $target.innerHeight();

                var left = $target.offset().left;
                var right = $target.offset().left + $target.innerWidth();
                var bottom = $target.offset().top + $target.innerHeight();
                var top = $target.offset().top;
                var resize = false;
                $target.css({'cursor' : 'default'});

                if(startY <= bottom && startY >= bottom-20 && startX >= right-20 && startX <= right) {
                    // bottom right corner
                    $resizeImage = $target;
                    $resizeImage.css({'cursor' : 'nwse-resize'});
                    resize = true;
                }

                if((resize === true || $resizeImage) && !$resizeImage.data("width")) {
                    // set initial image size and prevent dragging image while resizing
                    $resizeImage.data("width", $target.parents("#" + editorID).innerWidth());
                    $resizeImage.data("height", $target.parents("#" + editorID).innerHeight()*3);
                    e.preventDefault();
                } else if(resize === true || $resizeImage) {
                    // resizing active, prevent other events
                    e.preventDefault();
                } else {
                    // resizing disabled, allow dragging image
                    $resizeImage = null;
                }
                
            }
        });
        $(document)
            .mouseup(function(){
                if($resizeImage) {
                    $resizeImage.css({'cursor' : 'default'});
                }
                $resizeImage = null;
            })
            .mousemove(function(e){
                if($resizeImage!==null){
                    var maxWidth = $resizeImage.data('width');
                    var currentWidth = $resizeImage.width();
                    var maxHeight = $resizeImage.data('height');
                    var currentHeight = $resizeImage.height();
                    if((startW + e.pageX-startX) <= maxWidth && (startH + e.pageY-startY) <= maxHeight) {
                        // only resize if new size is smaller than the original image size
                        $resizeImage.innerWidth (startW + e.pageX-startX); // only resize width to adapt height proportionally
                        // $box.innerHeight(startH + e.pageY-startY);
                        updateTextarea();
                    } else if((startW + e.pageX-startX) <= currentWidth && (startH + e.pageY-startY) <= currentHeight) {
                        // only resize if new size is smaller than the previous size
                        $resizeImage.innerWidth (startW + e.pageX-startX); // only resize width to adapt height proportionally
                        updateTextarea();
                    }
                }
            });

        // adding URL
        $(document).on("click", "#richText-URL button.btn", function(event) {
            event.preventDefault();
            var $button = $(this);
            var $form = $button.parent('.richText-form-item').parent('.richText-form');
            if($form.attr("data-editor") === editorID) {
                // only for currently selected editor
                var url = $form.find('input#url').val();
                var text = $form.find('input#urlText').val();
                var target = $form.find('#openIn').val();

                // set default values
                if(!target) {
                    target = '_self';
                }
                if(!text) {
                    text = url;
                }
                if(!url) {
                    // no url set
                    $form.prepend($('<div />', {style: 'color:red;display:none;', class: 'form-item is-error', text: settings.translations.pleaseEnterURL}));
                    $form.children('.form-item.is-error').slideDown();
                    setTimeout(function() {
                        $form.children('.form-item.is-error').slideUp(function () {
                            $(this).remove();
                        });
                    }, 5000);
                } else {
                    // write html in editor
                    var html = '';
                    if(settings.useSingleQuotes === true) {
                        html = "<a href='" + url + "' target='" + target + "'>" + text + "</a>";
                    } else {
                        html = '<a href="' + url + '" target="' + target + '">' + text + '</a>';
                    }
                    restoreSelection(editorID, false, true);

                    var $editNode = $('.richText-editNode');
                    if($editNode.length > 0 && $editNode.prop("tagName") === "A") {
                        $editNode.attr("href", url);
                        $editNode.attr("target", target);
                        $editNode.text(text);
                        $editNode.removeClass('richText-editNode');
                        if($editNode.attr('class') === '') {
                            $editNode.removeAttr('class');
                        }
                    } else {
                        pasteHTMLAtCaret(html);
                    }
                    // reset input values
                    $form.find('input#url').val('');
                    $form.find('input#urlText').val('');
                    $('.richText-toolbar li.is-selected').removeClass("is-selected");
                }
            }
        });

        // adding image
        $(document).on("click", "#richText-Image button.btn", function(event) {
            event.preventDefault();
            var $button = $(this);
            var $form = $button.parent('.richText-form-item').parent('.richText-form');
            if($form.attr("data-editor") === editorID) {
                // only for currently selected editor
                var url = $form.find('#imageURL').val();
                var align = $form.find('select#align').val();

                // set default values
                if(!align) {
                    align = 'center';
                }
                if(!url) {
                    // no url set
                    $form.prepend($('<div />', {style: 'color:red;display:none;', class: 'form-item is-error', text: settings.translations.pleaseSelectImage}));
                    $form.children('.form-item.is-error').slideDown();
                    setTimeout(function() {
                        $form.children('.form-item.is-error').slideUp(function () {
                            $(this).remove();
                        });
                    }, 5000);
                } else {
                    // write html in editor
                    var html = '';
                    if(settings.useSingleQuotes === true) {
                        if(align === "center") {
                            html = "<div style='text-align:center;'><img src='" + url + "'></div>";
                        } else {
                            html = "<img src='" + url + "' align='" + align + "'>";
                        }
                    } else {
                        if(align === "center") {
                            html = '<div style="text-align:center;"><img src="' + url + '"></div>';
                        } else {
                            html = '<img src="' + url + '" align="' + align + '">';
                        }
                    }
                    restoreSelection(editorID, true);
                    var $editNode = $('.richText-editNode');
                    if($editNode.length > 0 && $editNode.prop("tagName") === "IMG") {
                        $editNode.attr("src", url);
                        if($editNode.parent('div').length > 0 && $editNode.parent('div').attr('style') === 'text-align:center;' && align !== 'center') {
                            $editNode.unwrap('div');
                            $editNode.attr('align', align);
                        } else if(($editNode.parent('div').length === 0 || $editNode.parent('div').attr('style') !== 'text-align:center;') && align === 'center' ) {
                            $editNode.wrap('<div style="text-align:center;"></div>');
                            $editNode.removeAttr('align');
                        } else {
                            $editNode.attr('align', align);
                        }
                        $editNode.removeClass('richText-editNode');
                        if($editNode.attr('class') === '') {
                            $editNode.removeAttr('class');
                        }
                    } else {
                        pasteHTMLAtCaret(html);
                    }
                    // reset input values
                    $form.find('input#imageURL').val('');
                    $('.richText-toolbar li.is-selected').removeClass("is-selected");
                }
            }
        });

        // adding file
        $(document).on("click", "#richText-File button.btn", function(event) {
            event.preventDefault();
            var $button = $(this);
            var $form = $button.parent('.richText-form-item').parent('.richText-form');
            if($form.attr("data-editor") === editorID) {
                // only for currently selected editor
                var url = $form.find('#fileURL').val();
                var text = $form.find('#fileText').val();

                // set default values
                if(!text) {
                    text = url;
                }
                if(!url) {
                    // no url set
                    $form.prepend($('<div />', {style: 'color:red;display:none;', class: 'form-item is-error', text: settings.translations.pleaseSelectFile}));
                    $form.children('.form-item.is-error').slideDown();
                    setTimeout(function() {
                        $form.children('.form-item.is-error').slideUp(function () {
                            $(this).remove();
                        });
                    }, 5000);
                } else {
                    // write html in editor
                    var html = '';
                    if(settings.useSingleQuotes === true) {
                        html = "<a href='" + url + "' target='_blank'>" + text + "</a>";
                    } else {
                        html = '<a href="' + url + '" target="_blank">' + text + '</a>';
                    }
                    restoreSelection(editorID, true);
                    pasteHTMLAtCaret(html);
                    // reset input values
                    $form.find('input#fileURL').val('');
                    $form.find('input#fileText').val('');
                    $('.richText-toolbar li.is-selected').removeClass("is-selected");
                }
            }
        });


        // adding table
        $(document).on("click", "#richText-Table button.btn", function(event) {
            event.preventDefault();
            var $button = $(this);
            var $form = $button.parent('.richText-form-item').parent('.richText-form');
            if($form.attr("data-editor") === editorID) {
                // only for currently selected editor
                var rows = $form.find('input#tableRows').val();
                var columns = $form.find('input#tableColumns').val();

                // set default values
                if(!rows || rows <= 0) {
                    rows = 2;
                }
                if(!columns || columns <= 0) {
                    columns = 2;
                }
                
                // generate table
                var html = '';
                if(settings.useSingleQuotes === true) {
                    html = "<table class='table-1'><tbody>";
                } else {
                    html = '<table class="table-1"><tbody>';
                }
                for(var i = 1; i <= rows; i++) {
                    // start new row
                    html += '<tr>';
                    for(var n = 1; n <= columns; n++) {
                        // start new column in row
                        html += '<td> </td>';
                    }
                    html += '</tr>';
                }
                html += '</tbody></table>';

                // write html in editor
                restoreSelection(editorID, true);
                pasteHTMLAtCaret(html);
                // reset input values
                $form.find('input#tableColumns').val('');
                $form.find('input#tableRows').val('');
                $('.richText-toolbar li.is-selected').removeClass("is-selected");
            }
        });

        // opening / closing toolbar dropdown
        $(document).on("click", function(event) {
            var $clickedElement = $(event.target);

            if($clickedElement.parents('.richText-toolbar').length === 0) {
                // element not in toolbar
                // ignore
            } else if($clickedElement.hasClass("richText-dropdown-outer")) {
                // closing dropdown by clicking inside the editor
                $clickedElement.parent('a').parent('li').removeClass("is-selected");
            } else if($clickedElement.find(".richText").length > 0) {
                // closing dropdown by clicking outside of the editor
                $('.richText-toolbar li').removeClass("is-selected");
            } else if($clickedElement.parent().hasClass("richText-dropdown-close")) {
                // closing dropdown by clicking on the close button
                $('.richText-toolbar li').removeClass("is-selected");
            } else if($clickedElement.hasClass("richText-btn") && $(event.target).children('.richText-dropdown-outer').length > 0) {
                // opening dropdown by clicking on toolbar button
                $clickedElement.parent('li').addClass("is-selected");

                if($clickedElement.children('.fa,svg').hasClass("fa-link")) {
                    // put currently selected text in URL form to replace it
                    restoreSelection(editorID, false, true);
                    var selectedText = getSelectedText();
                    $clickedElement.find("input#urlText").val('');
                    $clickedElement.find("input#url").val('');
                    if(selectedText) {
                        $clickedElement.find("input#urlText").val(selectedText);
                    }
                } else if($clickedElement.hasClass("fa-image")) {
                    // image
                }
            }
        });

        // Executing editor commands
        $(document).on("click", ".richText-toolbar a[data-command]", function(event) {
            var $button = $(this);
            var $toolbar = $button.closest('.richText-toolbar');
            var $editor = $toolbar.siblings('.richText-editor');
            var id = $editor.attr("id");
            if($editor.length > 0 && id === editorID && (!$button.parent("li").attr('data-disable') || $button.parent("li").attr('data-disable') === "false")) {
                event.preventDefault();
                var command = $(this).data("command");

                if(command === "toggleCode") {
                    toggleCode($editor.attr("id"));
                } else {
                    var option = null;
                    if ($(this).data('option')) {
                        option = $(this).data('option').toString();
                        if (option.match(/^h[1-6]$/)) {
                            command = "heading";
                        }
                    }

                    formatText(command, option, id);
                    if (command === "removeFormat") {
                        // remove HTML/CSS formatting
                        $editor.find('*').each(function() {
                            // remove all, but very few, attributes from the nodes
                            var keepAttributes = [
                                "id", "class",
                                "name", "action", "method",
                                "src", "align", "alt", "title",
                                "style", "webkitallowfullscreen", "mozallowfullscreen", "allowfullscreen",
                                "width", "height", "frameborder"
                            ];
                            var element = $(this);
                            var attributes = $.map(this.attributes, function(item) {
                                return item.name;
                            });
                            $.each(attributes, function(i, item) {
                                if(keepAttributes.indexOf(item) < 0 && item.substr(0, 5) !== 'data-') {
                                    element.removeAttr(item);
                                }
                            });
                            if(element.prop('tagName') === "A") {
                                // remove empty URL tags
                                element.replaceWith(function() {
                                    return $('<span />', {html: $(this).html()});
                                });
                            }
                        });
                        formatText('formatBlock', 'div', id);
                    }
                    // clean up empty tags, which can be created while replacing formatting or when copy-pasting from other tools
                    $editor.find('div:empty,p:empty,li:empty,h1:empty,h2:empty,h3:empty,h4:empty,h5:empty,h6:empty').remove();
                    $editor.find('h1,h2,h3,h4,h5,h6').unwrap('h1,h2,h3,h4,h5,h6');
                }
            }
            // close dropdown after click
            $button.parents('li.is-selected').removeClass('is-selected');
        });



        /** INTERNAL METHODS **/

        /**
         * Format text in editor
         * @param {string} command
         * @param {string|null} option
         * @param {string} editorID
         * @private
         */
        function formatText(command, option, editorID) {
            if (typeof option === "undefined") {
                option = null;
            }
            // restore selection from before clicking on any button
            doRestore(editorID);
            // Temporarily enable designMode so that
            // document.execCommand() will work
            // document.designMode = "ON";
            // Execute the command
            if(command === "heading" && getSelectedText()) {
                // IE workaround
                pasteHTMLAtCaret('<' + option + '>' + getSelectedText() + '</' + option + '>');
            } else if(command === "fontSize" && parseInt(option) > 0) {
                var selection = getSelectedText();
                selection = (selection + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + '<br>' + '$2');
                var html = (settings.useSingleQuotes ? "<span style='font-size:" + option + "px;'>" + selection + "</span>" : '<span style="font-size:' + option + 'px;">' + selection + '</span>');
                pasteHTMLAtCaret(html);
            } else {
                document.execCommand(command, false, option);
            }
            // Disable designMode
            // document.designMode = "OFF";
        }


        /**
         * Update textarea when updating editor
         * @private
         */
        function updateTextarea() {
            var $editor = $('#' + editorID);
            var content = $editor.html();
            if(settings.useSingleQuotes === true) {
                content = changeAttributeQuotes(content);
            }
            $editor.siblings('.richText-initial').val(content);
        }


        /**
         * Update editor when updating textarea
         * @private
         */
        function updateEditor(editorID) {
            var $editor = $('#' + editorID);
            var content = $editor.siblings('.richText-initial').val();
            $editor.html(content);
        }


        /**
         * Save caret position and selection
         * @return object
         **/
        function saveSelection(editorID) {
            var containerEl = document.getElementById(editorID);
            var range, start, end, type;
            if(window.getSelection && document.createRange) {
                var sel = window.getSelection && window.getSelection();
                if (sel && sel.rangeCount > 0 && $(sel.anchorNode).parents('#' + editorID).length > 0) {
                    range = window.getSelection().getRangeAt(0);
                    var preSelectionRange = range.cloneRange();
                    preSelectionRange.selectNodeContents(containerEl);
                    preSelectionRange.setEnd(range.startContainer, range.startOffset);
                    
                    start = preSelectionRange.toString().length;
                    end = (start + range.toString().length);

                    type = (start === end ? 'caret' : 'selection');
                    anchor = sel.anchorNode; //(type === "caret" && sel.anchorNode.tagName ? sel.anchorNode : false);
                    start = (type === 'caret' && anchor !== false ? 0 : preSelectionRange.toString().length);
                    end = (type === 'caret' && anchor !== false ? 0 : (start + range.toString().length));

                    return {
                        start: start,
                        end: end,
                        type: type,
                        anchor: anchor,
                        editorID: editorID
                    }
                }
            }
            return (savedSelection ? savedSelection : {
                        start: 0,
                        end: 0
                    });
        }


        /**
         * Restore selection
         **/
        function restoreSelection(editorID, media, url) {
            var containerEl = document.getElementById(editorID);
            var savedSel = savedSelection;
            if(!savedSel) {
                // fix selection if editor has not been focused
                savedSel = {
                    'start': 0,
                    'end': 0,
                    'type': 'caret',
                    'editorID': editorID,
                    'anchor': $('#' + editorID).children('div')[0]
                };
            }

            if(savedSel.editorID !== editorID) {
                return false;
            } else if(media === true) {
                containerEl = (savedSel.anchor ? savedSel.anchor : containerEl); // fix selection issue
            } else if(url === true) {
                if(savedSel.start === 0 && savedSel.end === 0) {
                    containerEl = (savedSel.anchor ? savedSel.anchor : containerEl); // fix selection issue
                }
            }

            if (window.getSelection && document.createRange) {
                var charIndex = 0, range = document.createRange();
                if(!range || !containerEl) { window.getSelection().removeAllRanges(); return true; }
                range.setStart(containerEl, 0);
                range.collapse(true);
                var nodeStack = [containerEl], node, foundStart = false, stop = false;

                while (!stop && (node = nodeStack.pop())) {
                    if (node.nodeType === 3) {
                        var nextCharIndex = charIndex + node.length;
                        if (!foundStart && savedSel.start >= charIndex && savedSel.start <= nextCharIndex) {
                            range.setStart(node, savedSel.start - charIndex);
                            foundStart = true;
                        }
                        if (foundStart && savedSel.end >= charIndex && savedSel.end <= nextCharIndex) {
                            range.setEnd(node, savedSel.end - charIndex);
                            stop = true;
                        }
                        charIndex = nextCharIndex;
                    } else {
                        var i = node.childNodes.length;
                        while (i--) {
                            nodeStack.push(node.childNodes[i]);
                        }
                    }
                }
                var sel = window.getSelection();
                sel.removeAllRanges();
                sel.addRange(range);
            }
        }
     function tabifyEditableTable(win, e) {

            if (e.keyCode !== 9) {
                return false;
            }

            var sel;
            if (win.getSelection) {
                sel = win.getSelection();
                if (sel.rangeCount > 0) {

                    var textNode = null,
                        direction = null;

                    if (!e.shiftKey) {
                        direction = "next";
                        textNode = (sel.focusNode.nodeName === "TD") 
                            ? (sel.focusNode.nextSibling != null) 
                                ? sel.focusNode.nextSibling 
                                : (sel.focusNode.parentNode.nextSibling != null) 
                                    ? sel.focusNode.parentNode.nextSibling.childNodes[0] 
                                    : null 
                                : (sel.focusNode.parentNode.nextSibling != null) 
                                ? sel.focusNode.parentNode.nextSibling 
                                : (sel.focusNode.parentNode.parentNode.nextSibling != null) 
                            ? sel.focusNode.parentNode.parentNode.nextSibling.childNodes[0] 
                            : null;
                    } else {
                        direction = "previous";
                        textNode = (sel.focusNode.nodeName === "TD") 
                            ? (sel.focusNode.previousSibling != null) 
                                ? sel.focusNode.previousSibling 
                                : (sel.focusNode.parentNode.previousSibling != null) 
                                    ? sel.focusNode.parentNode.previousSibling.childNodes[sel.focusNode.parentNode.previousSibling.childNodes.length - 1] 
                                    : null 
                                : (sel.focusNode.parentNode.previousSibling != null) 
                            ? sel.focusNode.parentNode.previousSibling 
                            : (sel.focusNode.parentNode.parentNode.previousSibling != null) 
                        ? sel.focusNode.parentNode.parentNode.previousSibling.childNodes[sel.focusNode.parentNode.parentNode.previousSibling.childNodes.length - 1] 
                        : null;
                    }

                    if (textNode != null) {
                        sel.collapse(textNode, Math.min(textNode.length, sel.focusOffset + 1));
                        if (textNode.textContent != null) {
                            sel.selectAllChildren(textNode);
                        }
                        e.preventDefault();
                        return true;
                    } else if(textNode === null && direction === "next" && sel.focusNode.nodeName === "TD") {
                        // add new row on TAB if arrived at the end of the row
                        var $table = $(sel.focusNode).parents("table");
                        var cellsPerLine = $table.find("tr").first().children("td").length;
                        var $tr = $("<tr />");
                        var $td = $("<td />");
                        for(var i = 1; i <= cellsPerLine; i++) {
                            $tr.append($td.clone());
                        }
                        $table.append($tr);
                        // simulate tabing through table
                        tabifyEditableTable(window, {keyCode: 9, shiftKey: false, preventDefault: function(){}});
                    }
                }
            }
            return false;
        }

    };
 
}( jQuery ));
