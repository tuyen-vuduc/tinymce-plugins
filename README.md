DatePicker
=========
This plugin is built based upon [jQuery.DatePicker](https://jqueryui.com/datepicker/). However, *jQuery.DatePicker* doesn't exponse it's important class, *DatePicker* to customer, so I have to copy code over with small customization.

How to use
-------------
With below setting, when user types #, the date picker will be shown

    datepicker: {
        trigger: '#',
        dateFormat: 'dd-MM-yy'
    }

----------


FileUpload
=========

This plugin is definitely built based upon [jQuery.FileUpload](https://blueimp.github.io/jQuery-File-Upload/). The current implementation only allows to upload one file at a time, and it's is separated from image/media plugins.

How to use
-------------
With below setting, when user types [, the FileOpenDialog will be shown

    fileupload: {
	    trigger: '['
        url: 'targetedUr;',
        dataType: 'json',
        autoUpload: true,
        maxFileSize: 5000000, // 5 MB
    }
