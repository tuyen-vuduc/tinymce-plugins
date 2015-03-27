/*global tinymce, jQuery */

(function (tinymce, $) {
    'use strict';
    var defaultOptions = {
        trigger: '['
    };

    var inputId = 'tinymce_fileupload_' + new Date().getMilliseconds();

    function FileUpload(editor, options) {
        var self = this;

        self.editor = editor;
        self.options = $.extend({}, defaultOptions, options);

        self.renderInput();

        return self;
    }

    FileUpload.prototype = {
        constructor: FileUpload,
        renderInput: function () {
            var self = this,
                $existing = $('#' + inputId, 'body'),
                $input = $('<input id = "' + inputId + '"type="file" name="fileData" style="position: fixed; top: -100px;"/>');

            if ($existing.length) {
                $input = $existing;
            } else {
                $('body').prepend($input);
            }

            var options = $.extend({}, self.options, {
                
            });

            $input.fileupload(options)
            .on('fileuploadadd', function(e, data) {
                var suffix = new Date().getTime(),
                    id = 'fileupload' + suffix,
                    rawHtml = '<a target="_blank" id="' + id + '" class="fileupload uploading" href="#">' +
                                    data.files[0].name +
                                '</a>&nbsp;';

                self.editor.focus();

                var editor = self.editor,
                    range = editor.selection.getRng(true),
                    start = range.startOffset,
                    startContainer = range.startContainer,
                    text = startContainer.data || '',
                    expectedTrigger = self.options.trigger,
                    triggerStartLength = expectedTrigger.length;

                startContainer.data = text.substring(0, start - triggerStartLength);
                editor.selection.setCursorLocation(startContainer, start - triggerStartLength);

                self.editor.execCommand('mceInsertContent', false, rawHtml);
                self.target = self.editor.selection.dom.select('a#' + id)[0];
            })
            .on('fileuploaddone', function (e, data) {
                $(self.target).attr('href', data.result.FilePath).removeClass('uploading').addClass('uploaded');
            });

            $input.click();
            this.hasFocus = true;
        }

    }

    tinymce.create('tinymce.plugins.FileUpload', {

        init: function (editor) {
            var fileuploadOptions = editor.getParam('fileupload') || {},
               expectedTrigger = fileuploadOptions.trigger || '[';

            editor.on('keypress', function (e) {
                var range = editor.selection.getRng(true),
                    start = range.startOffset,
                    startContainer = range.startContainer,
                    text = startContainer.data || '',
                    triggerStartLength = expectedTrigger.length - 1,
                    triggerStart = text.substr(start - triggerStartLength, triggerStartLength);

                var pressedKey = String.fromCharCode(e.which || e.keyCode),
                    actualTrigger = triggerStart + pressedKey,
                    isTrigger = actualTrigger == expectedTrigger;

                if (isTrigger) {
                    new FileUpload(editor, fileuploadOptions);
                }
            });
        },

        getInfo: function () {
            return {
                longname: 'fileupload',
                author: 'Vũ Đức Tuyến',
                url: 'https://www.freelancer.com/u/kanvuduc.html',
                version: tinymce.majorVersion + '.' + tinymce.minorVersion
            };
        }
    });

    tinymce.PluginManager.add('fileupload', tinymce.plugins.FileUpload);

}(tinymce, jQuery));